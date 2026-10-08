import type { ToolFaq } from '../data/tools';

/** Visible FAQ that matches the FAQPage JSON-LD injected at build time. */
export function FaqSection({ items }: { items: ToolFaq[] }) {
  if (!items.length) return null;
  return <section className="faq-section">
    <h2>Frequently asked questions</h2>
    {items.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
  </section>;
}
