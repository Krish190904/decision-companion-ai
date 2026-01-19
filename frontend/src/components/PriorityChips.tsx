import { 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Scale, 
  Heart 
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRIORITIES = [
  { id: 'money', label: 'Money', icon: DollarSign },
  { id: 'time', label: 'Time', icon: Clock },
  { id: 'risk', label: 'Risk', icon: AlertTriangle },
  { id: 'career', label: 'Career Growth', icon: TrendingUp },
  { id: 'balance', label: 'Work-Life Balance', icon: Scale },
  { id: 'health', label: 'Mental Health', icon: Heart },
] as const;

interface PriorityChipsProps {
  selected: string[];
  onChange: (priorities: string[]) => void;
}

export function PriorityChips({ selected, onChange }: PriorityChipsProps) {
  const togglePriority = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((p) => p !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {PRIORITIES.map((priority) => {
        const isSelected = selected.includes(priority.id);
        const Icon = priority.icon;
        
        return (
          <button
            key={priority.id}
            type="button"
            onClick={() => togglePriority(priority.id)}
            className={cn(
              "group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
              isSelected
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary/60 text-secondary-foreground hover:bg-secondary border border-border/50"
            )}
          >
            <Icon className={cn(
              "h-4 w-4 transition-transform duration-200",
              isSelected ? "scale-110" : "group-hover:scale-105"
            )} />
            <span>{priority.label}</span>
          </button>
        );
      })}
    </div>
  );
}
