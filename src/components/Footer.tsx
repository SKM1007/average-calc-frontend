
import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <footer className={cn(
      "w-full py-6 md:py-8 flex flex-col items-center justify-center animate-fade-in",
      "border-t border-border/50"
    )}>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Designed with precision and simplicity.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          &copy; {new Date().getFullYear()} Average Calculator Microservice
        </p>
      </div>
    </footer>
  );
};
