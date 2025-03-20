
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface WindowSizeSelectorProps {
  onChange: (size: number) => void;
  defaultValue?: number;
}

export const WindowSizeSelector = ({ onChange, defaultValue = 10 }: WindowSizeSelectorProps) => {
  const [customSize, setCustomSize] = useState<string>(defaultValue.toString());
  const [selectedSize, setSelectedSize] = useState<number>(defaultValue);

  const presetSizes = [5, 10, 15, 20];

  const handleSizeChange = (size: number) => {
    setSelectedSize(size);
    setCustomSize(size.toString());
    onChange(size);
  };

  const handleCustomSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSize(e.target.value);
  };

  const handleCustomSizeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const size = parseInt(customSize, 10);
    if (!isNaN(size) && size > 0) {
      setSelectedSize(size);
      onChange(size);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-4">
        <h2 className="text-lg font-medium">Configure Window Size</h2>
        <p className="text-sm text-muted-foreground">Set how many numbers to keep in the window</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {presetSizes.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            onClick={() => handleSizeChange(size)}
            className={cn(
              "min-w-20 hover-lift focus-ring",
              selectedSize === size ? "bg-primary" : ""
            )}
          >
            {selectedSize === size && <CheckIcon className="mr-1 h-4 w-4" />}
            {size}
          </Button>
        ))}
      </div>

      <form onSubmit={handleCustomSizeSubmit} className="flex flex-col sm:flex-row gap-2 justify-center items-center">
        <div className="space-y-1 w-full max-w-xs">
          <Label htmlFor="custom-size" className="text-sm">Custom Size</Label>
          <div className="flex">
            <Input
              id="custom-size"
              type="number"
              min="1"
              value={customSize}
              onChange={handleCustomSizeChange}
              className="focus-ring rounded-r-none"
              placeholder="Enter window size"
            />
            <Button
              type="submit"
              className="rounded-l-none"
            >
              Set
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
