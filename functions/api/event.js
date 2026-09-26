const ALLOWED_EVENTS = new Set([
  'bta_page_view',
  'bta_consent_update',
  'bta_consent_loaded',
  'bta_robot_click',
  'bta_category_click',
  'bta_toolkit_click',
  'bta_affiliate_handoff',
  'bta_marketplace_click',
  'bta_pulse_click',
  'bta_signal_click',
  'bta_agent_resource_click'
]);

function cleanString(value, max = 500) {
  return typeof value === 'string' ? value.slice(0, max) : null;
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    if (!body || !ALLOWED_EVENTS.has(body.event)) {
      return new Response(null, { status: 204 });
    }

    const record = {
      event_id: cleanString(body.event_id, 100) || crypto.randomUUID(),
      event_name: body.event,
      occurred_at: cleanString(body.event_time, 50) || new Date().toISOString(),
      page_path: cleanString(body.page_path, 300),
      page_url: cleanString(body.page_url, 1200),
      referrer: cleanString(body.referrer, 1200),
      destination: cleanString(body.destination, 1200),
      link_text: cleanString(body.link_text, 200),
      page_title: cleanString(body.page_title, 300),
      traffic_source: cleanString(body.traffic_source, 100),
      traffic_medium: cleanString(body.traffic_medium, 100),
      traffic_campaign: cleanString(body.traffic_campaign, 200),
      analytics_consent: body.analytics === true ? 1 : 0,
      marketing_consent: body.marketing === true ? 1 : 0,
      country: context.request.cf?.country || null,
      device_type: context.request.headers.get('sec-ch-ua-mobile') === '?1' ? 'mobile' : 'unknown',
      user_agent: cleanString(context.request.headers.get('user-agent'), 500)
    };

    if (context.env?.BTA_ANALYTICS) {
      await context.env.BTA_ANALYTICS.prepare(
        `INSERT OR IGNORE INTO events (
          event_id,event_name,occurred_at,page_path,page_url,referrer,destination,link_text,page_title,
          traffic_source,traffic_medium,traffic_campaign,analytics_consent,marketing_consent,country,
          device_type,user_agent
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
      ).bind(
        record.event_id,record.event_name,record.occurred_at,record.page_path,record.page_url,record.referrer,
        record.destination,record.link_text,record.page_title,record.traffic_source,record.traffic_medium,
        record.traffic_campaign,record.analytics_consent,record.marketing_consent,record.country,
        record.device_type,record.user_agent
      ).run();
    } else {
      console.log(JSON.stringify({ type:'bta_analytics_event', ...record }));
    }

    return new Response(null, {
      status: 204,
      headers: {
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': 'https://betterthanawesome.com'
      }
    });
  } catch {
    return new Response(null, { status: 204 });
  }
}
