import { useState } from "react";
import { Brain, Compass } from "lucide-react";
import { DecisionForm } from "@/components/DecisionForm";
import { LoadingState } from "@/components/LoadingState";
import { ResultView } from "@/components/ResultView";
import type { AppState, DecisionFormData, DecisionResult } from "@/types/decision";

// Placeholder for API call - replace with actual AI integration
async function analyzeDecision(data: DecisionFormData): Promise<DecisionResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  // This is placeholder logic - replace with actual API call
  const recommendedOption = data.options[0];
  const alternativeOption = data.options.length > 1 ? data.options[1] : undefined;
  
  return {
    recommendedOption: recommendedOption.name || "Option 1",
    confidenceScore: 78,
    reasoning: `Based on your priorities (${data.priorities.join(', ') || 'general considerations'}) and ${data.riskTolerance} risk tolerance, this option offers the best balance of benefits while minimizing potential downsides. The pros you listed outweigh the cons when weighted against your stated priorities.`,
    risks: [
      "Initial adjustment period may cause temporary stress",
      "Some unknown factors couldn't be fully evaluated",
      "Market conditions could change affecting long-term outcomes",
    ],
    alternativeOption: alternativeOption?.name,
    alternativeReasoning: alternativeOption 
      ? "This option provides a solid backup with different trade-offs. Consider it if your priorities shift or if new information emerges."
      : undefined,
  };
}

export default function Index() {
  const [appState, setAppState] = useState<AppState>('form');
  const [formData, setFormData] = useState<DecisionFormData | null>(null);
  const [result, setResult] = useState<DecisionResult | null>(null);

  const handleSubmit = async (data: DecisionFormData) => {
    setFormData(data);
    setAppState('loading');
    
    try {
      const analysisResult = await analyzeDecision(data);
      setResult(analysisResult);
      setAppState('result');
    } catch (error) {
      console.error('Analysis failed:', error);
      setAppState('form');
    }
  };

  const handleReset = () => {
    setAppState('form');
    setFormData(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground sm:text-xl">
                Decision Companion AI
              </h1>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Structured reasoning for confident choices
              </p>
            </div>
          </div>
          <div className="flex h-9 items-center gap-2 rounded-full bg-secondary/60 px-4 text-sm text-secondary-foreground">
            <Compass className="h-4 w-4" />
            <span className="hidden sm:inline">Clear thinking starts here</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-3xl">
          {/* Hero Section - Only show on form state */}
          {appState === 'form' && (
            <div className="mb-10 text-center animate-fade-in">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Make confident decisions with{' '}
                <span className="text-primary">structured AI reasoning</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Weigh your options, define your priorities, and get a clear recommendation 
                backed by thoughtful analysis.
              </p>
            </div>
          )}

          {/* Content Area */}
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card sm:p-10">
            {appState === 'form' && (
              <DecisionForm onSubmit={handleSubmit} />
            )}
            
            {appState === 'loading' && (
              <LoadingState />
            )}
            
            {appState === 'result' && result && formData && (
              <ResultView 
                result={result} 
                formData={formData} 
                onReset={handleReset} 
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Decision Companion AI helps you think clearly. 
            Final decisions are always yours to make.
          </p>
        </div>
      </footer>
    </div>
  );
}
