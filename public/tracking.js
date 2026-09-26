export function initTracking(config = {}) {
  const w = window;
  w.dataLayer = w.dataLayer || [];

  let consentState = { analytics:false, marketing:false };

  const sendFirstParty = payload => {
    if (!consentState.analytics && !consentState.marketing) return;
    try {
      const body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/event', new Blob([body], { type:'application/json' }));
      } else {
        fetch('/api/event', { method:'POST', headers:{'Content-Type':'application/json'}, body, keepalive:true });
      }
    } catch {}
  };

  const push = (event, data = {}) => {
    const payload = {
      event,
      event_id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2),
      event_time: new Date().toISOString(),
      page_path: location.pathname,
      page_url: location.href,
      referrer: document.referrer || null,
      ...data
    };
    w.dataLayer.push(payload);
    sendFirstParty(payload);
  };

  w.btaTrack = push;

  const pageViewPayload = {
    page_title: document.title,
    traffic_source: new URL(location.href).searchParams.get('utm_source') || null,
    traffic_medium: new URL(location.href).searchParams.get('utm_medium') || null,
    traffic_campaign: new URL(location.href).searchParams.get('utm_campaign') || null
  };
  push('bta_page_view', pageViewPayload);

  document.addEventListener('click', event => {
    const anchor = event.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href') || '';
    const text = (anchor.textContent || '').trim().slice(0,160);

    if (href.startsWith('/robots/')) {
      push('bta_robot_click', { destination: href, link_text: text });
    }
    if (href.startsWith('/categories/')) {
      push('bta_category_click', { destination: href, link_text: text });
    }
    if (href.startsWith('/toolkit/')) {
      push('bta_toolkit_click', { destination: href, link_text: text });
    }
    if (href.startsWith('/go/')) {
      push('bta_affiliate_handoff', { destination: href, link_text: text });
    }
    if (/robotsusa|robotsinternational|robotsasia|robotseuropa|robotsafrica/i.test(href)) {
      push('bta_marketplace_click', { destination: href, link_text: text });
    }
    if (href.startsWith('/pulse/')) {
      push('bta_pulse_click', { destination: href, link_text: text });
    }
    if (href.startsWith('/signal/')) {
      push('bta_signal_click', { destination: href, link_text: text });
    }
    if (href.startsWith('/agents/') || href.startsWith('/api/')) {
      push('bta_agent_resource_click', { destination: href, link_text: text });
    }
  }, { capture: true });

  const consentKey = 'bta_consent_v1';
  const existing = localStorage.getItem(consentKey);

  const loadGTM = () => {
    if (!config.gtm_container_id || document.getElementById('bta-gtm')) return;
    const script = document.createElement('script');
    script.id = 'bta-gtm';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(config.gtm_container_id);
    document.head.appendChild(script);
  };

  const applyConsent = consent => {
    consentState = consent;
    localStorage.setItem(consentKey, JSON.stringify(consent));
    push('bta_consent_update', consent);
    if (consent.analytics || consent.marketing) {
      loadGTM();
      push('bta_page_view', pageViewPayload);
    }
    const banner = document.getElementById('bta-consent');
    if (banner) banner.remove();
  };

  if (existing) {
    try {
      const consent = JSON.parse(existing);
      consentState = consent;
      push('bta_consent_loaded', consent);
      if (consent.analytics || consent.marketing) loadGTM();
      return;
    } catch {}
  }

  const banner = document.createElement('div');
  banner.id = 'bta-consent';
  banner.innerHTML = `
    <div class="bta-consent-inner">
      <div>
        <strong>Help Better Than Awesome learn what is useful.</strong>
        <p>We use optional analytics and advertising technologies to understand site usage, improve robot content, measure referrals and build audiences for future advertising. You can accept all, analytics only, or decline optional tracking.</p>
      </div>
      <div class="bta-consent-actions">
        <button data-consent="all">Accept all</button>
        <button data-consent="analytics">Analytics only</button>
        <button data-consent="none">Decline optional</button>
      </div>
    </div>`;
  document.body.appendChild(banner);

  banner.addEventListener('click', event => {
    const mode = event.target?.dataset?.consent;
    if (!mode) return;
    if (mode === 'all') applyConsent({ analytics:true, marketing:true });
    if (mode === 'analytics') applyConsent({ analytics:true, marketing:false });
    if (mode === 'none') applyConsent({ analytics:false, marketing:false });
  });
}
