import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import fs from 'fs/promises';


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

// Função para transformar o body do Response em string
async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const size = chunks.reduce((acc, c) => acc + c.length, 0);
  const merged = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }

  return new TextDecoder().decode(merged);
}

// Função para buscar o produto pelo slug no arquivo JSON
async function getProductBySlug(slug: string) {
  const filePath = join(browserDistFolder, '/assets/data/products.json');
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
app.use(async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);
    if (!response || !response.body) return next();

    let html = await streamToString(response.body);

    // Detecta rota dinâmica
    if (req.url.startsWith('/review/')) {
      const slug = req.url.split('/review/')[1];
      const product = await getProductBySlug(slug);

      if (product) {
        const metaTags = `
          <title>${product.productTitle} | ClickReviews</title>
          <meta name="description" content="${product.subtitle}">
          <meta property="og:title" content="${product.productTitle} | ClickReviews">
          <meta property="og:description" content="${product.subtitle}">
          <meta property="og:image" content="${product.imageUrl}">
          <meta property="og:url" content="https://clickreviews.com.br/review/${product.slug}">
          <meta property="og:type" content="website">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="${product.productTitle} | ClickReviews">
          <meta name="twitter:description" content="${product.subtitle}">
          <meta name="twitter:image" content="${product.imageUrl}">
        `;
        console.log(html);
        // Substitui apenas o <title> e meta tags
        html = html.replace(
   `<title>Home | ClickReviews</title>
    <meta property="og:url" content="https://www.clickreviews.com.br/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Home | ClickReviews" />
    <meta
      property="og:description"
      content="ClickReviews, o melhor site de Reviews do Brasil!"
    />
    <meta
      property="og:image"
      content="https://www.clickreviews.com.br/assets/icons/logo_site.png"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="clickreviews.com.br" />
    <meta property="twitter:url" content="https://www.clickreviews.com.br/" />
    <meta name="twitter:title" content="Home | ClickReviews" />
    <meta
      name="twitter:description"
      content="ClickReviews, o melhor site de Reviews do Brasil!"
    />
    <meta
      name="twitter:image"
      content="https://www.clickreviews.com.br/assets/icons/logo_site.png"
    />`
    , metaTags);


      }
    }

    // Cria uma nova resposta com HTML modificado
    const newResponse = new Response(html, {
      status: response.status,
      headers: response.headers,
    });

    writeResponseToNodeResponse(newResponse, res);
  } catch (err) {
    console.error('Erro no SSR:', err);
    next(err);
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

//export const handler = createNodeRequestHandler(app);

