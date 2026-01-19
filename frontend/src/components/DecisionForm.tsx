import { useState } from "react";
import { Plus, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OptionCard } from "./OptionCard";
import { PriorityChips } from "./PriorityChips";
import { RiskToleranceSelector } from "./RiskToleranceSelector";
import type { DecisionFormData, DecisionOption } from "@/types/decision";

interface DecisionFormProps {
  onSubmit: (data: DecisionFormData) => void;
}

const createOption = (): DecisionOption => ({
  id: crypto.randomUUID(),
  name: '',
  pros: '',
  cons: '',
});

export function DecisionForm({ onSubmit }: DecisionFormProps) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState<DecisionOption[]>([
    createOption(),
    createOption(),
  ]);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [riskTolerance, setRiskTolerance] = useState<'low' | 'medium' | 'high'>('medium');

  const addOption = () => {
    setOptions([...options, createOption()]);
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter((o) => o.id !== id));
    }
  };

  const updateOption = (id: string, field: keyof DecisionOption, value: string) => {
    setOptions(options.map((o) => (o.id === id ? { ...o, [field]: value } : o)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, options, priorities, riskTolerance });
  };

  const isValid = title.trim() && options.every((o) => o.name.trim());

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Decision Title Section */}
      <section className="animate-fade-in space-y-4">
        <div className="space-y-1">
          <Label htmlFor="decision-title" className="text-base font-semibold text-foreground">
            What decision are you facing?
          </Label>
          <p className="text-sm text-muted-foreground">
            Describe your decision in a clear, specific way
          </p>
        </div>
        <Input
          id="decision-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Should I switch jobs? Should I relocate for the new opportunity?"
          className="h-14 text-lg border-border/60 bg-background/50 transition-all focus:border-primary focus:bg-background focus:shadow-soft"
        />
      </section>

      {/* Options Section */}
      <section className="space-y-6" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-foreground">
              Your Options
            </h2>
            <p className="text-sm text-muted-foreground">
              Add the choices you're considering with their pros and cons
            </p>
          </div>
          <Button
            type="button"
            variant="soft"
            size="sm"
            onClick={addOption}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Option
          </Button>
        </div>
        
        <div className="space-y-6">
          {options.map((option, index) => (
            <OptionCard
              key={option.id}
              option={option}
              index={index}
              canDelete={options.length > 2}
              onUpdate={updateOption}
              onDelete={removeOption}
            />
          ))}
        </div>
      </section>

      {/* Priority Factors Section */}
      <section className="animate-fade-in space-y-4" style={{ animationDelay: '200ms' }}>
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-foreground">
            Priority Factors
          </h2>
          <p className="text-sm text-muted-foreground">
            Select the factors that matter most to you (optional)
          </p>
        </div>
        <PriorityChips selected={priorities} onChange={setPriorities} />
      </section>

      {/* Risk Tolerance Section */}
      <section className="animate-fade-in space-y-4" style={{ animationDelay: '300ms' }}>
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-foreground">
            Risk Tolerance
          </h2>
          <p className="text-sm text-muted-foreground">
            How comfortable are you with uncertainty and potential downsides?
          </p>
        </div>
        <RiskToleranceSelector value={riskTolerance} onChange={setRiskTolerance} />
      </section>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button
          type="submit"
          variant="hero"
          size="xl"
          disabled={!isValid}
          className="min-w-[280px] gap-3"
        >
          <Sparkles className="h-5 w-5" />
          Analyze Decision
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
