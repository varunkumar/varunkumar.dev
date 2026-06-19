export function track(event, params = {}) {
  window.gtag?.('event', event, params);
}

export function trackPageView(pagePath) {
  window.gtag?.('config', 'G-R3E62HPYLZ', { page_path: pagePath });
}
