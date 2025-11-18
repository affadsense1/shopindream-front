import { useEffect, useState } from "react";
import { Product, productAPI } from "@/services/api";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductSectionProps {
  title: string;
  category?: string;
  count?: number;
}

export const ProductSection = ({ title, category, count = 8 }: ProductSectionProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productAPI.getRandom(category, count);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, count]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: count }).map((_, index) => (
                <div key={`skeleton-${index}`} className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            : products.map((product) => (
                <ProductCard key={`product-${product.goods_id}`} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
};
