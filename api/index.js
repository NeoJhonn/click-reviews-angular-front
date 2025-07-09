import { createRequestHandler } from '@angular/ssr/vercel';
import { app } from '../dist/my-app/server/server.mjs';

export default createRequestHandler(app);
