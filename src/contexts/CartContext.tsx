import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface CartItem {
  id: string; // Unique ID for cart item (goods_id + attributes)
  goods_id: number;
  goods_name: string;
  goods_image: string;
  price: number;
  quantity: number;
  attributes?: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  addToCart: (item: Omit<CartItem, "quantity" | "id">, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
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

  const addToCart = async (item: Omit<CartItem, "quantity" | "id">, quantity = 1) => {
    setLoading(true);
    try {
      // Generate unique ID based on goods_id and attributes
      const attributesStr = item.attributes ? JSON.stringify(item.attributes) : "{}";
      const itemId = `${item.goods_id}-${attributesStr}`;

      // Find if item already exists
      const existingItem = items.find(i => i.id === itemId);
      const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

      // Prepare request data
      const requestData = {
        goods_id: item.goods_id,
        goods_name: item.goods_name,
        goods_image: item.goods_image,
        price: item.price,
        quantity: newQuantity,
        attributes: item.attributes,
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
            i.id === itemId
              ? { ...i, quantity: newQuantity }
              : i
          ));
        } else {
          setItems([...items, { ...item, id: itemId, quantity }]);
        }
        toast.success("Added to cart successfully!");
      } else {
        throw new Error(result.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      // Fallback: still add to local cart even if API fails
      const attributesStr = item.attributes ? JSON.stringify(item.attributes) : "{}";
      const itemId = `${item.goods_id}-${attributesStr}`;
      const existingItem = items.find(i => i.id === itemId);

      if (existingItem) {
        setItems(items.map(i =>
          i.id === itemId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ));
      } else {
        setItems([...items, { ...item, id: itemId, quantity }]);
      }
      toast.warning("Added to cart (offline mode)");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    setLoading(true);
    try {
      // Find item to get goods_id (backend might need it)
      const item = items.find(i => i.id === itemId);

      const requestData = {
        goods_id: item?.goods_id, // Backend might rely on this
        item_id: itemId, // Pass unique ID if backend supports it
        attributes: item?.attributes,
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
        setItems(items.filter(item => item.id !== itemId));
        toast.success("Removed from cart");
      } else {
        throw new Error(result.message || "Failed to remove from cart");
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      // Fallback: still remove from local cart
      setItems(items.filter(item => item.id !== itemId));
      toast.warning("Removed from cart (offline mode)");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setLoading(true);
    try {
      const item = items.find(i => i.id === itemId);

      const requestData = {
        goods_id: item?.goods_id,
        item_id: itemId,
        quantity,
        attributes: item?.attributes,
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
          item.id === itemId ? { ...item, quantity } : item
        ));
      } else {
        throw new Error(result.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error("Update quantity error:", error);
      // Fallback: still update local cart
      setItems(items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
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
