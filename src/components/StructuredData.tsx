import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface Review {
  author: string;
  rating: number;
  content: string;
  date: string;
}

interface ProductSchemaProps {
  type: "product";
  name: string;
  description?: string;
  image: string;
  price: number;
  currency?: string;
  availability?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
  brand?: string;
  sku?: string;
}

interface BreadcrumbSchemaProps {
  type: "breadcrumb";
  items: BreadcrumbItem[];
}

interface OrganizationSchemaProps {
  type: "organization";
}

interface WebsiteSchemaProps {
  type: "website";
}

type StructuredDataProps =
  | ProductSchemaProps
  | BreadcrumbSchemaProps
  | OrganizationSchemaProps
  | WebsiteSchemaProps;

export const StructuredData = (props: StructuredDataProps) => {
  const generateSchema = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

    switch (props.type) {
      case "product": {
        const schema: any = {
          "@context": "https://schema.org",
          "@type": "Product",
          name: props.name,
          description: props.description || props.name,
          image: props.image,
          brand: {
            "@type": "Brand",
            name: props.brand || "ShopHub",
          },
          offers: {
            "@type": "Offer",
            price: props.price.toFixed(2),
            priceCurrency: props.currency || "USD",
            availability: props.availability || "https://schema.org/InStock",
            url: typeof window !== "undefined" ? window.location.href : "",
          },
        };

        if (props.sku) {
          schema.sku = props.sku;
        }

        if (props.rating && props.reviewCount) {
          schema.aggregateRating = {
            "@type": "AggregateRating",
            ratingValue: props.rating.toFixed(1),
            reviewCount: props.reviewCount,
            bestRating: "5",
            worstRating: "1",
          };
        }

        if (props.reviews && props.reviews.length > 0) {
          schema.review = props.reviews.map((review) => ({
            "@type": "Review",
            author: {
              "@type": "Person",
              name: review.author,
            },
            datePublished: review.date,
            reviewBody: review.content,
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating.toString(),
              bestRating: "5",
              worstRating: "1",
            },
          }));
        }

        return schema;
      }

      case "breadcrumb": {
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: props.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${baseUrl}${item.url}`,
          })),
        };
      }

      case "organization": {
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ShopHub",
          url: baseUrl,
          logo: `${baseUrl}/placeholder.svg`,
          description:
            "Shop the latest trends with unbeatable prices and quality. Your one-stop destination for hot products, new arrivals, and amazing deals.",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-800-SHOPHUB",
            contactType: "customer service",
            email: "support@shophub.com",
            availableLanguage: ["English"],
          },
          sameAs: [
            "https://facebook.com/shophub",
            "https://twitter.com/shophub",
            "https://instagram.com/shophub",
          ],
        };
      }

      case "website": {
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ShopHub",
          url: baseUrl,
          description:
            "Shop the latest trends with unbeatable prices and quality. Your one-stop destination for hot products, new arrivals, and amazing deals.",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        };
      }

      default:
        return null;
    }
  };

  const schema = generateSchema();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
