/**
 * Faz deploy de um HTML estático no Vercel via API.
 * Fluxo: upload do arquivo → criação do deployment → retorna URL.
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

  const deployRes = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
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
    }),
  });

  if (!deployRes.ok) {
    const err = await deployRes.text();
    throw new Error(`[Vercel] Deploy erro ${deployRes.status}: ${err}`);
  }

  const deploy = await deployRes.json();

  if (!deploy.url) {
    throw new Error(`[Vercel] Resposta sem URL: ${JSON.stringify(deploy)}`);
  }

  return `https://${deploy.url}`;
}

module.exports = { deployToVercel };
