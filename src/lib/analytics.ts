export type MonetizationEvent = 'affiliate_click' | 'newsletter_signup' | 'sponsor_click' | 'tool_conversion';

type EventParams = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };

/** Centralized monetization events. No provider-specific affiliate URL is invented here. */
export function trackMonetization(event: MonetizationEvent, params: EventParams = {}) {
  if (typeof window === 'undefined') return;
  const gtag = (window as AnalyticsWindow).gtag;
  if (!gtag) return;
  gtag('event', event, { ...params, page_path: window.location.pathname });
}
