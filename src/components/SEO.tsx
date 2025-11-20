import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

export const SEO = ({
  title = "ShopHub - Discover Amazing Products",
  description = "Shop the latest trends with unbeatable prices and quality. Your one-stop destination for hot products, new arrivals, and amazing deals.",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
  keywords = "shopping, online store, products, deals, fashion, electronics",
}: SEOProps) => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const fullUrl = url || siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="ShopHub" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@ShopHub" />
      <meta name="twitter:creator" content="@ShopHub" />
    </Helmet>
  );
};
