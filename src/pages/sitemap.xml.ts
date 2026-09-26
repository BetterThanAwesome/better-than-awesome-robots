import { getCollection } from 'astro:content';

export async function GET() {
  const robots = (await getCollection('robots')).filter(r => r.data.status === 'published');
  const posts = (await getCollection('blog')).filter(p => p.data.status === 'published');

  const staticPaths = [
    '/',
    '/robots/',
    '/categories/',
    '/categories/humanoids/',
    '/categories/quadrupeds/',
    '/categories/cleaning/',
    '/categories/delivery/',
    '/categories/warehouse/',
    '/categories/safety/',
    '/categories/healthcare/',
    '/categories/companions/',
    '/blog/',
    '/coverage/',
    '/pulse/',
    '/signal/',
    '/agents/',
    '/tests/procurement/'
  ];

  const urls = [
    ...staticPaths,
    ...robots.map(r => '/robots/' + r.slug + '/'),
    ...posts.map(p => '/blog/' + p.slug + '/')
  ];

  const body = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(path => '  <url><loc>https://betterthanawesome.com' + path + '</loc></url>').join('\n') +
    '\n</urlset>';

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
