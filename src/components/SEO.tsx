import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterHandle?: string;
  schema?: object;
}

const SEO = ({
  title = "IkarisShoes™ | The Art of Motion - Handcrafted Luxury Footwear",
  description = "Refined silhouettes, handcrafted from the finest Tuscan leathers. Experience the art of motion with IkarisShoes™ Florence. Sustainable, artisan-made luxury footwear.",
  canonical = "https://ikaris-shoes.vercel.app/",
  ogType = "website",
  ogImage = "https://ikaris-shoes.vercel.app/og-image.jpg",
  twitterHandle = "@ikarisshoes",
  schema
}: SEOProps) => {
  const siteName = "IkarisShoes™";
  const finalImage = ogImage;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />

      {/* Favicon / WhatsApp Icon Fallback */}
      <link rel="icon" type="image/png" href="https://ikaris-shoes.vercel.app/favicon.png" />
      <link rel="apple-touch-icon" href="https://ikaris-shoes.vercel.app/favicon.png" />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
