---
import { getCollection } from 'astro:content';
import site from '../../content/site.json';

const regionMap = {
  usa: site.us_referral_url,
  international: site.international_referral_url,
  asia: site.asia_referral_url,
  europe: site.europe_referral_url,
  africa: site.africa_referral_url
};

export async function GET() {
  const robots = (await getCollection('robots'))
    .filter(r => r.data.status === 'published')
    .map(r => {
      const missing = [];
      if (!r.data.price_usd) missing.push('price');
      if (!r.data.image) missing.push('image');
      if (!r.data.seller_url) missing.push('direct_seller_url');
      if ((r.data.availability_status || 'unknown') === 'unknown') missing.push('availability');

      return {
        item_id: r.slug,
        title: r.data.title,
        brand: r.data.manufacturer || null,
        category: r.data.category,
        description: r.data.hook || r.data.problem || r.data.title,
        intended_buyer: r.data.buyer || null,
        problem_addressed: r.data.problem || null,
        price: r.data.price_usd ? { amount: r.data.price_usd, currency: 'USD' } : null,
        availability_status: r.data.availability_status || 'unknown',
        purchase_mode: r.data.purchase_mode || (r.data.price_usd ? 'listed_price' : 'unknown'),
        regions: r.data.region || [],
        regional_marketplaces: (r.data.region || []).map(region => ({
          region,
          marketplace_url: regionMap[region] || site.international_referral_url
        })),
        canonical_url: 'https://betterthanawesome.com/robots/' + r.slug + '/',
        attributed_handoff_url: 'https://betterthanawesome.com/go/' + r.slug + '?source=agent',
        seller_url: r.data.seller_url || r.data.affiliate_url || null,
        image: r.data.image || null,
        verified_date: r.data.verified_date || null,
        provenance: {
          image_source_url: r.data.image_source_url || null,
          editorial_source: 'Better Than Awesome'
        },
        procurement_notes: r.data.procurement_notes || null,
        data_quality: {
          known_core_fields: 8 - missing.length,
          missing_fields: missing,
          confidence: missing.length <= 1 ? 'high' : missing.length <= 3 ? 'medium' : 'limited'
        },
        tags: r.data.tags || []
      };
    });

  return new Response(JSON.stringify({
    schema_version: '1.0',
    source: 'Better Than Awesome',
    purpose: 'Robot discovery and procurement assistance for humans and AI agents',
    generated_at: new Date().toISOString(),
    caveat: 'Better Than Awesome is an editorial and referral layer. Confirm current price, availability, suitability, regulatory requirements and seller terms before purchase.',
    item_count: robots.length,
    products: robots
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=900'
    }
  });
}
