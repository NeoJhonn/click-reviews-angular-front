import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import fs from 'fs/promises';

const app = express();

const browserDistFolder = join(import.meta.dirname, '../browser');

// Serve robots.txt from browser folder after build
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(join(import.meta.dirname, '../browser/robots.txt'));
});

// Serve sitemap.xml from browser folder after build
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(join(import.meta.dirname, '../browser/sitemap.xml'));
});

const angularApp = new AngularNodeAppEngine();

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

async function getProductMeta(slug: string) {
  try {
    const file = join(browserDistFolder, 'assets/data/products.json');
    const data = await fs.readFile(file, 'utf-8');
    const products = JSON.parse(data);
    return products.find((p: any) => p.slug === slug);
  } catch (e) {
    console.error('Error reading product JSON:', e);
    return null;
  }
}

// Serve static files
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

// SSR handler with dynamic meta injection
app.use(async (req, res, next) => {
  try {
    const pathname = req.url?.split('?')[0]?.trim() || '/';
    console.log('➡️ SSR Request Path:', pathname);

    const response = await angularApp.handle(req);
    if (!response) return next();

    if (!response.body) {
      return writeResponseToNodeResponse(response, res);
    }

    let html = await streamToString(response.body);

    // Privacidade PAGE
    if (req.url === '/privacidade') {
      console.log('🏠 Injecting Privacidade meta tags');
      const title = `<title>Política de Privacidade | ClickReviews</title>`;
      const metas = `
        <meta name="description" content="ClickReviews | Política de Privacidade">
        <meta property="og:title" content="Política de Privacidade | ClickReviews">
        <meta property="og:description" content="Política de Privacidade | ClickReviews</title">
        <meta property="og:image" content="https://www.clickreviews.com.br/assets/icons/logo_site.webp">
        <meta property="og:url" content="https://www.clickreviews.com.br/privacidade">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Política de Privacidade | ClickReviews</title">
        <meta name="twitter:description" content="Política de Privacidade | ClickReviews">
        <meta name="twitter:image" content="https://www.clickreviews.com.br/assets/icons/logo_site.webp">
        <meta property="twitter:url" content="https://www.clickreviews.com.br/privacidade">
        <!-- Canonical link -->
        <link rel="canonical" href="https://www.clickreviews.com.br/privacidade}" />
      `;
      html = html
        .replace(/<title[^>]*>.*?<\/title>/i, '')
        .replace(
          /<meta\s+(?:name|property)="(description|og:[^"]+|twitter:[^"]+)"[^>]*>/gi,
          ''
        )
        .replace('<head>', `<head>\n${title}\n${metas}`);
    }

    // REVIEW PAGE
    if (pathname.startsWith('/review/')) {
      const slug = pathname.split('/review/')[1];
      const product = await getProductMeta(slug);
      if (product) {
        console.log(`📦 Injecting review meta for slug: ${slug}`);
        const title = `<title>${product.productTitle} | ClickReviews</title>`;
        const metas = `
          <meta name="description" content="${product.subtitle}">
          <meta property="og:title" content="${product.productTitle} | ClickReviews">
          <meta property="og:description" content="${product.subtitle}">
          <meta property="og:image" content="${product.imageUrl[0]}">
          <meta property="og:url" content="https://clickreviews.com.br/review/${product.slug}">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="${product.productTitle} | ClickReviews">
          <meta name="twitter:description" content="${product.subtitle}">
          <meta name="twitter:image" content="${product.imageUrl[0]}">
          <meta property="twitter:url" content="https://clickreviews.com.br/review/${product.slug}">
          <!-- Canonical link -->
          <link rel="canonical" href="https://www.clickreviews.com.br${pathname}" />
          <!-- JSON-LD -->
          <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "${product.productTitle}",
          "image": "${product.imageUrl[0]}",
          "description": "${product.subtitle}",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "BRL",
            "price": "${product.price}",
            "availability": "https://schema.org/InStock",
            "url": "https://www.clickreviews.com.br/review/${product.slug}"
          }
        }
      </script>
        `;
        html = html
          .replace(/<title[^>]*>.*?<\/title>/i, '')
          .replace(
            /<meta\s+(?:name|property)="(description|og:[^"]+|twitter:[^"]+)"[^>]*>/gi,
            ''
          )
          .replace('<head>', `<head>\n${title}\n${metas}`);
      }
    }

    // LANDING PAGE: /oferta/iphone-16
    const normalized = pathname.replace(/\/+$/, '');
    if (normalized === '/oferta/iphone-16') {
      console.log('📦 Injecting LP meta for: /oferta/iphone-16');

      const lp = {
        title: 'iPhone 16 com preço de oportunidade | ClickReviews',
        subtitle:
          'Novo Controle da Câmera, câmera Fusion de 48 MP, cinco cores lindas e chip A18 superinteligente. Tudo com eficiência excepcional no consumo de energia.',
        images: [
          'https://http2.mlstatic.com/D_NQ_NP_2X_928475-MLA78901058072_092024-F.webp',
          'https://http2.mlstatic.com/D_NQ_NP_2X_809152-MLA79138858581_092024-F.webp',
          'https://http2.mlstatic.com/D_NQ_NP_2X_888579-MLA78900902176_092024-F.webp',
          'https://http2.mlstatic.com/D_NQ_NP_2X_888921-MLA78901058088_092024-F.webp',
        ],
        price: 4679.1,
        url: 'https://www.clickreviews.com.br/oferta/iphone-16',
        offers: [
          {
            seller: 'Amazon',
            url: 'https://amzn.to/45AdB8b',
          },
          {
            seller: 'Mercado Livre',
            url: 'https://mercadolivre.com/sec/1HzCfrS',
          },
          {
            seller: 'Shopee',
            url: 'https://s.shopee.com.br/8pbZvNw2Pl',
          },
        ],
      };

      const title = `<title>${lp.title}</title>`;
      const metas = `
      <meta name="description" content="${lp.subtitle}">
      <meta property="og:title" content="${lp.title}">
      <meta property="og:description" content="${lp.subtitle}">
      <meta property="og:image" content="${lp.images[0]}">
      <meta property="og:url" content="${lp.url}">
      <meta property="og:type" content="product">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${lp.title}">
      <meta name="twitter:description" content="${lp.subtitle}">
      <meta name="twitter:image" content="${lp.images[0]}">
      <meta property="twitter:url" content="${lp.url}">
      <!-- Canonical link -->
      <link rel="canonical" href="${lp.url}" />
      <!-- JSON-LD -->
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Apple iPhone 16",
        "description": "${lp.subtitle.replace(/"/g, '\\"')}",
        "image": ${JSON.stringify(lp.images)},
        "brand": { "@type": "Brand", "name": "Apple" },
        "offers": [
          ${lp.offers
            .map(
              (o) => `{
            "@type": "Offer",
            "priceCurrency": "BRL",
            "price": "${lp.price.toFixed(2)}",
            "availability": "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "${o.seller}" },
            "url": "${o.url}"
          }`
            )
            .join(',')}
        ]
      }
      </script>
    `;

      html = html
        // remove <title> atual
        .replace(/<title[^>]*>.*?<\/title>/i, '')
        // remove metas og/twitter/description existentes
        .replace(
          /<meta\s+(?:name|property)="(description|og:[^"]+|twitter:[^"]+)"[^>]*>\s*/gi,
          ''
        )
        // remove canonical existente
        .replace(/<link\s+rel="canonical"[^>]*>\s*/i, '')
        // injeta no <head>
        .replace('<head>', `<head>\n${title}\n${metas}`);
    }

    // CONTATO PAGE
    if (pathname === '/contato') {
      console.log('📞 Injecting Contato meta tags');
      const title = `<title>Contato | ClickReviews</title>`;
      const metas = `
        <meta name="description" content="Fale com o time do ClickReviews!">
        <meta property="og:title" content="Contato | ClickReviews">
        <meta property="og:description" content="Fale com o time do ClickReviews!">
        <meta property="og:image" content="https://www.clickreviews.com.br/assets/icons/logo_site.webp">
        <meta property="og:url" content="https://www.clickreviews.com.br/contato">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Contato | ClickReviews">
        <meta name="twitter:description" content="Fale com o time do ClickReviews!">
        <meta name="twitter:image" content="https://www.clickreviews.com.br/assets/icons/logo_site.webp">
        <meta property="twitter:url" content="https://www.clickreviews.com.br/contato">
        <!-- Canonical link -->
        <link rel="canonical" href="https://www.clickreviews.com.br${pathname}" />
      `;
      html = html
        .replace(/<title[^>]*>.*?<\/title>/i, '')
        .replace(
          /<meta\s+(?:name|property)="(description|og:[^"]+|twitter:[^"]+)"[^>]*>/gi,
          ''
        )
        .replace('<head>', `<head>\n${title}\n${metas}`);
    }

    const newResponse = new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    return writeResponseToNodeResponse(newResponse, res);
  } catch (err) {
    console.error('❌ SSR Error:', err);
    next(err);
  }
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () =>
    console.log(`✅ Server listening at http://localhost:${port}`)
  );
}

export const handler = createNodeRequestHandler(app);
