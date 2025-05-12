// src/utils/sitemapGenerator.ts
import fs from 'fs';
import path from 'path';
import { fetchProducts } from '@/lib/supabaseDb';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternateLanguages?: {
    hreflang: string;
    href: string;
  }[];
}

// Base URL for the site
const BASE_URL = 'https://flipper-zero-shop-link.lovable.app';

// Format date to ISO format (YYYY-MM-DD)
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Get current date formatted
const getCurrentDate = (): string => {
  return formatDate(new Date());
};

// Create static URLs that don't depend on database
const getStaticUrls = (): SitemapUrl[] => {
  const today = getCurrentDate();
  return [
    {
      loc: `${BASE_URL}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0,
      alternateLanguages: [
        { hreflang: 'en', href: `${BASE_URL}/en` },
        { hreflang: 'he', href: `${BASE_URL}/he` },
      ]
    },
    {
      loc: `${BASE_URL}/products`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.9,
      alternateLanguages: [
        { hreflang: 'en', href: `${BASE_URL}/en/products` },
        { hreflang: 'he', href: `${BASE_URL}/he/products` },
      ]
    },
    {
      loc: `${BASE_URL}/categories/device`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
      alternateLanguages: [
        { hreflang: 'en', href: `${BASE_URL}/en/categories/device` },
        { hreflang: 'he', href: `${BASE_URL}/he/categories/device` },
      ]
    },
    {
      loc: `${BASE_URL}/categories/accessory`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
      alternateLanguages: [
        { hreflang: 'en', href: `${BASE_URL}/en/categories/accessory` },
        { hreflang: 'he', href: `${BASE_URL}/he/categories/accessory` },
      ]
    },
    {
      loc: `${BASE_URL}/categories/bundle`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
      alternateLanguages: [
        { hreflang: 'en', href: `${BASE_URL}/en/categories/bundle` },
        { hreflang: 'he', href: `${BASE_URL}/he/categories/bundle` },
      ]
    },
    {
      loc: `${BASE_URL}/cart`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5,
      alternateLanguages: [
        { hreflang: 'en', href: `${BASE_URL}/en/cart` },
        { hreflang: 'he', href: `${BASE_URL}/he/cart` },
      ]
    }
  ];
};

// Generate URLs for all products
const getProductUrls = async (): Promise<SitemapUrl[]> => {
  try {
    const products = await fetchProducts();
    const today = getCurrentDate();
    
    return products.map(product => ({
      loc: `${BASE_URL}/products/${product.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
      alternateLanguages: [
        { hreflang: 'en', href: `${BASE_URL}/en/products/${product.slug}` },
        { hreflang: 'he', href: `${BASE_URL}/he/products/${product.slug}` },
      ]
    }));
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    return [];
  }
};

// Generate XML content for the sitemap
const generateSitemapXml = (urls: SitemapUrl[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    if (url.lastmod) {
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    }
    if (url.changefreq) {
      xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    }
    if (url.priority !== undefined) {
      xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    }
    
    // Add alternate language URLs
    if (url.alternateLanguages) {
      url.alternateLanguages.forEach(alt => {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />\n`;
      });
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
};

// The main function to generate and write the sitemap
export const generateSitemap = async (outputPath: string = 'public/sitemap.xml'): Promise<void> => {
  try {
    // Get all URLs
    const staticUrls = getStaticUrls();
    const productUrls = await getProductUrls();
    const allUrls = [...staticUrls, ...productUrls];
    
    // Generate the XML content
    const xml = generateSitemapXml(allUrls);
    
    // Write to file
    fs.writeFileSync(path.resolve(outputPath), xml);
    console.log(`Sitemap generated at ${outputPath}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

// Export individual functions for testing
export { getStaticUrls, getProductUrls, generateSitemapXml };