// Keeps <title> within ~60 characters so it is not truncated in search results.
// The brand suffix is kept when it fits and dropped when it would push the title over the limit.
const SUFFIX = ' | Tech World Window';
const BRAND = 'Tech World Window';
const MAX_LENGTH = 60;

export function fitTitle(title: string): string {
  const base = title.endsWith(SUFFIX) ? title.slice(0, -SUFFIX.length) : title;
  if (base.includes(BRAND)) return base;
  const full = `${base}${SUFFIX}`;
  return full.length <= MAX_LENGTH ? full : base;
}
