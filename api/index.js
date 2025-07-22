// Inicia servidor SSR
  const { handler } = await import('../dist/click-reviews-angular-front/server/server.mjs');
  return handler(req, res);
}


