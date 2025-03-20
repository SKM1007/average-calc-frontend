
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export const Header = () => {
  return (
    <header className={cn(
      "w-full py-6 flex flex-col sm:flex-row items-center justify-between animate-fade-in",
      "border-b border-border/50"
    )}>
      <div className="flex items-center mb-4 sm:mb-0">
        <Link to="/" className="text-xl md:text-2xl font-semibold tracking-tight hover:opacity-80 transition-opacity">
          Average Calculator
        </Link>
        <span className="ml-2 px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-md">
          Microservice
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/api-info">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            <span>API Info</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};
