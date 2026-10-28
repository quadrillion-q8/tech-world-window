// Privacy-first analytics consent (GDPR / ePrivacy / UK PECR / CPRA friendly).
// - Nothing from Google loads until the visitor accepts.
// - Google Consent Mode v2 defaults are all "denied" and flip to "granted" on accept.
// - A browser Global Privacy Control signal is treated as a decline.
export type ConsentChoice = 'granted' | 'denied';

const STORAGE_KEY = 'tww-analytics-consent';
export const OPEN_CONSENT_EVENT = 'tww:open-consent';

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function readConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (nav.globalPrivacyControl === true) return 'denied';
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function storeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* storage can be unavailable (private mode); the choice then lasts for this visit only */
  }
}

/** Loads GA4 once, with Consent Mode v2 set to the visitor's choice. */
export function loadAnalytics(measurementId: string) {
  if (!measurementId || typeof window === 'undefined') return;
  // Google Analytics keeps this global kill switch after withdrawal; clear it on re-consent.
  const gaDisableKey = `ga-disable-${measurementId}`;
  (window as unknown as Record<string, unknown>)[gaDisableKey] = false;
  const w = window as GtagWindow;
  if (w.gtag) {
    w.gtag('consent', 'update', grantedState());
    return;
  }
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () { w.dataLayer!.push(arguments); };
  w.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  w.gtag('consent', 'update', grantedState());
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  w.gtag('js', new Date());
  w.gtag('config', measurementId, { send_page_view: false, anonymize_ip: true });
}

/** Called when a visitor withdraws consent after analytics was already loaded. */
export function revokeAnalytics(measurementId: string) {
  if (typeof window === 'undefined') return;
  const w = window as GtagWindow;
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
  if (w.gtag) {
    w.gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  }
}

function grantedState() {
  // Only first-party analytics is used. Advertising storage is never granted.
  return {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  };
}
