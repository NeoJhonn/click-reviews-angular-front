 // Inicia servidor SSR    
 export default async function handler(req, res) {
  const { handler: angularHandler } = await import('../dist/click-reviews-angular-front/server/server.mjs');
  await angularHandler(req, res);
}



