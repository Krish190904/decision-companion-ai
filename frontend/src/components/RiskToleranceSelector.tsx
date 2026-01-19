import { Shield, ShieldAlert, ShieldOff } from "lucide-react";
import { cn } from "@/lib/utils";

type RiskLevel = 'low' | 'medium' | 'high';

const RISK_OPTIONS: { id: RiskLevel; label: string; description: string; icon: typeof Shield }[] = [
  { 
    id: 'low', 
    label: 'Low', 
    description: 'Prefer safe, predictable outcomes',
    icon: Shield 
  },
  { 
    id: 'medium', 
    label: 'Medium', 
    description: 'Balanced approach to risk',
    icon: ShieldAlert 
  },
  { 
    id: 'high', 
    label: 'High', 
    description: 'Open to significant risks for bigger rewards',
    icon: ShieldOff 
  },
];

interface RiskToleranceSelectorProps {
  value: RiskLevel;
  onChange: (value: RiskLevel) => void;
}

export function RiskToleranceSelector({ value, onChange }: RiskToleranceSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {RISK_OPTIONS.map((option) => {
        const isSelected = value === option.id;
        const Icon = option.icon;
        
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "group relative flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-center transition-all duration-200",
              isSelected
                ? "border-primary bg-primary/5 shadow-soft"
                : "border-border bg-card hover:border-primary/40 hover:bg-accent/50"
            )}
          >
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200",
              isSelected
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground group-hover:bg-primary/20"
            )}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className={cn(
                "font-semibold transition-colors",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {option.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {option.description}
              </p>
            </div>
            
            {/* Selected indicator */}
            {isSelected && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
