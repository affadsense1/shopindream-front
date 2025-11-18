import { Link } from "react-router-dom";
import { ArrowLeft, Award, Users, Globe, Heart } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="About Us - ShopHub"
        description="Learn about ShopHub's mission to provide quality products at unbeatable prices. Discover our story, values, and commitment to customer satisfaction."
        keywords="about us, company, mission, values, customer service"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About ShopHub</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted destination for quality products at unbeatable prices. 
            We're passionate about bringing you the best shopping experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2020, ShopHub began with a simple mission: to make quality products 
                accessible to everyone. What started as a small online store has grown into a 
                trusted marketplace serving thousands of customers worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We carefully curate every product in our catalog, working directly with manufacturers 
                and authorized distributors to ensure authenticity and quality. Our commitment to 
                customer satisfaction drives everything we do.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe shopping should be easy, enjoyable, and trustworthy. That's why we've 
                built a platform that prioritizes your needs - from product selection to delivery 
                and customer service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our goal is to become your go-to destination for all your shopping needs, offering 
                competitive prices, fast shipping, and exceptional customer support every step of 
                the way.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality First</h3>
              <p className="text-sm text-muted-foreground">
                Every product is verified for authenticity and quality
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Customer Focused</h3>
              <p className="text-sm text-muted-foreground">
                24/7 support to help you with any questions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Global Reach</h3>
              <p className="text-sm text-muted-foreground">
                Shipping to over 100 countries worldwide
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Trusted Brand</h3>
              <p className="text-sm text-muted-foreground">
                Thousands of satisfied customers trust us
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose ShopHub?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3">✓ Competitive Pricing</h3>
                <p className="text-muted-foreground">
                  We work directly with suppliers to offer you the best prices without compromising on quality.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">✓ Fast & Reliable Shipping</h3>
                <p className="text-muted-foreground">
                  Multiple shipping options to get your products to you quickly and safely.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">✓ Secure Shopping</h3>
                <p className="text-muted-foreground">
                  SSL encryption and secure payment processing to protect your information.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">✓ Easy Returns</h3>
                <p className="text-muted-foreground">
                  30-day return policy for your peace of mind. Not satisfied? We'll make it right.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of satisfied customers and discover amazing products today!
          </p>
          <Link to="/">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
