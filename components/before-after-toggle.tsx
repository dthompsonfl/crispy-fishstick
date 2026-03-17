"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Zap, AlertTriangle } from "lucide-react";

export function BeforeAfterToggle() {
  const [mode, setMode] = useState<"standard" | "vantus">("vantus");

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-center mb-8">
        <div className="bg-muted p-1 rounded-full flex relative">
          <motion.div
            layoutId="toggle-bg"
            className="absolute top-1 bottom-1 w-[140px] bg-background rounded-full shadow-sm"
            initial={false}
            animate={{
              left: mode === "standard" ? "4px" : "148px"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => setMode("standard")}
            className={cn(
              "relative z-10 w-[140px] px-6 py-2 text-sm font-medium rounded-full transition-colors",
              mode === "standard" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Standard Site
          </button>
          <button
            onClick={() => setMode("vantus")}
            className={cn(
              "relative z-10 w-[140px] px-6 py-2 text-sm font-medium rounded-full transition-colors",
              mode === "vantus" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Your Build
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Visualizer */}
        <Card className="p-6 h-[300px] relative overflow-hidden card-precision flex items-center justify-center bg-zinc-950">
           <AnimatePresence mode="wait">
             {mode === "standard" ? (
               <motion.div
                 key="standard"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="flex flex-col items-center gap-4"
               >
                 <div className="w-32 h-32 rounded-full border-4 border-red-500 flex items-center justify-center text-4xl font-bold text-red-500">
                   40
                 </div>
                 <div className="text-center">
                    <h3 className="text-lg font-semibold text-red-400 flex items-center justify-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Slow & Bloated
                    </h3>
                    <p className="text-sm text-zinc-400 mt-2">Generic Wordpress/Wix template</p>
                 </div>
               </motion.div>
             ) : (
                <motion.div
                 key="vantus"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="flex flex-col items-center gap-4"
               >
                 <div className="w-32 h-32 rounded-full border-4 border-[var(--signal-success)] flex items-center justify-center text-4xl font-bold text-[var(--signal-success)] shadow-[0_0_30px_rgba(var(--signal-success),0.3)]">
                   100
                 </div>
                 <div className="text-center">
                    <h3 className="text-lg font-semibold text-[var(--signal-success)] flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5" />
                        Instant & Optimized
                    </h3>
                    <p className="text-sm text-zinc-400 mt-2">Next.js 16 + Vantus Architecture</p>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </Card>

        {/* Metrics List */}
        <div className="space-y-4 flex flex-col justify-center">
             <div className="space-y-1">
                 <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Performance Metrics</h4>
                 <div className="h-px w-full bg-border" />
             </div>

             <div className="grid gap-4">
                <MetricRow
                    label="First Contentful Paint"
                    standard="2.4s"
                    vantus="0.2s"
                    mode={mode}
                />
                <MetricRow
                    label="Time to Interactive"
                    standard="4.8s"
                    vantus="0.5s"
                    mode={mode}
                />
                <MetricRow
                    label="Cumulative Layout Shift"
                    standard="0.45"
                    vantus="0.00"
                    mode={mode}
                />
                 <MetricRow
                    label="SEO Score"
                    standard="65/100"
                    vantus="100/100"
                    mode={mode}
                />
             </div>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, standard, vantus, mode }: { label: string, standard: string, vantus: string, mode: "standard" | "vantus" }) {
    const isVantus = mode === "vantus";
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-surface-50 border border-border/50">
            <span className="text-sm font-medium">{label}</span>
            <div className="flex items-center gap-3">
                <span className={cn(
                    "text-sm font-mono transition-colors duration-300",
                    isVantus ? "text-muted-foreground line-through opacity-50" : "text-red-500 font-bold"
                )}>
                    {standard}
                </span>
                <span className={cn(
                    "text-sm font-mono transition-colors duration-300",
                    isVantus ? "text-[var(--signal-success)] font-bold scale-110" : "text-muted-foreground opacity-50"
                )}>
                    {vantus}
                </span>
            </div>
        </div>
    )
}
