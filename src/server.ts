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

async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const combined = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }

  return new TextDecoder().decode(combined);
}

async function getProductMeta(slug: string) {
  try {
    const file = join(browserDistFolder, 'assets/data/products.json');
    const data = await fs.readFile(file, 'utf-8');
    const products = JSON.parse(data);
    return products.find((p: any) => p.slug === slug);
  } catch (e) {
    console.error('Erro lendo JSON de produtos:', e);
    return null;
  }
}

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use(async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);

    if (!response) return next();

    if (!response.body) {
      return writeResponseToNodeResponse(response, res);
    }

    const html = await streamToString(response.body);
    let modifiedHtml = html;

    // Se for uma rota dinâmica de review
    if (req.url.startsWith('/review/')) {
      const slug = req.url.split('/review/')[1];
      const product = await getProductMeta(slug);

      if (product) {
        const tags = `
          <title>${product.productTitle} | ClickReviews</title>
          <meta name="description" content="${product.subtitle}">
          <meta property="og:title" content="${product.productTitle} | ClickReviews">
          <meta property="og:description" content="${product.subtitle}">
          <meta property="og:image" content="${product.imageUrl}">
          <meta property="og:url" content="https://clickreviews.com.br/review/${product.slug}">
        `;

        modifiedHtml = html.replace(/<title>.*<\/title>/, tags);
      }
    }

    const newResponse = new Response(modifiedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    writeResponseToNodeResponse(newResponse, res);
  } catch (err) {
    console.error('SSR Error:', err);
    next(err);
  }
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
}

export const handler = createNodeRequestHandler(app);
