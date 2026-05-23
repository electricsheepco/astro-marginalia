import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const siteTitle = 'Astro Marginalia';
const siteDescription = 'A literary archive theme for glossaries, field notes, and annotated knowledge projects.';
const siteUrl = 'https://example.com';

const escapeXml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

export const GET: APIRoute = async () => {
  const entries = await getCollection('entries');
  const publishedEntries = entries
    .filter((entry) => entry.data.status !== 'draft')
    .sort((a, b) => a.data.concept.localeCompare(b.data.concept));

  const items = publishedEntries.map((entry) => {
    const title = `${entry.data.concept_tamil} — ${entry.data.concept}`;
    const url = new URL(`/entries/${entry.slug}/`, siteUrl).toString();
    const description = entry.data.editorial_note || entry.data.layers.modern.notes;

    return [
      '    <item>',
      `      <title>${escapeXml(title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <description>${escapeXml(description)}</description>`,
      `      <category>${escapeXml(entry.data.thematic_cluster)}</category>`,
      '    </item>',
    ].join('\n');
  }).join('\n');

  const feedUrl = new URL('/feed.xml', siteUrl).toString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteDescription)}</description>
    <language>ta</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
