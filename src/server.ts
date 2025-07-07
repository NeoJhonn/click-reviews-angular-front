import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import fs from 'fs/promises';

const browserDistFolder = join(process.cwd(), 'dist/click-reviews-angular-front/browser');

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


/** Função auxiliar para ler stream em string */
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

/** Função para pegar produto pelo slug do JSON */
async function getProductBySlug(slug: string) {
  const filePath = join(browserDistFolder, 'assets/data/products.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(jsonData);
    return products.find((p: any) => p.slug === slug);
  } catch (err) {
    console.error('Erro lendo products.json:', err);
    return null;
  }
}



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
/** Middleware SSR com injeção dinâmica de meta tags */
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

    if (req.url.startsWith('/review/')) {
      const slug = req.url.split('/review/')[1];
      const product = await getProductBySlug(slug);

      if (product) {
        const metaTags = `
          <title>${product.productTitle} - Review Completo | ClickReviews</title>
          <!-- Facebook Meta Tags -->
          <meta property="og:title" content="${product.productTitle} - Review Completo | ClickReviews">
          <meta property="og:description" content="${product.subtitle}">
          <meta property="og:image" content="${product.imageUrl}">
          <meta property="og:url" content="https://clickreviews.com.br/review/${product.slug}">
          <!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="clickreviews.com.br">
<meta property="twitter:url" content="https://clickreviews.com.br/review/${product.slug}">
<meta name="twitter:title" content="${product.productTitle} - Review Completo | ClickReviews">
<meta name="twitter:description" content="${product.subtitle}">
<meta name="twitter:image" content="${product.imageUrl}">
        `;

        modifiedHtml = html.replace(/<title>.*<\/title>/, metaTags);
      }
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


