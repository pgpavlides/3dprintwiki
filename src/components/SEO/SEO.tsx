import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = '3D Print Wiki - Your 3D Printing Resource',
  description = 'Comprehensive 3D printing knowledge base covering materials, techniques, troubleshooting, and best practices for FDM, SLA, and resin printing.',
  keywords = '3D printing, FDM, SLA, resin, PLA, ABS, PETG, materials, troubleshooting, guide, wiki',
  image = '/meta_image/meta_image.png',
  url = 'https://3dprintwiki.com', // Replace with your actual domain
  type = 'website'
}: SEOProps) {
  const fullImageUrl = `${url}${image}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="3D Print Wiki" />
      
      {/* Favicon */}
      <link rel="icon" href="/logo/logo.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/logo/logo.svg" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#3B82F6" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "3D Print Wiki",
          "description": description,
          "url": url,
          "image": fullImageUrl,
          "publisher": {
            "@type": "Organization",
            "name": "3D Print Wiki",
            "logo": {
              "@type": "ImageObject",
              "url": `${url}/logo/logo.svg`
            }
          }
        })}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "3D Print Wiki",
          "url": url,
          "logo": `${url}/logo/logo.svg`,
          "description": "Comprehensive 3D printing knowledge base",
          "foundingDate": "2025",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "availableLanguage": "English"
          }
        })}
      </script>
    </Helmet>
  );
}
