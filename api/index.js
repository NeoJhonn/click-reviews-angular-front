import { createRequestHandler } from '@angular/ssr/vercel';
import { handler } from '../dist/click-reviews-angular-front/server/server.mjs';

export default createRequestHandler(handler);
