import { useEffect, useState } from "react";
import { Product, productAPI } from "@/services/api";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

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
    <section className="py-16 relative">
      {/* 🎨 Background Decoration */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* ✨ Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-30"></div>
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-gradient-primary">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Handpicked just for you
              </p>
            </div>
          </div>

          {/* 🔥 View All Link */}
          <button className="group px-6 py-2 rounded-lg glass hover:glass-strong transition-all duration-300">
            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              View All →
            </span>
          </button>
        </div>

        {/* 🎯 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: count }).map((_, index) => (
              <div key={`skeleton-${index}`} className="space-y-4 animate-in fade-in duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
            : products.map((product, index) => (
              <div
                key={`product-${product.goods_id}`}
                className="animate-in fade-in scale-in duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
