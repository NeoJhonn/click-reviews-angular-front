import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use(async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);

    if (!response) {
      return next();
    }

    if (!response.body) {
      return writeResponseToNodeResponse(response, res);
    }

    const html = await streamToString(response.body);

    let modifiedHtml = html;
    if (req.url === '/') {
      const metaTags = `
        <title>Home | ClickReviews</title>
        <!-- Facebook Meta Tags -->
<meta property="og:url" content="https://www.clickreviews.com.br/">
<meta property="og:type" content="website">
<meta property="og:title" content="Home | ClickReviews">
<meta property="og:description" content="ClickReviews, o melhor site de Reviews do Brasil!">
<meta property="og:image" content="">

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="clickreviews.com.br">
<meta property="twitter:url" content="https://www.clickreviews.com.br/">
<meta name="twitter:title" content="Home | ClickReviews">
<meta name="twitter:description" content="ClickReviews, o melhor site de Reviews do Brasil!">
<meta name="twitter:image" content="">
      `;
      modifiedHtml = html.replace(/<title>.*<\/title>/, metaTags);
    }

    const newResponse = new Response(modifiedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    writeResponseToNodeResponse(newResponse, res);

  } catch (error) {
    next(error);
  }
});


/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const concatenated = new Uint8Array(chunks.reduce((acc, val) => acc + val.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    concatenated.set(chunk, offset);
    offset += chunk.length;
  }

  return new TextDecoder().decode(concatenated);
}

