// api/index.js
import { createRequestHandler } from '@angular/ssr/vercel';
import { app } from '../dist/click-reviews-angular-front/server/server.mjs';

export default createRequestHandler(app);
