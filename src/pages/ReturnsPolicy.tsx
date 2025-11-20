import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SEO } from "@/components/SEO";

export default function ReturnsPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Returns & Refunds Policy - ShopHub"
        description="Easy returns with ShopHub's 30-day money-back guarantee. Learn about our hassle-free return process, refund policy, and customer protection."
        keywords="returns, refunds, return policy, money back guarantee, exchange"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-4">Returns & Refunds Policy</h1>
        <p className="text-muted-foreground mb-8">
          We want you to be completely satisfied with your purchase. If you're not happy, we're here to help.
        </p>

        <Alert className="mb-8">
          <RotateCcw className="h-4 w-4" />
          <AlertDescription>
            <strong>30-Day Money-Back Guarantee:</strong> Return most items within 30 days for a full refund.
          </AlertDescription>
        </Alert>

        <Card className="mb-8">
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Return an Item</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Contact Us</h3>
                    <p className="text-sm text-muted-foreground">
                      Email us at returns@shophub.com or use our{" "}
                      <Link to="/contact" className="text-primary hover:underline">contact form</Link> with your order number.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Get Authorization</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll send you a return authorization number (RMA) and instructions within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Pack & Ship</h3>
                    <p className="text-sm text-muted-foreground">
                      Pack the item securely in its original packaging with all accessories and documentation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center font-semibold text-primary">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Get Your Refund</h3>
                    <p className="text-sm text-muted-foreground">
                      Once we receive and inspect the item, we'll process your refund within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Requirements</h2>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Items must be unused and in original condition</p>
                    <p className="text-sm text-muted-foreground">Products should be in the same condition as received</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Original packaging required</p>
                    <p className="text-sm text-muted-foreground">Keep all boxes, tags, and accessories</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Proof of purchase needed</p>
                    <p className="text-sm text-muted-foreground">Order number or receipt required</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Return within 30 days</p>
                    <p className="text-sm text-muted-foreground">From the date you received the item</p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Personalized or custom-made items</p>
                </div>
                <div className="flex gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Perishable goods (food, flowers)</p>
                </div>
                <div className="flex gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Intimate or sanitary products</p>
                </div>
                <div className="flex gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Hazardous materials or flammable liquids</p>
                </div>
                <div className="flex gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Items marked as final sale or clearance</p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Refund Process</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Once we receive your return and verify it meets our requirements:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Refunds are processed within 5-7 business days</li>
                <li>Credit will appear on your original payment method</li>
                <li>Original shipping costs are non-refundable</li>
                <li>You'll receive an email confirmation when refund is issued</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Exchanges</h2>
              <p className="text-muted-foreground leading-relaxed">
                We currently don't offer direct exchanges. If you need a different size, color, or model, 
                please return the original item for a refund and place a new order. This ensures you get 
                the item you want as quickly as possible.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Damaged or Defective Items</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If you receive a damaged or defective product:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Contact us immediately with photos of the damage</li>
                <li>We'll arrange a replacement or full refund at no cost to you</li>
                <li>Return shipping will be fully covered by us</li>
                <li>Expedited replacement shipping may be available</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Return Shipping Costs</h2>
              <p className="text-muted-foreground leading-relaxed">
                Return shipping costs are the responsibility of the customer unless the item is defective, 
                damaged, or we sent the wrong product. We recommend using a trackable shipping service and 
                purchasing shipping insurance for valuable items.
              </p>
            </section>

            <Separator />

            <section>
              <div className="flex gap-4 items-start">
                <HelpCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Questions?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about our returns policy, please don't hesitate to{" "}
                    <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
                    Our customer service team is here to help make your return as easy as possible.
                  </p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
