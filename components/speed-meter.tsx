export function SpeedMeter({ score = 98 }: { score?: number }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-card rounded-2xl border border-border/50">
      <div className="relative w-48 h-24 overflow-hidden mb-4">
        {/* Background Arc */}
        <div className="absolute w-48 h-48 rounded-full border-[12px] border-muted top-0 box-border" />
        {/* Fill Arc - simplified visual representation using CSS gradient mask or just color segments */}
        {/* For a simple SVG implementation: */}
        <svg viewBox="0 0 100 50" className="w-full h-full transform transition-all duration-1000 ease-out">
           <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/20" />
           <path
             d="M 10 50 A 40 40 0 0 1 90 50"
             fill="none"
             stroke={score > 89 ? "#10b981" : score > 50 ? "#f59e0b" : "#ef4444"}
             strokeWidth="10"
             strokeDasharray="126"
             strokeDashoffset={126 - (126 * score / 100)}
             className="transition-all duration-1000 ease-out"
           />
        </svg>

        {/* Needle */}
        {/* <div
           className="absolute bottom-0 left-1/2 w-1 h-24 bg-foreground origin-bottom transition-transform duration-1000 ease-out rounded-full"
           style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        /> */}
      </div>

      <div className="text-center">
         <div className={`text-4xl font-bold font-mono ${score > 89 ? "text-emerald-500" : score > 50 ? "text-amber-500" : "text-red-500"}`}>
            {score}
         </div>
         <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
            Google Speed Score
         </div>
      </div>

      <div className="mt-6 text-sm text-center text-muted-foreground max-w-[200px]">
         {score > 89
            ? "Your customers see content instantly. Google ranks you higher."
            : "Slow load times are costing you approximately 20% of traffic."
         }
      </div>
    </div>
  );
}
