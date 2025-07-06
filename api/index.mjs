import { app } from '../dist/click-reviews-angular-front/server/main.server.mjs';

export default async function handler(req, res) {
  app(req, res);
}
