import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Filter, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product, SearchResponse, productAPI } from "@/services/api";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "score_desc");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const data = await productAPI.search({
          q: query,
          page: currentPage,
          limit: 20,
          sort: sortBy,
        });
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
        toast.error("Failed to load search results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, currentPage, sortBy]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SEO 
          title={`Searching for "${query}" - ShopHub`}
          description={`Find products matching "${query}" on ShopHub. Browse quality products at great prices.`}
          keywords={`search, ${query}, products, shop, online store`}
        />
        <StructuredData
          type="breadcrumb"
          items={[
            { name: "Home", url: "/" },
            { name: "Search", url: "/search" },
            { name: `"${query}"`, url: `/search?q=${encodeURIComponent(query)}` }
          ]}
        />
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const products = results?.items || [];
  const totalResults = results?.total || 0;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`"${query}" - Search Results | ShopHub`}
        description={`Found ${totalResults} products matching "${query}". Shop quality products at great prices on ShopHub.`}
        keywords={`search, ${query}, products, shop, online store, results`}
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "/" },
          { name: "Search", url: "/search" },
          { name: `"${query}"`, url: `/search?q=${encodeURIComponent(query)}` }
        ]}
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-muted-foreground">
            Found {totalResults} products
            {results?.processing_time_ms && (
              <span className="ml-2 text-sm">
                ({results.processing_time_ms}ms)
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm">
              All Categories
            </Badge>
          </div>
          
          <div className="flex gap-3 items-center">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Sort by:
            </span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score_desc">Relevance</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="sales_desc">Most Popular</SelectItem>
                <SelectItem value="created_desc">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="mb-8" />

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {products.map((product) => (
              <ProductCard key={product.goods_id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">No results found</h2>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search or browse our categories
            </p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        )}

        {products.length > 0 && results && results.total_pages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {currentPage > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
            )}
            {Array.from({ length: Math.min(results.total_pages, 5) }).map((_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={i}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              );
            })}
            {currentPage < results.total_pages && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
