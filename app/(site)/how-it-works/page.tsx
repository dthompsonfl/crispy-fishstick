import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, MessageSquare, AlertTriangle } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      phase: "Phase 1: Discovery & Audit",
      duration: "Week 1",
      description: "We don't guess. We analyze your current situation, define the exact scope, and lock in the price.",
      tasks: ["Kickoff Call", "Technical Audit", "Scope Definition", "Contract Signing"]
    },
    {
      phase: "Phase 2: The Build",
      duration: "Weeks 2-5",
      description: "Heads-down engineering. You get a private link to see progress every Friday.",
      tasks: ["Design System Setup", "Core Development", "Content Integration", "Mobile Optimization"]
    },
    {
      phase: "Phase 3: Launch & Handoff",
      duration: "Week 6",
      description: "We deploy to production, transfer all accounts to you, and provide training.",
      tasks: ["Final QA", "DNS Switch", "Ownership Transfer", "Training Session"]
    }
  ];

  return (
    <div className="container py-12 md:py-24 space-y-16 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">How It Works</h1>
        <p className="text-xl text-muted-foreground">
          A predictable process for predictable results. No black boxes.
        </p>
      </div>

      <div className="relative border-l border-border md:ml-6 ml-4 space-y-12 pl-8 md:pl-12 py-4">
        {steps.map((step, i) => (
            <div key={i} className="relative">
                <div className="absolute -left-[43px] md:-left-[59px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-sm">
                    {i + 1}
                </div>
                <div className="bg-card/50 border rounded-xl p-6 md:p-8 card-precision">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <h3 className="text-2xl font-bold">{step.phase}</h3>
                        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full w-fit">
                            <Clock className="h-4 w-4" /> {step.duration}
                        </div>
                    </div>
                    <p className="text-muted-foreground mb-6">{step.description}</p>
                    <ul className="grid md:grid-cols-2 gap-3">
                        {step.tasks.map((task, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-signal-success" />
                                {task}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted/30 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" /> Communication Cadence
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• <strong>Weekly Updates:</strong> Every Friday via email with a Loom video.</li>
                  <li>• <strong>Slack/Discord:</strong> Optional shared channel for quick questions.</li>
                  <li>• <strong>No Meetings:</strong> We avoid unnecessary meetings to focus on code, but we are always available for scheduled syncs.</li>
              </ul>
          </div>

          <div className="bg-muted/30 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> What we need from you
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Timely feedback on demos (within 48h).</li>
                  <li>• All copy and creative assets before Phase 2 begins.</li>
                  <li>• Access to domain registrars and existing accounts.</li>
              </ul>
          </div>
      </div>

      <div className="text-center pt-8">
          <Button asChild size="lg" className="btn-precision rounded-full px-8">
              <Link href="/contact">Start the Conversation</Link>
          </Button>
      </div>
    </div>
  );
}
