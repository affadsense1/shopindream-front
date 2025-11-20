import { useEffect, useState } from "react";
import { Eye, Package, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UrgencyIndicatorsProps {
  stockTotal: number;
}

export const UrgencyIndicators = ({ stockTotal }: UrgencyIndicatorsProps) => {
  const [viewingCount, setViewingCount] = useState(0);
  const [stockCount, setStockCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Dynamic viewing count (8-25 people)
    const baseViewing = Math.floor(Math.random() * 18) + 8;
    setViewingCount(baseViewing);

    // Fluctuate viewing count every 5-15 seconds
    const viewingInterval = setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1;
      setViewingCount(prev => Math.max(5, Math.min(30, prev + change)));
    }, Math.random() * 10000 + 5000);

    // Dynamic stock (show slightly less than actual)
    const displayStock = Math.max(1, Math.floor(stockTotal * 0.3) + Math.floor(Math.random() * 20));
    setStockCount(displayStock);

    // Random expiry time (2-3 days from now)
    const hoursToExpiry = (Math.random() * 24) + 48; // 48-72 hours
    const expiryTime = new Date(Date.now() + hoursToExpiry * 60 * 60 * 1000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const difference = expiryTime.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => {
      clearInterval(viewingInterval);
      clearInterval(countdownInterval);
    };
  }, [stockTotal]);

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Viewing Count */}
      <div className="flex items-center gap-2 text-sm">
        <div className="relative">
          <Eye className="w-4 h-4 text-primary animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-ping" />
        </div>
        <span className="text-muted-foreground">
          <span className="font-semibold text-foreground">{viewingCount} people</span> are viewing this right now
        </span>
      </div>

      {/* Stock Availability */}
      <div className="flex items-center gap-2 text-sm">
        <Package className={`w-4 h-4 ${stockCount < 10 ? 'text-destructive' : 'text-accent'}`} />
        <div>
          <span className="text-muted-foreground">Availability: </span>
          <Badge 
            variant={stockCount < 10 ? "destructive" : "secondary"}
            className="ml-1 font-semibold"
          >
            {stockCount} in stock
          </Badge>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-accent animate-pulse" />
          <span className="text-sm font-semibold text-foreground">Limited Time Offer</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Sale ends in:</span>
          <div className="flex gap-1">
            <div className="bg-accent text-accent-foreground rounded px-2 py-1 text-sm font-bold min-w-[2.5rem] text-center">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span className="text-muted-foreground">:</span>
            <div className="bg-accent text-accent-foreground rounded px-2 py-1 text-sm font-bold min-w-[2.5rem] text-center">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span className="text-muted-foreground">:</span>
            <div className="bg-accent text-accent-foreground rounded px-2 py-1 text-sm font-bold min-w-[2.5rem] text-center">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
