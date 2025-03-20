
import { CalculatorIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  return (
    <header className="w-full px-6 py-8 md:py-12 flex flex-col items-center text-center animate-slide-down">
      <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-primary/10">
        <CalculatorIcon className="h-8 w-8 text-primary" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
        Average Calculator
      </h1>
      
      <div className="flex items-center justify-center mb-3 space-x-2">
        <Badge className="bg-secondary text-secondary-foreground" variant="secondary">
          Microservice
        </Badge>
        <Badge variant="outline">REST API</Badge>
      </div>
      
      <p className="text-muted-foreground max-w-[42rem] md:leading-relaxed">
        A minimalist calculator microservice that processes a window of numbers from various sources and calculates their average.
      </p>
    </header>
  );
};
