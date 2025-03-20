
import { useState } from "react";
import { NumberType } from "@/services/calculatorService";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalculatorIcon, Sigma, Dice5, Clock3 } from "lucide-react";

interface NumberTypeSelectorProps {
  onSelect: (type: NumberType) => void;
  isLoading: boolean;
}

export const NumberTypeSelector = ({ onSelect, isLoading }: NumberTypeSelectorProps) => {
  const [selected, setSelected] = useState<NumberType | null>(null);

  const handleSelect = (type: NumberType) => {
    setSelected(type);
    onSelect(type);
  };

  const types = [
    { id: 'p' as NumberType, label: 'Prime', icon: <CalculatorIcon className="h-4 w-4 mr-2" /> },
    { id: 'f' as NumberType, label: 'Fibonacci', icon: <Sigma className="h-4 w-4 mr-2" /> },
    { id: 'e' as NumberType, label: 'Even', icon: <Clock3 className="h-4 w-4 mr-2" /> },
    { id: 'r' as NumberType, label: 'Random', icon: <Dice5 className="h-4 w-4 mr-2" /> }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-lg font-medium mb-4">Select Number Type</h2>
        <p className="text-sm text-muted-foreground mb-6">Choose a number type to fetch from the test server</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
        {types.map((type) => (
          <Button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={cn(
              "flex items-center px-4 py-2 transition-all duration-300",
              "hover-lift focus-ring",
              selected === type.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
            disabled={isLoading}
          >
            {type.icon}
            {type.label}
            {selected === type.id && <ArrowRight className="h-4 w-4 ml-2 animate-pulse-soft" />}
          </Button>
        ))}
      </div>
    </div>
  );
};
