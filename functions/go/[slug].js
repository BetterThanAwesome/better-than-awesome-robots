export async function onRequestGet(context) {
  const { request, params } = context;
  const slug = String(params.slug || '').trim();
  if (!slug) return new Response('Missing product', { status: 400 });

  const requestUrl = new URL(request.url);
  const source = (requestUrl.searchParams.get('source') || 'unknown').slice(0, 40);
  const region = (requestUrl.searchParams.get('region') || '').slice(0, 30);

  try {
    const catalogUrl = new URL('/api/procurement.json', requestUrl.origin);
    const response = await fetch(catalogUrl.toString(), {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('catalog unavailable');

    const data = await response.json();
    const product = (data.products || []).find(item => item.item_id === slug);
    if (!product) return new Response('Robot not found', { status: 404 });

    let target = product.seller_url;
    if (region && Array.isArray(product.regional_marketplaces)) {
      const regional = product.regional_marketplaces.find(item => item.region === region);
      if (regional?.marketplace_url) target = regional.marketplace_url;
    }

    if (!target) return Response.redirect(product.canonical_url, 302);

    console.log(JSON.stringify({
      event: 'affiliate_handoff',
      product: slug,
      source,
      region: region || null,
      at: new Date().toISOString()
    }));

    return new Response(null, {
      status: 302,
      headers: {
        'Location': target,
        'Cache-Control': 'no-store',
        'X-BTA-Product': slug,
        'X-BTA-Source': source
      }
    });
  } catch (error) {
    return Response.redirect(new URL('/robots/' + encodeURIComponent(slug) + '/', requestUrl.origin).toString(), 302);
  }
}
