
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { API_CONFIG } from "@/config/apiConfig";

const ApiInfo = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="container mx-auto px-4 py-6 max-w-5xl flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-4xl mx-auto my-8 space-y-8">
          <Card className="overflow-hidden shadow-lg border border-border/50">
            <CardHeader className="bg-secondary/50 pb-4">
              <CardTitle>API Integration Information</CardTitle>
              <CardDescription>
                How the application communicates with the test server
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Access Code</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The application is configured with access code: <code className="bg-secondary/50 px-2 py-1 rounded">{API_CONFIG.ACCESS_CODE}</code>
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Available Endpoints</h3>
                <div className="space-y-4">
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium">Prime Numbers API</h4>
                    <p className="text-sm text-muted-foreground">
                      Endpoint: <code>{API_CONFIG.BASE_URL}/primes</code>
                    </p>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium">Fibonacci Numbers API</h4>
                    <p className="text-sm text-muted-foreground">
                      Endpoint: <code>{API_CONFIG.BASE_URL}/fibo</code>
                    </p>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium">Even Numbers API</h4>
                    <p className="text-sm text-muted-foreground">
                      Endpoint: <code>{API_CONFIG.BASE_URL}/even</code>
                    </p>
                  </div>
                  
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium">Random Numbers API</h4>
                    <p className="text-sm text-muted-foreground">
                      Endpoint: <code>{API_CONFIG.BASE_URL}/rand</code>
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Response Format</h3>
                <div className="bg-secondary/50 p-4 rounded-md overflow-x-auto">
                  <pre className="text-xs text-secondary-foreground">
{`{
  "numbers": [2, 3, 5, 7, 11, ...]
}`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  The access code is sent in the Authorization header with each request:
                </p>
                <div className="bg-secondary/50 p-4 rounded-md overflow-x-auto mt-2">
                  <pre className="text-xs text-secondary-foreground">
{`{
  "Content-Type": "application/json",
  "Authorization": "Bearer ${API_CONFIG.ACCESS_CODE}"
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default ApiInfo;
