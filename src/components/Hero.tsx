import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, TrendingUp, Zap, Star } from "lucide-react";
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

  const categories = [
    { name: "Electronics", icon: Zap, gradient: "from-cyan-500 to-blue-500" },
    { name: "Fashion", icon: Sparkles, gradient: "from-pink-500 to-purple-500" },
    { name: "Home & Garden", icon: Star, gradient: "from-emerald-500 to-teal-500" },
    { name: "Sports", icon: TrendingUp, gradient: "from-orange-500 to-red-500" },
  ];

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* 🌌 Aurora Background - 北极光背景 */}
      <div className="absolute inset-0 bg-mesh-gradient"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'var(--gradient-aurora)',
        }}
      ></div>
      
      {/* 🌟 Floating Particles - 浮动粒子 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* 🎨 Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-dots-pattern opacity-[0.03]"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* ✨ Main Heading */}
          <div className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-gradient-primary">
                Discover Your Next Favorite Thing
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="text-gradient-aurora aurora-flow inline-block">
                Amazing Products
              </span>
              <br />
              <span className="text-foreground">
                Unbeatable Prices
              </span>
            </h1>
          </div>
          
          {/* 💬 Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            Shop the latest trends with{" "}
            <span className="text-gradient-primary font-semibold">premium quality</span>
            {" "}and{" "}
            <span className="text-gradient-primary font-semibold">lightning-fast delivery</span>
          </p>
          
          {/* 🔍 Search Bar - 玻璃态搜索框 */}
          <form 
            onSubmit={handleSearch} 
            className="animate-in fade-in scale-in duration-700 delay-200 mb-12"
          >
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500 group-hover:duration-200"></div>
                
                <div className="relative flex gap-3 glass-strong rounded-2xl p-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 transition-colors group-hover:text-primary" />
                    <Input
                      type="text"
                      placeholder="Search for anything magical..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 h-14 text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="px-8 h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 interactive-button text-base font-semibold shadow-lg"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
              
              {/* 🔥 Trending Searches */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">Trending:</span>
                {["Wireless Earbuds", "Smart Watch", "Gaming Chair", "LED Lights"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/search?q=${encodeURIComponent(term)}`);
                    }}
                    className="px-3 py-1 rounded-full bg-secondary/50 hover:bg-secondary transition-colors text-foreground/80 hover:text-foreground"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </form>
          
          {/* 🎯 Category Pills - 动态类别标签 */}
          <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => navigate(`/products?category=${category.name.toLowerCase()}`)}
                  className="group relative"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300`}></div>
                  <div className="relative flex items-center gap-2 px-6 py-3 glass rounded-xl hover:scale-105 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{category.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* 📊 Stats - 统计数据 */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-in fade-in scale-in duration-1000 delay-500">
            {[
              { label: "Products", value: "10K+" },
              { label: "Happy Customers", value: "50K+" },
              { label: "5-Star Reviews", value: "25K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 🌊 Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
    </section>
  );
};
