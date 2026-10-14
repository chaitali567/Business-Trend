import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedDate?: string;
  authorName?: string;
}

export function SEOHead({
  title,
  description,
  canonicalPath = '',
  ogImage,
  ogType = 'website',
  publishedDate,
  authorName = 'Chaitali Kalal',
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Title Tag
    document.title = title;

    // Helper to safely set meta tags
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let meta = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attributeName, attributeValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper to safely set link tags
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // 2. Meta description
    setMetaTag('name', 'description', description);

    // 3. OpenGraph tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);

    const fullUrl = typeof window !== 'undefined'
      ? `${window.location.origin}${canonicalPath || window.location.pathname}`
      : `https://thebusinessbehindthetrend.com${canonicalPath}`;

    setMetaTag('property', 'og:url', fullUrl);
    setLinkTag('canonical', fullUrl);

    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
      setMetaTag('name', 'twitter:image', ogImage);
    }

    // 4. Twitter tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);

    // 5. Dynamic JSON-LD structured data for article or website
    let scriptTag = document.getElementById('dynamic-seo-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-seo-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (ogType === 'article') {
      scriptTag.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: ogImage ? [ogImage] : undefined,
        datePublished: publishedDate,
        author: {
          '@type': 'Person',
          name: authorName,
          url: 'https://thebusinessbehindthetrend.com/about',
        },
        publisher: {
          '@type': 'Organization',
          name: 'The Business Behind the Trend',
          logo: {
            '@type': 'ImageObject',
            url: 'https://thebusinessbehindthetrend.com/favicon.ico',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl,
        },
      });
    } else {
      scriptTag.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'The Business Behind the Trend',
        url: fullUrl,
        description: description,
      });
    }
  }, [title, description, canonicalPath, ogImage, ogType, publishedDate, authorName]);

  return null;
}
