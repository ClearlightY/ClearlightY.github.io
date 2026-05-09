/* global hexo */

'use strict';

const EXCLUDED_SITEMAP_PATHS = [
  /^css\/iconfont_[^/]+\/demo_index\.html$/,
  /^css\/iconfont_[^/]+\/iconfont\.json$/,
  /^baidu_verify_[^/]+\.html$/,
  /^google[^/]+\.html$/,
  /^README\.md$/i
];

function isExcludedPath(path) {
  return EXCLUDED_SITEMAP_PATHS.some(pattern => pattern.test(path));
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(Buffer.from(chunk)));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}

function normalizeUrl(url) {
  return url.replace(/^http:\/\//, 'https://');
}

hexo.extend.filter.register('theme_inject', injects => {
  injects.head.raw('seo-canonical', `
<%
var seoCanonicalUrl = full_url_for(page.canonical_path || page.path || '/').replace(/^http:\\/\\//, 'https://');
var seoIsPost = page.layout === 'post' || page.__post;
var seoJsonLd = {
  '@context': 'https://schema.org',
  '@type': seoIsPost ? 'BlogPosting' : 'WebPage',
  headline: page.title || config.title,
  name: page.title || config.title,
  url: seoCanonicalUrl,
  description: page.description || config.description,
  inLanguage: 'zh-CN',
  author: {
    '@type': 'Person',
    name: page.author || config.author || config.title
  },
  publisher: {
    '@type': 'Organization',
    name: config.title,
    url: String(config.url).replace(/^http:\\/\\//, 'https://')
  }
};
if (seoIsPost && page.date) {
  seoJsonLd.datePublished = page.date.toISOString();
}
if (seoIsPost && page.updated) {
  seoJsonLd.dateModified = page.updated.toISOString();
}
%>
<link rel="canonical" href="<%- seoCanonicalUrl %>">
<% if (seoJsonLd) { %>
<script type="application/ld+json"><%- JSON.stringify(seoJsonLd) %></script>
<% } %>
`);
});

hexo.extend.filter.register('after_generate', async function() {
  const route = this.route;
  const sitemapPaths = ['sitemap.xml', 'baidusitemap.xml'];

  for (const sitemapPath of sitemapPaths) {
    const sitemap = route.get(sitemapPath);
    if (!sitemap) continue;

    let xml = await streamToString(sitemap);
    xml = xml.replace(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g, (block, loc) => {
      const pathname = new URL(normalizeUrl(loc)).pathname.replace(/^\/+/, '');
      if (isExcludedPath(pathname)) return '';
      return block.replace(loc, xmlEscape(normalizeUrl(loc)));
    });
    route.set(sitemapPath, xml);
  }
});
