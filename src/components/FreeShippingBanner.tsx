import { Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export const FreeShippingBanner = () => {
  const { totalAmount } = useCart();
  const freeShippingThreshold = 50;
  const remaining = Math.max(0, freeShippingThreshold - totalAmount);
  const hasFreeShipping = totalAmount >= freeShippingThreshold;

  return (
    <div className="bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 border-b border-accent/30">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Truck className="w-4 h-4 text-accent" />
          {hasFreeShipping ? (
            <span className="font-semibold text-accent">
              🎉 Congratulations! You've unlocked FREE SHIPPING!
            </span>
          ) : (
            <span className="font-medium">
              <span className="text-foreground">Free shipping on orders over </span>
              <span className="font-bold text-accent">${freeShippingThreshold}</span>
              {totalAmount > 0 && (
                <span className="text-muted-foreground">
                  {" "}• Add <span className="font-bold text-accent">${remaining.toFixed(2)}</span> more to unlock
                </span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
