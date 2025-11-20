import { Link } from "react-router-dom";
import { ArrowLeft, Truck, Package, Globe, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SEO } from "@/components/SEO";

export default function ShippingInfo() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Shipping Information - ShopHub"
        description="Learn about ShopHub's shipping options, delivery times, and costs. Free shipping on orders over $50 with worldwide delivery available."
        keywords="shipping, delivery, free shipping, international shipping, tracking"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
        <p className="text-muted-foreground mb-12">
          Everything you need to know about our shipping options and delivery times.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Free Shipping</p>
              <p className="text-xs text-muted-foreground">Orders over $50</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Secure Packaging</p>
              <p className="text-xs text-muted-foreground">Protected delivery</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Worldwide</p>
              <p className="text-xs text-muted-foreground">100+ countries</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Fast Delivery</p>
              <p className="text-xs text-muted-foreground">2-7 business days</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Options</h2>
              
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Standard Shipping</h3>
                    <span className="text-primary font-semibold">$5.99</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Delivery in 5-7 business days
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ✓ Free on orders over $50
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Express Shipping</h3>
                    <span className="text-primary font-semibold">$12.99</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Delivery in 2-3 business days
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ✓ Priority handling and expedited delivery
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">International Shipping</h3>
                    <span className="text-primary font-semibold">Varies</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Delivery in 7-21 business days
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ✓ Calculated at checkout based on destination
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Processing Time</h2>
              <p className="text-muted-foreground leading-relaxed">
                Orders are typically processed within 1-2 business days. You will receive a confirmation 
                email with tracking information once your order has shipped. Please note that business 
                days do not include weekends or holidays.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Tracking Your Order</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Once your order ships, you'll receive:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Email confirmation with tracking number</li>
                <li>Link to track your package in real-time</li>
                <li>Estimated delivery date</li>
                <li>Updates on delivery status</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">International Shipping</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We ship to over 100 countries worldwide. Please note:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Customs duties and taxes may apply</li>
                <li>Delivery times vary by destination</li>
                <li>Customs clearance may cause delays</li>
                <li>International orders cannot be expedited</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Shipping Restrictions</h2>
              <p className="text-muted-foreground leading-relaxed">
                We currently do not ship to P.O. boxes or APO/FPO addresses. Some products may have 
                shipping restrictions based on destination. These will be indicated on the product page.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Delivery Issues</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If you experience any delivery problems:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Check the tracking information for updates</li>
                <li>Contact the carrier directly for delivery assistance</li>
                <li>Reach out to our customer service team</li>
                <li>We'll work with you to resolve any issues promptly</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Questions?</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any shipping-related questions, please{" "}
                <Link to="/contact" className="text-primary hover:underline">contact our support team</Link>.
                We're here to help ensure your order arrives safely and on time.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
