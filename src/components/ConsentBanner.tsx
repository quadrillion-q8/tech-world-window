import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OPEN_CONSENT_EVENT, readConsent, storeConsent, type ConsentChoice } from '../lib/consent';

type Props = { onChoice: (choice: ConsentChoice) => void };

export function ConsentBanner({ onChoice }: Props) {
  const [open, setOpen] = useState(false);

  // Decided on the client only, so prerendered HTML never ships a banner.
  useEffect(() => {
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    storeConsent(choice);
    onChoice(choice);
    setOpen(false);
  };

  return (
    <section className="consent-banner" role="region" aria-label="Analytics cookies">
      <div className="consent-text">
        <strong>Analytics cookies</strong>
        <p>
          We use Google Analytics to see which guides are read. It sets cookies only if you accept.
          Nothing is loaded if you decline. <Link to="/privacy-policy">Privacy policy</Link>
        </p>
      </div>
      <div className="consent-actions">
        <button type="button" className="consent-btn" onClick={() => choose('denied')}>Decline</button>
        <button type="button" className="consent-btn" onClick={() => choose('granted')}>Accept</button>
      </div>
    </section>
  );
}
