/**
 * Faz deploy de um HTML estático no Vercel via API.
 * Fluxo: upload do arquivo → criação do deployment → polling READY → retorna URL.
 */
const crypto = require('crypto');

async function deployToVercel(html, leadId) {
  const token = process.env.VERCEL_TOKEN;

  if (!token) {
    throw new Error('[Vercel] VERCEL_TOKEN é obrigatório');
  }

  const htmlBuffer = Buffer.from(html, 'utf-8');
  const sha1 = crypto.createHash('sha1').update(htmlBuffer).digest('hex');
  const fileSize = htmlBuffer.length;

  // 1. Upload do arquivo (idempotente: 200 = já existe, 201 = enviado)
  const uploadRes = await fetch('https://api.vercel.com/v2/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/octet-stream',
      'x-vercel-digest': sha1,
      'Content-Length': String(fileSize),
    },
    body: htmlBuffer,
  });

  if (!uploadRes.ok && uploadRes.status !== 200) {
    const err = await uploadRes.text();
    throw new Error(`[Vercel] Upload erro ${uploadRes.status}: ${err}`);
  }

  // 2. Cria o deployment referenciando o SHA do arquivo
  const deployName = `vitrineia-${leadId.substring(0, 8)}`;
  const projectId = process.env.VERCEL_PROJECT_ID;

  const deployBody = {
    name: deployName,
    files: [
      {
        file: 'index.html',
        sha: sha1,
        size: fileSize,
      },
    ],
    projectSettings: {
      framework: null,
      buildCommand: null,
      installCommand: null,
      outputDirectory: null,
      rootDirectory: null,
      devCommand: null,
    },
  };

  if (projectId) {
    deployBody.project = projectId;
  }

  const deployRes = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deployBody),
  });

  if (!deployRes.ok) {
    const err = await deployRes.text();
    throw new Error(`[Vercel] Deploy erro ${deployRes.status}: ${err}`);
  }

  const deploy = await deployRes.json();

  if (!deploy.url || !deploy.id) {
    throw new Error(`[Vercel] Resposta sem URL ou ID: ${JSON.stringify(deploy)}`);
  }

  // 3. Aguarda o deploy ficar READY antes de retornar a URL (timeout 120s)
  const finalUrl = await waitForDeployReady(deploy.id, deploy.url, token);
  return finalUrl;
}

/**
 * Faz polling na API do Vercel até o deployment ficar READY.
 * Estados possíveis: QUEUED → BUILDING → READY | ERROR | CANCELED
 */
async function waitForDeployReady(deployId, deployUrl, token, timeoutMs = 120000) {
  const interval = 5000;
  const maxAttempts = Math.floor(timeoutMs / interval);

  for (let i = 0; i < maxAttempts; i++) {
    await sleep(interval);

    const statusRes = await fetch(`https://api.vercel.com/v13/deployments/${deployId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!statusRes.ok) {
      console.warn(`[Vercel] Erro ao checar status do deploy: ${statusRes.status}`);
      continue;
    }

    const status = await statusRes.json();
    const state = status.readyState || status.state;

    console.log(`[Vercel] Deploy status: ${state} (tentativa ${i + 1}/${maxAttempts})`);

    if (state === 'READY') {
      return `https://${deployUrl}`;
    }

    if (state === 'ERROR' || state === 'CANCELED') {
      throw new Error(`[Vercel] Deploy falhou com estado: ${state}`);
    }

    // QUEUED ou BUILDING — continua aguardando
  }

  // Timeout: retorna a URL mesmo assim (Vercel geralmente finaliza em poucos segundos)
  console.warn(`[Vercel] Timeout aguardando READY — retornando URL mesmo assim`);
  return `https://${deployUrl}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { deployToVercel };
