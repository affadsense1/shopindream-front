import { Link } from "react-router-dom";
import { Star, ShoppingCart, Flame } from "lucide-react";
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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/product/${product.goods_id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.goods_image || "/placeholder.svg"}
            alt={product.goods_name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {hasDiscount && (
              <Badge className="bg-accent text-accent-foreground hover:bg-accent">
                SALE
              </Badge>
            )}
            {isHotSelling && (
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse">
                <Flame className="w-3 h-3 mr-1" />
                HOT
              </Badge>
            )}
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/product/${product.goods_id}`}>
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 hover:text-primary transition-colors">
            {product.goods_name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">
            {(product.score < 4.5 ? 4.5 : product.score).toFixed(1)}
          </span>
          <span className={`text-xs font-semibold ${isHotSelling ? 'text-orange-600 dark:text-orange-400' : 'text-muted-foreground'}`}>
            ({salesCount.toLocaleString()} sold)
          </span>
          {isHotSelling && (
            <Flame className="w-3 h-3 text-orange-500 animate-pulse" />
          )}
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">
            ${displayPrice?.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
