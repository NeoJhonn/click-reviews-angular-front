export default async function handler(req, res) {
  // Redireciona de www.clickreviews.com.br para clickreviews.com.br
  const host = req.headers.host;
  if (host && host.startsWith('www.')) {
    const redirectTo = `https://${host.replace(/^www\./, '')}${req.url}`;
    res.writeHead(301, {
      Location: redirectTo
    });
    res.end();
    return;
  }

  // Continua com o SSR normalmente
  const { handler } = await import('../dist/click-reviews-angular-front/server/server.mjs');
  return handler(req, res);
}


