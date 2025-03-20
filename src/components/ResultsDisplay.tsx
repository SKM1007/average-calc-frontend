
import { useEffect, useRef } from "react";
import { WindowState } from "@/services/calculatorService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ResultsDisplayProps {
  data: WindowState | null;
  isLoading: boolean;
}

export const ResultsDisplay = ({ data, isLoading }: ResultsDisplayProps) => {
  const resultRef = useRef<HTMLDivElement>(null);

  // Scroll into view when new data arrives
  useEffect(() => {
    if (data && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [data]);

  if (!data && !isLoading) {
    return (
      <div className="text-center p-6 animate-fade-in">
        <p className="text-muted-foreground">No data yet. Select a number type and window size to get started.</p>
      </div>
    );
  }

  const renderNumbersBadges = (numbers: number[]) => {
    return numbers.map((num, index) => (
      <Badge 
        key={`${num}-${index}`}
        className="m-1 py-1 px-3 text-sm bg-secondary text-secondary-foreground hover-lift"
      >
        {num}
      </Badge>
    ));
  };

  return (
    <div 
      className={cn(
        "transition-opacity duration-300",
        isLoading ? "opacity-60" : "opacity-100"
      )}
      ref={resultRef}
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-muted-foreground/20 border-t-primary animate-spin"></div>
          </div>
        </div>
      ) : data ? (
        <Card className="overflow-hidden shadow-lg border border-border/50 animate-slide-up bg-card">
          <CardHeader className="bg-secondary/50 pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>Results</span>
              <Badge variant="outline" className="text-sm font-normal">
                Avg: <span className="font-bold ml-1">{data.avg}</span>
              </Badge>
            </CardTitle>
            <CardDescription>
              Window size: {data.windowCurrState.length}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Previous State</h3>
                <div className="min-h-12 flex flex-wrap">
                  {data.windowPrevState.length > 0 ? (
                    renderNumbersBadges(data.windowPrevState)
                  ) : (
                    <span className="text-muted-foreground text-sm italic">Empty</span>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Current State</h3>
                <div className="min-h-12 flex flex-wrap">
                  {data.windowCurrState.length > 0 ? (
                    renderNumbersBadges(data.windowCurrState)
                  ) : (
                    <span className="text-muted-foreground text-sm italic">Empty</span>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Response Format</h3>
                </div>
                <div className="mt-2 bg-secondary/50 p-3 rounded-md overflow-x-auto">
                  <pre className="text-xs text-secondary-foreground font-mono">
{`{
  "windowPrevState": [${data.windowPrevState.join(', ')}],
  "windowCurrState": [${data.windowCurrState.join(', ')}],
  "numbers": [${data.numbers.join(', ')}],
  "avg": ${data.avg}
}`}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};
