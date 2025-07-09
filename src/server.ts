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
export const app = express();
const angularApp = new AngularNodeAppEngine();

// Converte ReadableStream em string (usado para ler HTML do SSR)
async function streamToString(
  stream: ReadableStream<Uint8Array>
): Promise<string> {
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
  })
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

    // Se for rota Home
if (req.url.startsWith('/api/')) {
  const titleTag = `<title>Home | ClickReviews</title>`;
  const metaTags = `
    <meta name="description" content="ClickReviews, o melhor site de Análises/Reviews do Brasil!">
    <meta property="og:title" content="Home | ClickReviews">
    <meta property="og:description" content="ClickReviews, o melhor site de Análises/Reviews do Brasil!">
    <meta property="og:image" content="https://www.clickreviews.com.br/assets/icons/logo_site.webp">
    <meta property="og:url" content="https://www.clickreviews.com.br/">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Home | ClickReviews">
    <meta name="twitter:description" content="ClickReviews, o melhor site de Análises/Reviews do Brasil!">
    <meta name="twitter:image" content="https://www.clickreviews.com.br/assets/icons/logo_site.webp">
    <meta property="twitter:url" content="https://clickreviews.com.br/">
  `;

  html = html
    .replace(/<title[^>]*>.*?<\/title>/i, '') // remove any existing title
    .replace('<head>', `<head>\n${titleTag}\n${metaTags}`);
}

    
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
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${product.productTitle} | ClickReviews">
    <meta name="twitter:description" content="${product.subtitle}">
    <meta name="twitter:image" content="${product.imageUrl}">
    <meta property="twitter:url" content="https://clickreviews.com.br/review/${product.slug}">
  `;

  // Remove ALL <meta name="..."> or <meta property="..."> with "description", "og:*", or "twitter:*"
  html = html
    .replace(/<title[^>]*>.*?<\/title>/i, '') // remove existing <title>
    .replace(/<meta\s+(?:name|property)\s*=\s*["']?(description|og:[^"'>\s]+|twitter:[^"'>\s]+)["']?[^>]*?>/gi, '') // remove matching <meta> tags
    .replace('<head>', `<head>\n${titleTag}\n${metaTags}`); // insert new tags
}
} else {

      const titleTag = `<title>Contato | ClickReviews</title>`;
    const metaTags = `
    <meta name="description" content="ClickReviews, o melhor site de Análises/Reviews do Brasil!">
    <meta property="og:title" content="Contato | ClickReviews">
    <meta property="og:description" content="ClickReviews, o melhor site de Análises/Reviews do Brasil!">
    <meta property="og:image" content="https://www.clickreviews.com.br/assets/icons/logo_site.webp">
    <meta property="og:url" content="https://www.clickreviews.com.br/contato">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Home | ClickReviews">
    <meta name="twitter:description" content="ClickReviews, o melhor site de Análises/Reviews do Brasil!">
    <meta name="twitter:image" content="https://www.clickreviews.com.br/assets/icons/logo_site.webp">e
    <meta property="twitter:url" content="https://clickreviews.com.br/contato">
  `;

      // Remove ALL <meta name="..."> or <meta property="..."> with "description", "og:*", or "twitter:*"
  html = html
    .replace(/<title[^>]*>.*?<\/title>/i, '') // remove existing <title>
    .replace('<head>', `<head>\n${titleTag}\n${metaTags}`); // insert new tags
    }

    
    // Envia a resposta SSR modificada
    const newResponse = new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    console.log('Raw HTML before meta replace:', html);
    writeResponseToNodeResponse(newResponse, res);
  } catch (err) {
    console.error('SSR Error:', err);
    next(err);
  }
});

// Inicia o servidor local (para testes locais com `npm run serve:ssr`)
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
  );
}

// Exporta para Vercel / Node handlers
export const handler = createNodeRequestHandler(app);
