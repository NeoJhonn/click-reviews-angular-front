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

// Converte ReadableStream em string (usado para ler HTML do SSR)
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

// Carrega os dados do produto do JSON
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

// Serve arquivos estáticos
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// SSR + injeção de meta tags dinâmicas
app.use(async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);
    if (!response) return next();

    if (!response.body) {
      return writeResponseToNodeResponse(response, res);
    }

    let html = await streamToString(response.body);

    // Se for rota de review
    if (req.url.startsWith('/review/')) {
      const slug = req.url.split('/review/')[1];
      const product = await getProductMeta(slug);

      if (product) {
        const titleTag = `<title>${product.productTitle} | ClickReviews</title>`;
        const metaTags = `
          <meta name="description" content="${product.subtitle}">
          <meta property="og:title" content="${product.productTitle} | ClickReviews">
          <meta property="og:description" content="${product.subtitle}">
          <meta property="og:image" content="${product.imageUrl}">
          <meta property="og:url" content="https://clickreviews.com.br/review/${product.slug}">
        `;

        // Substitui o título
        html = html.replace(/<title>.*<\/title>/, titleTag);

        // Insere as metas logo após <head>
        html = html.replace('<head>', `<head>\n${metaTags}`);
      }
    }

    // Envia a resposta SSR modificada
    const newResponse = new Response(html, {
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

// Inicia o servidor local (para testes locais com `npm run serve:ssr`)
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
}

// Exporta para Vercel / Node handlers
export const handler = createNodeRequestHandler(app);
