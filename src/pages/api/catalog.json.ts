---
import { getCollection } from 'astro:content';

export async function GET() {
  const robots = (await getCollection('robots'))
    .filter(r => r.data.status === 'published')
    .map(r => ({
      id: r.slug,
      name: r.data.title,
      category: r.data.category,
      manufacturer: r.data.manufacturer || null,
      price_usd: r.data.price_usd || null,
      buyer: r.data.buyer || null,
      problem: r.data.problem || null,
      hook: r.data.hook || null,
      image: r.data.image || null,
      product_url: 'https://betterthanawesome.com/robots/' + r.slug + '/',
      seller_url: r.data.seller_url || r.data.affiliate_url || null,
      regions: r.data.region || [],
      verified_date: r.data.verified_date || null,
      tags: r.data.tags || []
    }));

  return new Response(JSON.stringify({
    source: 'Better Than Awesome',
    generated_at: new Date().toISOString(),
    item_count: robots.length,
    products: robots
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=900'
    }
  });
}
