import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-24 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Discover Amazing Products
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            Shop the latest trends with unbeatable prices and quality
          </p>
          
          <form onSubmit={handleSearch} className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <div className="flex gap-2 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-12 text-base bg-background/80 backdrop-blur"
                />
              </div>
              <Button type="submit" size="lg" className="px-8">
                Search
              </Button>
            </div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button variant="secondary" size="sm">
              Electronics
            </Button>
            <Button variant="secondary" size="sm">
              Fashion
            </Button>
            <Button variant="secondary" size="sm">
              Home & Garden
            </Button>
            <Button variant="secondary" size="sm">
              Sports
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
