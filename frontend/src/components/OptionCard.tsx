import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { DecisionOption } from "@/types/decision";

interface OptionCardProps {
  option: DecisionOption;
  index: number;
  canDelete: boolean;
  onUpdate: (id: string, field: keyof DecisionOption, value: string) => void;
  onDelete: (id: string) => void;
}

export function OptionCard({ option, index, canDelete, onUpdate, onDelete }: OptionCardProps) {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-card animate-fade-in">
      {/* Option Number Badge */}
      <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-soft">
        {index + 1}
      </div>

      {/* Delete Button */}
      {canDelete && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(option.id)}
          className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-card opacity-0 shadow-soft transition-opacity group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}

      <div className="space-y-5">
        {/* Option Name */}
        <div className="space-y-2">
          <Label htmlFor={`option-${option.id}`} className="text-sm font-medium text-muted-foreground">
            Option Name
          </Label>
          <Input
            id={`option-${option.id}`}
            value={option.name}
            onChange={(e) => onUpdate(option.id, 'name', e.target.value)}
            placeholder={`e.g., "Stay at current job" or "Accept new offer"`}
            className="border-border/60 bg-background/50 transition-colors focus:border-primary focus:bg-background"
          />
        </div>

        {/* Pros & Cons Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Pros */}
          <div className="space-y-2">
            <Label htmlFor={`pros-${option.id}`} className="flex items-center gap-2 text-sm font-medium">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20 text-success">
                <Plus className="h-3 w-3" />
              </span>
              <span className="text-success">Pros</span>
            </Label>
            <Textarea
              id={`pros-${option.id}`}
              value={option.pros}
              onChange={(e) => onUpdate(option.id, 'pros', e.target.value)}
              placeholder="List the advantages (one per line)&#10;• Better salary&#10;• Career growth&#10;• New challenges"
              className="min-h-[120px] resize-none border-border/60 bg-background/50 transition-colors focus:border-success focus:bg-background"
            />
          </div>

          {/* Cons */}
          <div className="space-y-2">
            <Label htmlFor={`cons-${option.id}`} className="flex items-center gap-2 text-sm font-medium">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                <Minus className="h-3 w-3" />
              </span>
              <span className="text-destructive">Cons</span>
            </Label>
            <Textarea
              id={`cons-${option.id}`}
              value={option.cons}
              onChange={(e) => onUpdate(option.id, 'cons', e.target.value)}
              placeholder="List the disadvantages (one per line)&#10;• Unknown culture&#10;• Longer commute&#10;• Less job security"
              className="min-h-[120px] resize-none border-border/60 bg-background/50 transition-colors focus:border-destructive focus:bg-background"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
