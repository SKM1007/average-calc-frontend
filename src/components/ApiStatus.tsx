
import { useState, useEffect } from "react";
import { API_CONFIG } from "@/config/apiConfig";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const ApiStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [message, setMessage] = useState<string>('Checking API connection...');
  const [details, setDetails] = useState<string>('');

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        console.log('Checking API connection...');
        console.log(`Using access code: ${API_CONFIG.ACCESS_CODE}`);
        console.log(`Using roll number: ${API_CONFIG.REGISTRATION.ROLL_NUMBER}`);
        console.log(`Using email: ${API_CONFIG.REGISTRATION.EMAIL}`);
        
        // Try to connect to the random numbers endpoint
        const endpoint = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RANDOM}`;
        console.log(`Connecting to: ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_CONFIG.ACCESS_CODE}`,
            "X-Roll-Number": API_CONFIG.REGISTRATION.ROLL_NUMBER,
            "X-Email": API_CONFIG.REGISTRATION.EMAIL
          },
          mode: 'cors'
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('API response:', data);
          setStatus('connected');
          setMessage('Connected to test server');
          setDetails(`Successfully connected to ${endpoint}`);
          toast.success('Connected to test server successfully');
        } else {
          const errorText = await response.text();
          console.error(`API error (${response.status}): ${errorText}`);
          setStatus('error');
          setMessage(`Connection failed: ${response.status}`);
          setDetails(errorText || 'No additional error details available');
          toast.error(`Connection failed: ${response.status}`);
        }
      } catch (error) {
        console.error('API connection error:', error);
        setStatus('error');
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setMessage('Could not connect to test server');
        setDetails(errorMessage);
        toast.error(`API connection error: ${errorMessage}`);
      }
    };

    checkApiConnection();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mb-4 gap-2">
      <Badge 
        variant={status === 'connected' ? "outline" : "destructive"} 
        className={cn(
          "px-3 py-1 min-w-32 flex items-center justify-center gap-1",
          status === 'connected' ? "bg-green-100/10 hover:bg-green-100/20 text-green-600 dark:text-green-400" : "",
          status === 'checking' ? "bg-yellow-100/10 hover:bg-yellow-100/20 text-yellow-600 dark:text-yellow-400" : ""
        )}
      >
        {status === 'connected' ? (
          <CheckCircle2 className="h-3 w-3" />
        ) : status === 'checking' ? (
          <AlertCircle className="h-3 w-3" />
        ) : (
          <XCircle className="h-3 w-3" />
        )}
        <span className="text-xs">{message}</span>
      </Badge>
      
      {status === 'error' && details && (
        <div className="text-xs text-destructive max-w-96 text-center mt-1">
          <p>{details}</p>
          <p className="mt-1">Make sure your access code is correct and the test server is available.</p>
        </div>
      )}
    </div>
  );
};
