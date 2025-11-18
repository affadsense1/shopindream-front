import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SEO } from "@/components/SEO";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Terms of Service - ShopHub"
        description="Read ShopHub's Terms of Service. Learn about our policies on orders, payments, shipping, returns, and user responsibilities."
        keywords="terms of service, terms and conditions, legal, policies, user agreement"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using ShopHub's website and services, you accept and agree to be bound 
                by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Account Registration</h2>
              <p className="text-muted-foreground leading-relaxed">
                To make purchases, you may need to create an account. You are responsible for maintaining 
                the confidentiality of your account credentials and for all activities under your account. 
                You must provide accurate and complete information during registration.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Product Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to provide accurate product descriptions and pricing. However, we do not warrant 
                that product descriptions, pricing, or other content is accurate, complete, or error-free. 
                We reserve the right to correct errors and update information at any time without prior notice.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Orders and Payments</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                By placing an order, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Provide accurate billing and shipping information</li>
                <li>Pay all charges at the prices in effect when incurred</li>
                <li>Accept that we may cancel orders for any reason</li>
                <li>Understand that order confirmation does not guarantee product availability</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                Shipping times are estimates and not guaranteed. We are not responsible for delays caused 
                by shipping carriers or customs. Risk of loss passes to you upon delivery to the carrier. 
                See our <Link to="/shipping" className="text-primary hover:underline">Shipping Policy</Link> for more details.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Returns and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                We offer a 30-day return policy for most items. Products must be unused and in original 
                packaging. Some items are non-returnable. Please review our{" "}
                <Link to="/returns" className="text-primary hover:underline">Return Policy</Link> for complete details.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, graphics, logos, and images, is the property 
                of ShopHub and protected by copyright laws. You may not reproduce, distribute, or create 
                derivative works without our express written permission.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                ShopHub shall not be liable for any indirect, incidental, special, or consequential damages 
                arising from your use of our website or products. Our total liability shall not exceed the 
                amount paid by you for the product in question.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please{" "}
                <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
