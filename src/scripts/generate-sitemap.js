import fs from 'fs/promises';
import path from 'path';

const products = JSON.parse(
  await fs.readFile(new URL('../assets/data/products.json', import.meta.url))
);

const baseUrl = 'https://www.clickreviews.com.br';

const urls = [
  `<url><loc>${baseUrl}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
  ...products.map(product =>
    `<url><loc>${baseUrl}/review/${product.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

await fs.writeFile(new URL('../sitemap.xml', import.meta.url), sitemap);

console.log('✅ sitemap.xml generated!');
