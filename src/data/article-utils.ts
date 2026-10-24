import type { Article, TableCell } from './articles';

/** Keep article-page utilities out of the full content registry's client bundle. */
export function headingId(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** Approximate visible word count, used for Article structured data. */
export function articleWordCount(article: Article): number {
  const cellText = (cell: TableCell) => (typeof cell === 'string' ? cell : cell.text);
  const text = [
    article.title,
    article.dek,
    article.excerpt,
    ...article.content.flatMap(section => [
      section.heading ?? '',
      ...section.paragraphs,
      ...(section.bullets ?? []),
      ...(section.steps ?? []),
      ...(section.codeBlocks ?? []),
      ...(section.table ? [section.table.caption, ...section.table.headers, ...section.table.rows.flat().map(cellText)] : []),
      ...(section.relatedLinks ?? []).flatMap(link => [link.label, link.description]),
      ...(section.image ? [section.image.alt, section.image.caption] : []),
    ]),
    ...(article.faq ?? []).flatMap(item => [item.question, item.answer]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}
