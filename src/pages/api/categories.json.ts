import { getCollection } from 'astro:content';

export async function GET() {
  const robots = (await getCollection('robots')).filter(r => r.data.status === 'published');
  const groups = new Map();

  for (const r of robots) {
    const key = r.data.category;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({
      id: r.slug,
      name: r.data.title,
      manufacturer: r.data.manufacturer || null,
      price_usd: r.data.price_usd || null,
      url: 'https://betterthanawesome.com/robots/' + r.slug + '/'
    });
  }

  const categories = [...groups.entries()]
    .map(([name, products]) => ({ name, count: products.length, products }))
    .sort((a,b) => a.name.localeCompare(b.name));

  return new Response(JSON.stringify({
    source: 'Better Than Awesome',
    generated_at: new Date().toISOString(),
    categories
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=900'
    }
  });
}
