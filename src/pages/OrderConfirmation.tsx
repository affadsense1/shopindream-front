import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function OrderConfirmation() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");

    useEffect(() => {
        // Optional: Clear cart or perform other cleanup actions here
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO title="Order Confirmed - ShopHub" description="Thank you for your purchase" />
            <Header />

            <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>

                <h1 className="text-4xl font-bold mb-4 tracking-tight">Thank You for Your Order!</h1>
                <p className="text-xl text-muted-foreground max-w-md mb-8">
                    Your order {orderId ? <span className="font-medium text-foreground">#{orderId}</span> : ""} has been successfully placed. We've sent a confirmation email to your inbox.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                    <Button size="lg" className="gap-2" onClick={() => navigate("/products")}>
                        <ShoppingBag className="w-4 h-4" />
                        Continue Shopping
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2" onClick={() => navigate("/")}>
                        Return Home
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
