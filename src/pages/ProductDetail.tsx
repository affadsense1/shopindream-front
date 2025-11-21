import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, TrendingUp, Shield, Package, Award, Globe } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductDetail as ProductDetailType, productAPI } from "@/services/api";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { UrgencyIndicators } from "@/components/product/UrgencyIndicators";
import { ProductAttributes } from "@/components/product/ProductAttributes";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { SizeGuideDialog } from "@/components/product/SizeGuideDialog";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

  // Generate consistent random sales number for detail page (10-200 range)
  const generateDetailSales = (goodsId: number) => {
    const seed = goodsId * 9301 + 49297;
    const random = (seed % 233280) / 233280;
    return Math.floor(random * 191) + 10; // Random between 10-200
  };

  const handleAttributeSelect = (attrs: Record<string, string>) => {
    setSelectedAttributes(prev => {
      // Simple deep equality check to prevent infinite loops
      if (JSON.stringify(prev) === JSON.stringify(attrs)) return prev;
      return attrs;
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const data = await productAPI.getDetail(parseInt(id));
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.picture && product.picture.length > 0
    ? product.picture
    : [product.goods_image];

  // Safely parse prices
  const basePrice = typeof product.goods_price === 'string'
    ? parseFloat(product.goods_price)
    : (product.goods_price || 0);
  const specialPrice = typeof product.special_price === 'number'
    ? product.special_price
    : (product.special_price ? parseFloat(String(product.special_price)) : 0);

  const displayPrice = specialPrice > 0 ? specialPrice : basePrice;
  const hasDiscount = specialPrice > 0 && specialPrice < basePrice;
  const discountPercentage = hasDiscount ? Math.round((1 - specialPrice / basePrice) * 100) : 0;

  const hasDescription = product.content && product.content.trim().length > 0;
  const hasReviews = product.review && product.review.length > 0;

  // Use real sales or generate a reasonable number
  const salesCount = product.goods_sales > 0 ? product.goods_sales : generateDetailSales(product.goods_id);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      goods_id: product.goods_id,
      goods_name: product.goods_name,
      goods_image: product.goods_image,
      price: displayPrice,
      attributes: selectedAttributes,
    }, quantity);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.goods_name,
          text: product.short_desc,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={`${product.goods_name} - ShopHub`}
        description={product.short_desc || product.goods_name || `Buy ${product.goods_name} at great prices on ShopHub. Quality products with fast shipping.`}
        keywords={`${product.goods_name}, buy online, shop, quality products`}
        image={product.goods_image}
        type="product"
      />
      <StructuredData
        type="product"
        name={product.goods_name}
        description={product.short_desc || product.goods_name}
        image={product.goods_image}
        price={displayPrice}
        currency="USD"
        availability="https://schema.org/InStock"
        rating={product.score < 4.5 ? 4.5 : product.score}
        reviewCount={hasReviews ? product.review.length : 0}
        reviews={hasReviews ? product.review.map(review => ({
          author: review.name || "Anonymous",
          rating: review.star || 5,
          content: review.content,
          date: new Date().toISOString().split('T')[0]
        })) : undefined}
        brand="ShopHub"
        sku={product.goods_id.toString()}
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
          { name: product.goods_name, url: `/product/${product.goods_id}` }
        ]}
      />
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <ProductImageGallery images={images} productName={product.goods_name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
            {/* Title & Rating */}
            <div>
              <h1 className="text-4xl font-bold mb-3 leading-tight">{product.goods_name}</h1>
              {product.short_desc && (
                <p className="text-lg text-muted-foreground">{product.short_desc}</p>
              )}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => {
                  // Ensure product score is at least 4.5
                  const adjustedScore = product.score < 4.5 ? 4.5 : product.score;
                  return (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(adjustedScore)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                        }`}
                    />
                  )
                })}
                <span className="ml-2 font-semibold text-lg">
                  {((product.score < 4.5 ? 4.5 : product.score).toFixed(1))}
                </span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="font-medium">
                  {salesCount.toLocaleString()} sold
                </span>
              </div>
            </div>

            {/* Price - 使用电商红色突出显示 */}
            <div className="flex items-baseline gap-3 py-4">
              <span className="text-5xl font-bold" style={{ color: 'hsl(var(--commerce-price))' }}>
                ${(displayPrice || 0).toFixed(2)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-2xl text-muted-foreground line-through">
                    ${(basePrice || 0).toFixed(2)}
                  </span>
                  <Badge variant="secondary" className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-base px-3 py-1">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Tags */}
            {product.tag && (
              <div className="flex flex-wrap gap-2">
                {product.tag.split(",").map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            )}

            <Separator />

            {/* Urgency Indicators */}
            <UrgencyIndicators stockTotal={product.stock_total || 0} />

            <Separator />

            {/* Product Attributes */}
            <ProductAttributes attributes={product.attr} onSelect={handleAttributeSelect} />

            <Separator />

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-base font-semibold">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-12 px-4 hover:bg-secondary rounded-none"
                  >
                    -
                  </Button>
                  <span className="px-6 font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock_total || 999, quantity + 1))}
                    className="h-12 px-4 hover:bg-secondary rounded-none"
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock_total} available
                </span>
              </div>
            </div>

            {/* Size Guide for Clothing/Shoes */}
            <SizeGuideDialog />

            {/* Action Buttons - 主 CTA 使用电商橙色 */}
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 h-14 text-base font-semibold text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--commerce-accent)) 0%, hsl(14 100% 50%) 100%)'
                }}
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-6"
                onClick={handleToggleFavorite}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-6"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="font-semibold text-sm">Free Shipping</div>
                <div className="text-xs text-muted-foreground mt-1">On orders over $50</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="font-semibold text-sm">Easy Returns</div>
                <div className="text-xs text-muted-foreground mt-1">30-day guarantee</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="font-semibold text-sm">Secure Payment</div>
                <div className="text-xs text-muted-foreground mt-1">SSL encrypted</div>
              </div>
            </div>

            {/* Sales Milestone */}
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-4 rounded-lg border border-accent/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    {salesCount > 150 ? "Bestseller Alert!" : "Popular Choice"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {salesCount > 150
                      ? `Already sold ${salesCount} units this month`
                      : `Shipped to ${Math.floor(salesCount / 3)} happy customers`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buyer Protection & Guarantees */}
        <Card className="mt-12 border-2 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Buyer Protection Guarantee
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Package className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">30-Day Returns</h4>
                    <p className="text-sm text-muted-foreground">
                      Not satisfied? Return within 30 days for a full refund, no questions asked.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Award className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Quality Warranty</h4>
                    <p className="text-sm text-muted-foreground">
                      12-month warranty covers all manufacturing defects. Free replacement for quality issues.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Globe className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Shipping Protection</h4>
                    <p className="text-sm text-muted-foreground">
                      Full shipping insurance included. Lost or damaged packages are fully refunded.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Secure Checkout</h4>
                    <p className="text-sm text-muted-foreground">
                      256-bit SSL encryption. Your payment details are never stored on our servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Details Tabs */}
        <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <CardContent className="p-8">
            <Tabs defaultValue={hasDescription ? "description" : "images"}>
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                {hasDescription && (
                  <TabsTrigger
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    Description
                  </TabsTrigger>
                )}
                {!hasDescription && images.length > 0 && (
                  <TabsTrigger
                    value="images"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    Product Images
                  </TabsTrigger>
                )}
                <TabsTrigger
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Reviews ({product.review?.length || 0})
                </TabsTrigger>
              </TabsList>

              {hasDescription ? (
                <TabsContent value="description" className="mt-8">
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.content }}
                  />
                </TabsContent>
              ) : (
                <TabsContent value="images" className="mt-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden bg-secondary hover:scale-105 transition-transform">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${product.goods_name} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}

              <TabsContent value="specifications" className="mt-8">
                {product.attr && Object.keys(product.attr).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.attr).map(([key, value]) => (
                      <div key={key} className="flex border-b border-border pb-3">
                        <span className="font-semibold w-1/3 text-muted-foreground">{key}:</span>
                        <span className="flex-1">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No specifications available for this product.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <div className="space-y-8">
                  {hasReviews ? (
                    product.review.map((review, index) => {
                      // Ensure all reviews are 4.5+ stars (convert to 4 or 5 stars display)
                      const adjustedScore = review.star < 4 ? (review.star > 2 ? 5 : 4) : review.star;

                      return (
                        <div key={index} className="border-b border-border pb-8 last:border-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex gap-0.5">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-5 h-5 ${i < adjustedScore ? "fill-amber-400 text-amber-400" : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                                        }`}
                                    />
                                  ))}
                                </div>
                                <span className="font-semibold">{review.name}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{review.content}</p>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">
                        No reviews yet. Be the first to review this product!
                      </p>
                      <Button variant="outline">Write a Review</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl font-bold mb-2">Customers Also Bought</h2>
          <p className="text-muted-foreground mb-8">
            Popular products frequently purchased together with this item
          </p>
          <RelatedProducts currentProductId={product.goods_id} category="hot" />
        </div>

        {/* FAQ Section */}
        <Card className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">What is your return policy?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you're not satisfied with your purchase,
                  you can return it for a full refund within 30 days of delivery.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">How long does shipping take?</h3>
                <p className="text-muted-foreground">
                  Standard shipping typically takes 5-7 business days. Express shipping options are
                  available at checkout for faster delivery (2-3 business days).
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">Is this product authentic?</h3>
                <p className="text-muted-foreground">
                  Yes, all our products are 100% authentic and sourced directly from authorized
                  distributors. We guarantee the quality and authenticity of every item.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2">Do you offer international shipping?</h3>
                <p className="text-muted-foreground">
                  Yes, we ship worldwide! International shipping times and costs vary by location.
                  You can see the exact shipping cost at checkout.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Buy From Us */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Shopping</h3>
              <p className="text-sm text-muted-foreground">
                Your payment information is encrypted and secure. We never store your credit card details.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-muted-foreground">
                Every product goes through strict quality control. We stand behind what we sell.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Customer Satisfaction</h3>
              <p className="text-sm text-muted-foreground">
                Join thousands of happy customers. Our support team is here to help 24/7.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
