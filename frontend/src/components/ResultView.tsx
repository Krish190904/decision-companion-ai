import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw,
  Trophy,
  Target,
  Lightbulb,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { DecisionResult, DecisionFormData } from "@/types/decision";

interface ResultViewProps {
  result: DecisionResult;
  formData: DecisionFormData;
  onReset: () => void;
}

export function ResultView({ result, formData, onReset }: ResultViewProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center animate-fade-in">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 shadow-soft">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Analysis Complete
        </h2>
        <p className="mt-2 text-muted-foreground">
          For: <span className="font-medium text-foreground">{formData.title}</span>
        </p>
      </div>

      {/* Main Recommendation Card */}
      <div className="animate-slide-up rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-success/5 p-8 shadow-card">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary shadow-soft">
            <Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                Recommended Option
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                {result.recommendedOption}
              </h3>
            </div>
            
            {/* Confidence Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confidence Score</span>
                <span className="font-semibold text-primary">{result.confidenceScore}%</span>
              </div>
              <Progress value={result.confidenceScore} className="h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Reasoning Section */}
      <div className="animate-fade-in rounded-xl border border-border bg-card p-6 shadow-soft" style={{ animationDelay: '100ms' }}>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
            <Lightbulb className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Why This Option?</h4>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {result.reasoning}
            </p>
          </div>
        </div>
      </div>

      {/* Risks Section */}
      {result.risks.length > 0 && (
        <div className="animate-fade-in rounded-xl border border-destructive/30 bg-destructive/5 p-6" style={{ animationDelay: '200ms' }}>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Risks to Consider</h4>
              <ul className="mt-3 space-y-2">
                {result.risks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-destructive/60" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Alternative Option */}
      {result.alternativeOption && (
        <div className="animate-fade-in rounded-xl border border-border bg-card p-6 shadow-soft" style={{ animationDelay: '300ms' }}>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
              <Target className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Alternative to Consider</p>
              <h4 className="mt-1 font-semibold text-foreground">{result.alternativeOption}</h4>
              {result.alternativeReasoning && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {result.alternativeReasoning}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4 pt-6">
        <Button
          onClick={onReset}
          variant="hero"
          size="lg"
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Analyze Another Decision
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Remember: This AI analysis is a tool to help you think, not a replacement for your judgment.
        </p>
      </div>
    </div>
  );
}
