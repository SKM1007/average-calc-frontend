
import { toast } from "sonner";

export interface WindowState {
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
}

export type NumberType = 'p' | 'f' | 'e' | 'r';

class CalculatorService {
  private baseUrl = "http://20.244.56.144/test";
  private storageKey = "calculator_window_state";
  private localEndpoint = "http://localhost:9876";

  // Fetch numbers from the test server
  async fetchNumbers(type: NumberType): Promise<number[]> {
    try {
      let endpoint = "";
      
      switch (type) {
        case 'p': // Prime
          endpoint = `${this.baseUrl}/primes`;
          break;
        case 'f': // Fibonacci
          endpoint = `${this.baseUrl}/fibo`;
          break;
        case 'e': // Even
          endpoint = `${this.baseUrl}/even`;
          break;
        case 'r': // Random
          endpoint = `${this.baseUrl}/rand`;
          break;
      }
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      return data.numbers || [];
      
    } catch (error) {
      console.error("Error fetching numbers:", error);
      toast.error("Failed to fetch numbers from the server");
      return [];
    }
  }

  // Process the data according to window size
  async processData(windowSize: number, type: NumberType): Promise<WindowState | null> {
    try {
      // Fetch new numbers
      let newNumbers = await this.fetchNumbers(type);
      
      // Get existing state
      const currentState = this.getStoredState();
      
      // Filter out duplicates
      newNumbers = newNumbers.filter(num => !currentState.numbers.includes(num));
      
      // Add new unique numbers to the existing collection
      let updatedNumbers = [...currentState.numbers, ...newNumbers];
      
      // Limit to window size
      if (updatedNumbers.length > windowSize) {
        updatedNumbers = updatedNumbers.slice(updatedNumbers.length - windowSize);
      }
      
      // Calculate average
      const avg = updatedNumbers.length > 0 
        ? parseFloat((updatedNumbers.reduce((sum, num) => sum + num, 0) / updatedNumbers.length).toFixed(2))
        : 0;
      
      // Create new state
      const windowState: WindowState = {
        windowPrevState: currentState.windowCurrState,
        windowCurrState: updatedNumbers,
        numbers: updatedNumbers,
        avg: avg
      };
      
      // Save to localStorage
      this.saveState(windowState);
      
      return windowState;
      
    } catch (error) {
      console.error("Error processing data:", error);
      toast.error("Error processing data");
      return null;
    }
  }

  // Get current state from localStorage
  getStoredState(): WindowState {
    const defaultState: WindowState = {
      windowPrevState: [],
      windowCurrState: [],
      numbers: [],
      avg: 0
    };
    
    try {
      const storedData = localStorage.getItem(this.storageKey);
      return storedData ? JSON.parse(storedData) : defaultState;
    } catch {
      return defaultState;
    }
  }

  // Save state to localStorage
  saveState(state: WindowState): void {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  // Reset the state
  resetState(): void {
    localStorage.removeItem(this.storageKey);
    toast.success("Window state has been reset");
  }

  // Simulate making a request to the local microservice
  async simulateLocalRequest(type: string): Promise<WindowState | null> {
    try {
      const currentState = this.getStoredState();
      const endpoint = `${this.localEndpoint}/numbers/${type}`;
      
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        toast.error(`Request to ${endpoint} failed`);
        return null;
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error("Local request simulation error:", error);
      toast.error("Local service seems to be offline");
      return null;
    }
  }
}

export const calculatorService = new CalculatorService();
