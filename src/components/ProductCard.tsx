import { Link } from "react-router-dom";
import { Star, ShoppingCart, Flame, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/services/api";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const displayPrice = product.special_price || product.actual_price || product.price;
  const hasDiscount = product.special_price && product.special_price < product.price;

  // Generate consistent random sales number based on product ID
  const generateSales = (id: number) => {
    const seed = id * 9301 + 49297;
    const random = (seed % 233280) / 233280;
    return Math.floor(random * 4900) + 100; // Random between 100-5000
  };

  const salesCount = product.sales > 0 ? product.sales : generateSales(product.goods_id);
  const isHotSelling = salesCount > 2000;
  const isTrending = salesCount > 3500;

  // Calculate discount percentage
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - displayPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      goods_id: product.goods_id,
      goods_name: product.goods_name,
      goods_image: product.goods_image,
      price: displayPrice,
    });
  };

  return (
    <Card className="group relative overflow-hidden interactive-card border-0 bg-card/50 backdrop-blur-sm">
      {/* 🌈 Gradient Border Effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

      <div className="relative bg-card rounded-xl overflow-hidden">
        <Link to={`/product/${product.goods_id}`}>
          {/* 🖼️ Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary">
            <img
              src={product.goods_image || "/placeholder.svg"}
              alt={product.goods_name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />

            {/* 🎨 Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* 🏷️ Badges */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
              {hasDiscount && (
                <Badge className="bg-gradient-to-r from-accent to-orange-500 text-white border-0 shadow-lg font-bold px-3 py-1">
                  -{discountPercentage}%
                </Badge>
              )}
              {isTrending && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg pulse-glow">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  TRENDING
                </Badge>
              )}
              {isHotSelling && !isTrending && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg pulse-glow">
                  <Flame className="w-3 h-3 mr-1" />
                  HOT
                </Badge>
              )}
            </div>

            {/* ⚡ Quick Add Button - Shows on Hover */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl interactive-button"
                size="sm"
              >
                <Zap className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>
        </Link>

        <CardContent className="p-4 space-y-3">
          <Link to={`/product/${product.goods_id}`}>
            <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors leading-snug">
              {product.goods_name}
            </h3>
          </Link>

          {/* ⭐ Rating & Sales */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-950/30">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                {(product.score < 4.5 ? 4.5 : product.score).toFixed(1)}
              </span>
            </div>

            <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${isHotSelling
              ? 'bg-orange-50 dark:bg-orange-950/30'
              : 'bg-secondary'
              }`}>
              {isHotSelling && <Flame className="w-3 h-3 text-orange-500" />}
              <span className={`text-xs font-semibold ${isHotSelling
                ? 'text-orange-600 dark:text-orange-400'
                : 'text-muted-foreground'
                }`}>
                {salesCount.toLocaleString()} sold
              </span>
            </div>
          </div>

          {/* 💰 Price - 使用电商红色突出显示 */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black" style={{ color: 'hsl(var(--commerce-price))' }}>
              ${displayPrice?.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through font-medium">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full group/btn relative overflow-hidden text-white border-0 transition-all duration-300 shadow-md hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--commerce-accent)) 0%, hsl(14 100% 50%) 100%)'
            }}
            size="sm"
            onClick={handleAddToCart}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <ShoppingCart className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10 font-semibold">Add to Cart</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
