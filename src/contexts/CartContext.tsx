import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface CartItem {
  goods_id: number;
  goods_name: string;
  goods_image: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => Promise<void>;
  removeFromCart: (goodsId: number) => Promise<void>;
  updateQuantity: (goodsId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_API_URL = "https://api.shopindream.shop/public/api/cart/cart.php";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = async (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setLoading(true);
    try {
      // Find if item already exists
      const existingItem = items.find(i => i.goods_id === item.goods_id);
      const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

      // Prepare request data
      const requestData = {
        goods_id: item.goods_id,
        goods_name: item.goods_name,
        goods_image: item.goods_image,
        price: item.price,
        quantity: newQuantity,
        action: "add"
      };

      // Submit to backend
      const response = await fetch(CART_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.status === 200 || result.code === 200) {
        // Update local state
        if (existingItem) {
          setItems(items.map(i =>
            i.goods_id === item.goods_id
              ? { ...i, quantity: newQuantity }
              : i
          ));
        } else {
          setItems([...items, { ...item, quantity }]);
        }
        toast.success("Added to cart successfully!");
      } else {
        throw new Error(result.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      // Fallback: still add to local cart even if API fails
      const existingItem = items.find(i => i.goods_id === item.goods_id);
      if (existingItem) {
        setItems(items.map(i =>
          i.goods_id === item.goods_id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ));
      } else {
        setItems([...items, { ...item, quantity }]);
      }
      toast.warning("Added to cart (offline mode)");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (goodsId: number) => {
    setLoading(true);
    try {
      const requestData = {
        goods_id: goodsId,
        action: "remove"
      };

      const response = await fetch(CART_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.status === 200 || result.code === 200) {
        setItems(items.filter(item => item.goods_id !== goodsId));
        toast.success("Removed from cart");
      } else {
        throw new Error(result.message || "Failed to remove from cart");
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      // Fallback: still remove from local cart
      setItems(items.filter(item => item.goods_id !== goodsId));
      toast.warning("Removed from cart (offline mode)");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (goodsId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(goodsId);
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        goods_id: goodsId,
        quantity,
        action: "update"
      };

      const response = await fetch(CART_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.status === 200 || result.code === 200) {
        setItems(items.map(item =>
          item.goods_id === goodsId ? { ...item, quantity } : item
        ));
      } else {
        throw new Error(result.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error("Update quantity error:", error);
      // Fallback: still update local cart
      setItems(items.map(item =>
        item.goods_id === goodsId ? { ...item, quantity } : item
      ));
      toast.warning("Updated quantity (offline mode)");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
