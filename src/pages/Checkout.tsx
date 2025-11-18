import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { SEO } from "@/components/SEO";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name required").max(50),
  lastName: z.string().min(2, "Last name required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().min(1, "Country required"),
  state: z.string().optional(),
  city: z.string().min(1, "City required"),
  address: z.string().min(5, "Address required"),
  zipCode: z.string().min(3, "ZIP code required"),
});

const CHECKOUT_API_URL = "https://api.shopindream.shop/public/api/cart/checkout.php";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: user?.username?.split(" ")[0] || "",
    lastName: user?.username?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phone || "",
    country: "",
    state: "",
    city: "",
    address: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", 
    "Germany", "France", "Japan", "China", "India", "Brazil"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (items.length === 0) {
      toast.error("Your cart is empty");
      navigate("/");
      return;
    }
    
    try {
      const validated = checkoutSchema.parse(formData);
      
      setLoading(true);

      // Prepare checkout data
      const checkoutData = {
        user_id: user?.user_id || null,
        email: validated.email,
        shipping_address: {
          first_name: validated.firstName,
          last_name: validated.lastName,
          phone: validated.phone || "",
          country: validated.country,
          state: validated.state || "",
          city: validated.city,
          address: validated.address,
          zip_code: validated.zipCode,
        },
        items: items.map(item => ({
          goods_id: item.goods_id,
          goods_name: item.goods_name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
        subtotal: totalAmount,
        shipping_fee: totalAmount >= 50 ? 0 : 10,
        total: totalAmount + (totalAmount >= 50 ? 0 : 10),
      };

      // Submit to backend
      const response = await fetch(CHECKOUT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
        body: JSON.stringify(checkoutData),
      });

      const result = await response.json();

      if (result.status === 200 || result.code === 200) {
        const orderId = result.data?.order_id || result.order_id;
        
        clearCart();
        toast.success("Order placed successfully!", {
          description: `Order #${orderId}. You will receive a confirmation email shortly.`,
        });
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error(result.message || "Failed to place order");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      
      if (error instanceof z.ZodError) {
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            validationErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(validationErrors);
        toast.error("Please check all required fields");
      } else {
        toast.error(error.message || "Failed to place order. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const subtotal = totalAmount;
  const freeShippingThreshold = 50;
  const shipping = totalAmount >= freeShippingThreshold ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Checkout - ShopHub"
        description="Complete your purchase securely on ShopHub. Fast checkout process with multiple payment options and worldwide shipping."
        keywords="checkout, payment, order, purchase, secure payment"
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8" />
            Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Shipping Information Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter your delivery address details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Address Fields */}
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleInputChange("country", value)}
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          placeholder="California"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="Los Angeles"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="123 Main Street, Apt 4B"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="90001"
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Place Order
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={index} className="flex justify-between py-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.goods_name}</p>
                          <p className="text-xs text-muted-foreground">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span className="font-medium text-accent">FREE</span>
                      ) : (
                        <span>${shipping.toFixed(2)}</span>
                      )}
                    </div>
                    {totalAmount < freeShippingThreshold && (
                      <div className="text-xs text-muted-foreground">
                        Add ${(freeShippingThreshold - totalAmount).toFixed(2)} more for free shipping
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg text-sm text-muted-foreground">
                    <p className="mb-2">✓ Secure checkout</p>
                    <p className="mb-2">✓ Free returns within 30 days</p>
                    <p>✓ 24/7 customer support</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
