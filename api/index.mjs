import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { createServer } = require('http');
const { handler } = require('../dist/click-reviews-angular-front/server/server.mjs');

export default async function(req, res) {
  return handler(req, res);
}
