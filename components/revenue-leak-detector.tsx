"use client";

import { useState, useMemo } from "react";
import { calculateLeak } from "@/lib/revenue-leak/model";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function RevenueLeakDetector() {
  const [revenue, setRevenue] = useState(50000);
  const [conversion, setConversion] = useState(2.0);
  const [responseTime, setResponseTime] = useState(30);

  const result = useMemo(() => {
    return calculateLeak(revenue, conversion, responseTime);
  }, [revenue, conversion, responseTime]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

      {/* Left Panel: Inputs */}
      <div className="flex-1 p-8 bg-secondary/10 border-r border-border/50">
         <div className="mb-8">
            <h2 className="text-xl font-bold font-mono uppercase tracking-tight flex items-center gap-2">
               <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
               Diagnostics Input
            </h2>
            <p className="text-sm text-muted-foreground mt-2">Adjust parameters to model system efficiency.</p>
         </div>

         <div className="space-y-8">
            {/* Revenue Input */}
            <div className="space-y-4">
               <div className="flex justify-between text-sm font-medium">
                  <label htmlFor="revenue-input">Monthly Revenue</label>
                  <span className="font-mono text-primary">${revenue.toLocaleString()}</span>
               </div>
               <input
                  id="revenue-input"
                  type="range"
                  min="10000" max="1000000" step="5000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
               />
            </div>

             {/* Conversion Input */}
             <div className="space-y-4">
               <div className="flex justify-between text-sm font-medium">
                  <label htmlFor="conversion-input">Conversion Rate</label>
                  <span className="font-mono text-primary">{conversion.toFixed(1)}%</span>
               </div>
               <input
                  id="conversion-input"
                  type="range"
                  min="0.1" max="10.0" step="0.1"
                  value={conversion}
                  onChange={(e) => setConversion(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
               />
            </div>

             {/* Response Time Input */}
             <div className="space-y-4">
               <div className="flex justify-between text-sm font-medium">
                  <label htmlFor="response-time-input">Lead Response Time</label>
                  <span className="font-mono text-primary">{responseTime} min</span>
               </div>
               <input
                  id="response-time-input"
                  type="range"
                  min="1" max="120" step="1"
                  value={responseTime}
                  onChange={(e) => setResponseTime(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
               />
            </div>
         </div>
      </div>

      {/* Right Panel: Output */}
      <div className="flex-1 p-8 bg-background relative flex flex-col justify-between">

         {/* Status Bar */}
         <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-8 border-b border-border/30 pb-4">
            <span>Model: v1.0.4</span>
            <span className={cn(
                "font-bold",
                result.band === "high" ? "text-destructive" :
                result.band === "medium" ? "text-signal-warning" : "text-signal-success"
            )}>
               RISK: {result.band}
            </span>
         </div>

         {/* Visual Gauge */}
         <div className="relative h-48 w-full flex items-center justify-center mb-6">
             <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="none" className="text-secondary" />
                <motion.circle
                   cx="96" cy="96" r="88"
                   stroke="currentColor"
                   strokeWidth="12"
                   fill="none"
                   className={cn(
                       result.band === "high" ? "text-destructive" :
                       result.band === "medium" ? "text-signal-warning" : "text-signal-success"
                   )}
                   strokeDasharray={553} // 2*pi*88
                   strokeLinecap="round"
                   initial={{ strokeDashoffset: 553 }}
                   animate={{ strokeDashoffset: 553 - (553 * result.riskScore / 100) }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-5xl font-bold tracking-tighter">{result.riskScore}</span>
                 <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Risk Score</span>
             </div>
         </div>

         {/* Financial Impact */}
         <div className="text-center space-y-2 mb-8">
            <p className="text-sm text-muted-foreground">Est. Monthly Revenue Leak</p>
            <motion.div
               className="text-3xl md:text-4xl font-bold font-mono text-foreground"
               key={result.monthlyLeak}
               initial={{ opacity: 0.5, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
            >
               ${result.monthlyLeak.toLocaleString()}
            </motion.div>
         </div>

         {/* Remediation */}
         <div className="bg-secondary/20 p-4 rounded-lg border border-border/50 text-sm">
            <div className="font-semibold mb-2 text-foreground">Recommended Actions:</div>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
               {result.remediation.map((item, i) => (
                  <li key={i}>{item}</li>
               ))}
            </ul>
         </div>

      </div>
    </div>
  );
}
