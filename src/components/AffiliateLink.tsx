import type { ReactNode } from 'react';
import { trackMonetization } from '../lib/analytics';

type Props = {
  href: string;
  merchant: string;
  product?: string;
  children: ReactNode;
};

/** Use only with a real approved affiliate destination. Never fabricate merchant URLs. */
export function AffiliateLink({ href, merchant, product, children }: Props) {
  return <a
    href={href}
    target="_blank"
    rel="sponsored nofollow noopener noreferrer"
    onClick={() => trackMonetization('affiliate_click', { merchant, product })}
  >{children}</a>;
}
