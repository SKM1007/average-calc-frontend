
import { useState, useEffect } from "react";
import { API_CONFIG } from "@/config/apiConfig";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const ApiStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [message, setMessage] = useState<string>('Checking API connection...');

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        // Try to connect to any of the endpoints
        const response = await fetch(`${API_CONFIG.BASE_URL}/rand`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_CONFIG.ACCESS_CODE}`
          }
        });
        
        if (response.ok) {
          setStatus('connected');
          setMessage('Connected to test server');
        } else {
          setStatus('error');
          setMessage(`Connection failed: ${response.status}`);
        }
      } catch (error) {
        setStatus('error');
        setMessage('Could not connect to test server');
      }
    };

    checkApiConnection();
  }, []);

  return (
    <div className="flex items-center justify-center mb-4">
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
        ) : (
          <AlertCircle className="h-3 w-3" />
        )}
        <span className="text-xs">{message}</span>
      </Badge>
    </div>
  );
};
