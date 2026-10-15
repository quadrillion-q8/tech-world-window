import { useEffect, useState } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SiteStructuredData } from '../components/SiteStructuredData';
import { ConsentBanner } from '../components/ConsentBanner';
import { TechBackground } from '../components/TechBackground';
import { loadAnalytics, readConsent, revokeAnalytics, type ConsentChoice } from '../lib/consent';

// GA4 Measurement ID for techworldwindow.com.
// If this is ever emptied, no analytics script is loaded.
const GA_MEASUREMENT_ID = 'G-NMCN4Q7X4W';

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

function useAnalytics() {
  const location = useLocation();
  const [consent, setConsent] = useState<ConsentChoice | null>(null);

  // Read any saved choice on the client. Analytics never loads without "granted".
  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    if (saved === 'granted') loadAnalytics(GA_MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    if (consent !== 'granted' || typeof window === 'undefined') return;
    const w = window as GtagWindow;
    if (!w.gtag) return;
    w.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [consent, location.pathname, location.search]);

  return (choice: ConsentChoice) => {
    setConsent(choice);
    if (choice === 'granted') loadAnalytics(GA_MEASUREMENT_ID);
    else revokeAnalytics(GA_MEASUREMENT_ID);
  };
}

export function RootLayout() {
  const onConsentChoice = useAnalytics();
  return (
    <>
      <SiteStructuredData />
      <TechBackground />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
      <ConsentBanner onChoice={onConsentChoice} />
      <ScrollRestoration />
    </>
  );
}
