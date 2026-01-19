import { Brain, Lightbulb, Scale, Target } from "lucide-react";

const loadingSteps = [
  { icon: Brain, text: "Analyzing your options..." },
  { icon: Scale, text: "Weighing pros and cons..." },
  { icon: Target, text: "Evaluating risk factors..." },
  { icon: Lightbulb, text: "Generating recommendation..." },
];

export function LoadingState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-12 py-16">
      {/* Main Loader Animation */}
      <div className="relative">
        {/* Outer ring */}
        <div className="h-32 w-32 animate-spin rounded-full border-4 border-muted" style={{ animationDuration: '3s' }}>
          <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-glow" />
        </div>
        
        {/* Inner pulsing brain */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 animate-pulse-slow items-center justify-center rounded-full bg-primary/10">
            <Brain className="h-10 w-10 text-primary" />
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="space-y-4 text-center">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Analyzing trade-offs and potential risks...
        </h2>
        <p className="text-muted-foreground">
          Our AI is carefully evaluating your decision
        </p>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {loadingSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.text}
              className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 shadow-soft animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Icon className="h-5 w-5 text-secondary-foreground" />
              </div>
              <p className="text-center text-xs text-muted-foreground">
                {step.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
