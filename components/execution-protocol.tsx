"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FileText, Hash, FileJson, Clock, Layers, Users } from "lucide-react";

export type Artifact = {
  kind: "DOC" | "LOG" | "HASH";
  label: string;
  filename?: string;
  sha?: string;
  note?: string;
};

export type Command = {
  cmd: string;
  result: string;
};

export type StepMeta = {
  duration: string;
  artifacts: number;
  clientInput: "LOW" | "MED" | "HIGH";
};

export type ProtocolStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  commands: Command[];
  artifacts: Artifact[];
  meta: StepMeta;
};

interface ExecutionProtocolProps {
  steps: ProtocolStep[];
}

export function ExecutionProtocol({ steps }: ExecutionProtocolProps) {
  const [activeStepId, setActiveStepId] = React.useState<string | null>(null);
  const [inspectedStepId, setInspectedStepId] = React.useState<string | null>(null);
  const observerRefs = React.useRef<{ [key: string]: IntersectionObserverEntry | null }>({});
  const stepRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-step-id");
          if (id) {
            observerRefs.current[id] = entry;
          }
        });

        // Find the visible step closest to the top
        let visibleStepId: string | null = null;

        // Sort entries by top position to handle sequential logic
        const sortedIds = Object.keys(observerRefs.current).sort((a, b) => {
           const elA = stepRefs.current[a];
           const elB = stepRefs.current[b];
           if (!elA || !elB) return 0;
           return elA.getBoundingClientRect().top - elB.getBoundingClientRect().top;
        });

        // Simple logic: first intersecting element with enough visibility becomes active
        for (const id of sortedIds) {
          const entry = observerRefs.current[id];
          if (entry && entry.isIntersecting && entry.intersectionRatio > 0.2) {
             visibleStepId = id;
             break;
          }
        }

        if (visibleStepId) {
            setActiveStepId(visibleStepId);
        }
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: [0, 0.2, 0.5, 0.8, 1],
      }
    );

    Object.values(stepRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [steps]);


  // Determine visual state for each step based on activeStepId
  const getStepState = (stepId: string, index: number) => {
    if (!activeStepId) return index === 0 ? "active" : "future";

    const activeIndex = steps.findIndex(s => s.id === activeStepId);
    if (index < activeIndex) return "completed";
    if (index === activeIndex) return "active";
    return "future";
  };

  return (
    <div className="relative max-w-5xl mx-auto pl-4 md:pl-0">
      <div className="space-y-12 md:space-y-24">
        {steps.map((step, index) => {
          const state = getStepState(step.id, index);
          const isInspected = inspectedStepId === step.id;

          return (
            <div
              key={step.id}
              ref={(el) => { stepRefs.current[step.id] = el; }}
              data-step-id={step.id}
              className={cn(
                "relative grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-10 transition-opacity duration-500",
                state === "future" ? "opacity-50" : "opacity-100"
              )}
            >
              {/* Rail & Status */}
              <div className="hidden md:flex flex-col items-center pt-2 relative">
                <div className={cn(
                    "w-4 h-4 rounded-full border-2 transition-all duration-500 z-10",
                    state === "completed" ? "bg-signal-success/20 border-signal-success" :
                    state === "active" ? "bg-signal-success border-signal-success shadow-[0_0_15px_var(--signal-success)]" :
                    "bg-transparent border-muted-foreground/30"
                )} />
                {index !== steps.length - 1 && (
                    <div className={cn(
                        "w-px flex-1 my-2 transition-colors duration-500",
                         state === "completed" ? "bg-signal-success/50" : "bg-border"
                    )} />
                )}
              </div>

              {/* Mobile Rail Indicator */}
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-border -ml-4">
                 <div className={cn(
                    "absolute top-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 transition-colors duration-300",
                    state === "active" || state === "completed" ? "bg-signal-success border-signal-success" : "bg-background border-muted-foreground"
                 )} />
              </div>

              {/* Content Card */}
              <div
                 className="group outline-none"
                 role="button"
                 tabIndex={0}
                 onMouseEnter={() => setInspectedStepId(step.id)}
                 onMouseLeave={() => setInspectedStepId(null)}
                 onFocus={() => setInspectedStepId(step.id)}
                 onBlur={() => setInspectedStepId(null)}
                 onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setInspectedStepId(inspectedStepId === step.id ? null : step.id);
                    }
                 }}
              >
                 <div className={cn(
                    "glass-card surface-rim rounded-lg p-6 md:p-8 relative overflow-hidden transition-all duration-300",
                    isInspected ? "ring-1 ring-signal-success/50" : "group-focus:ring-1 group-focus:ring-signal-success/30"
                 )}>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                       <div>
                          <div className="font-mono text-xs text-signal-success/80 mb-2 tracking-wider">
                            PHASE_{step.number} :: {state === "completed" ? "COMPLETE" : state === "active" ? "EXECUTING..." : "PENDING"}
                          </div>
                          <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
                          <p className="text-muted-foreground mt-2 max-w-2xl text-pretty">
                             {step.description}
                          </p>
                       </div>

                       {/* Artifact Pill */}
                        <div className="flex flex-wrap gap-2">
                           {step.artifacts.map((art, i) => (
                              <div key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/5 text-xs font-mono text-secondary-foreground whitespace-nowrap">
                                 {art.kind === "DOC" && <FileText className="w-3.5 h-3.5 opacity-70" />}
                                 {art.kind === "LOG" && <FileJson className="w-3.5 h-3.5 opacity-70" />}
                                 {art.kind === "HASH" && <Hash className="w-3.5 h-3.5 opacity-70" />}
                                 <span className="font-medium">{art.label}</span>
                                 {art.sha && <span className="hidden xl:inline text-[10px] opacity-50 ml-1">{art.sha.substring(0, 8)}...</span>}
                              </div>
                           ))}
                        </div>
                    </div>

                    {/* Console/Terminal Output */}
                    <div className="bg-[rgba(var(--foreground-rgb),0.9)] rounded-md p-4 font-mono text-xs md:text-sm text-signal-success border border-border/5 shadow-inner">
                       <ul className="space-y-2">
                          {step.commands.map((cmd, i) => (
                             <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-1">
                                <span className="opacity-90">
                                   <span className="text-signal-success mr-2">{">"}</span>
                                   {cmd.cmd}
                                </span>
                                <span className={cn(
                                   "text-[10px] uppercase tracking-wider opacity-60 ml-4 sm:ml-0 text-right",
                                   cmd.result === "OK" || cmd.result === "VERIFIED" ? "text-signal-success" : "text-signal-warning"
                                )}>
                                   [{cmd.result}]
                                </span>
                             </li>
                          ))}
                       </ul>
                    </div>

                    {/* Inspection Mode Button (Mobile/Keyboard) */}
                    <button
                        onClick={() => setInspectedStepId(isInspected ? null : step.id)}
                        className="md:hidden mt-4 w-full flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground py-2 border border-dashed border-border rounded opacity-70"
                        aria-expanded={isInspected}
                        aria-controls={`meta-${step.id}`}
                    >
                        {isInspected ? "Close Metadata" : "Inspect Metadata"}
                    </button>

                    {/* Metadata Panel (Inspection Mode) */}
                    <div
                        id={`meta-${step.id}`}
                        className={cn(
                           "grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-dashed border-border/10 transition-all duration-500 overflow-hidden",
                           isInspected ? "opacity-100 max-h-40" : "opacity-0 max-h-0 pt-0 border-t-0 mt-0 md:opacity-0 md:max-h-0 md:group-hover:opacity-100 md:group-hover:max-h-40 md:group-hover:pt-6 md:group-hover:border-t md:group-hover:mt-6"
                        )}
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Duration
                            </span>
                            <span className="font-mono text-sm">{step.meta.duration}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                                <Layers className="w-3 h-3" /> Artifacts
                            </span>
                            <span className="font-mono text-sm">{step.meta.artifacts} Items</span>
                        </div>
                         <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                                <Users className="w-3 h-3" /> Input
                            </span>
                            <span className="font-mono text-sm">{step.meta.clientInput} Touch</span>
                        </div>
                    </div>

                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
