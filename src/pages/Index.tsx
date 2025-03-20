
import { useState, useEffect } from "react";
import { calculatorService, WindowState, NumberType } from "@/services/calculatorService";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NumberTypeSelector } from "@/components/NumberTypeSelector";
import { WindowSizeSelector } from "@/components/WindowSizeSelector";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { ApiStatus } from "@/components/ApiStatus";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RefreshCw, RotateCcw, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [windowSize, setWindowSize] = useState<number>(10);
  const [selectedType, setSelectedType] = useState<NumberType | null>(null);
  const [results, setResults] = useState<WindowState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial state on component mount
  useEffect(() => {
    const storedState = calculatorService.getStoredState();
    if (storedState.numbers.length > 0) {
      setResults(storedState);
    }
  }, []);

  const handleFetchNumbers = async () => {
    if (!selectedType) {
      toast.warning("Please select a number type first");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`Fetching ${selectedType} numbers with window size ${windowSize}`);
      const data = await calculatorService.processData(windowSize, selectedType);
      
      if (data) {
        setResults(data);
        toast.success(`Successfully fetched ${getNumberTypeName(selectedType)} numbers`);
        console.log("Fetched data:", data);
      } else {
        setError("No data received from the server");
        toast.error("No data received from the server");
      }
    } catch (error) {
      console.error("Error fetching numbers:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      toast.error(`Failed to fetch numbers: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getNumberTypeName = (type: NumberType): string => {
    switch (type) {
      case 'p': return 'prime';
      case 'f': return 'fibonacci';
      case 'e': return 'even';
      case 'r': return 'random';
      default: return '';
    }
  };

  const handleReset = () => {
    calculatorService.resetState();
    setResults(null);
    setSelectedType(null);
    setError(null);
    toast.success("Calculator state has been reset");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 max-w-5xl flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-4xl mx-auto my-8 space-y-12">
          <ApiStatus />
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass-effect p-6 rounded-xl">
                <NumberTypeSelector 
                  onSelect={setSelectedType} 
                  isLoading={isLoading} 
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="glass-effect p-6 rounded-xl">
                <WindowSizeSelector 
                  onChange={setWindowSize}
                  defaultValue={windowSize}
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 my-8">
            <Button
              onClick={handleFetchNumbers}
              disabled={!selectedType || isLoading}
              className="px-6 hover-lift focus-ring"
              size="lg"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Fetch Numbers
                </>
              )}
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="hover-lift focus-ring"
              size="lg"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
          
          <Separator className="my-8" />
          
          <ResultsDisplay data={results} isLoading={isLoading} />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
