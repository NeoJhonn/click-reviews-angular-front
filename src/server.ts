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

async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const totalLength = chunks.reduce((acc, val) => acc + val.length, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }

  return new TextDecoder().decode(merged);
}

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

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use(async (req, res, next) => {
  try {
    console.log('SSR ativo - URL:', req.url);

    const response = await angularApp.handle(req);
    if (!response?.body) return writeResponseToNodeResponse(response, res);

    const html = await streamToString(response.body);
    let modifiedHtml = html;

    if (req.url.startsWith('/review/')) {
      const slug = req.url.split('/review/')[1];
      const product = await getProductBySlug(slug);

      console.log('Produto carregado:', product?.productTitle || 'Não encontrado');

      if (product) {
        const metaTags = `
          <title>${product.productTitle} - Review Completo | ClickReviews</title>
          <meta property="og:title" content="${product.productTitle} - Review Completo | ClickReviews" />
          <meta property="og:description" content="${product.subtitle}" />
          <meta property="og:image" content="${product.imageUrl}" />
          <meta property="og:url" content="https://clickreviews.com.br/review/${product.slug}" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="clickreviews.com.br" />
          <meta property="twitter:url" content="https://clickreviews.com.br/review/${product.slug}" />
          <meta name="twitter:title" content="${product.productTitle} - Review Completo | ClickReviews" />
          <meta name="twitter:description" content="${product.subtitle}" />
          <meta name="twitter:image" content="${product.imageUrl}" />
        `;

        // Injeta dentro do <head> corretamente
        modifiedHtml = html.replace('</head>', `${metaTags}</head>`);
      }
    }

    const newResponse = new Response(modifiedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    writeResponseToNodeResponse(newResponse, res);

  } catch (error) {
    console.error('Erro no SSR:', error);
    next(error);
  }
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Servidor Express ouvindo em http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
