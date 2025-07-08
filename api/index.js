export default async function handler(req, res) {
  const mod = await import('../dist/click-reviews-angular-front/server/server.mjs');
  return mod.handler(req, res);
}
