import { X, Check } from "lucide-react";

export function BeforeAfterComparison() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-3xl overflow-hidden shadow-sm">
      {/* LEFT: The "Other Guys" */}
      <div className="bg-signal-danger/5 p-8 md:p-12 space-y-6">
        <h3 className="text-2xl font-bold text-signal-danger mb-8">Typical Agency</h3>
        <ul className="space-y-4">
          {[
             "You rent the website (Wix/Squarespace)",
             "Charged $150/hr for text updates",
             "Slow, bloated code (Wordpress themes)",
             "Insecure plugins & frequent hacks",
             "No accessibility compliance",
             "Ghosted after launch"
          ].map((item) => (
             <li key={item} className="flex items-start gap-3 text-foreground/80">
                <div className="min-w-6 h-6 rounded-full bg-signal-danger/10 dark:bg-signal-danger/90/30 text-signal-danger flex items-center justify-center mt-0.5">
                   <X className="w-4 h-4" />
                </div>
                <span>{item}</span>
             </li>
          ))}
        </ul>
      </div>

      {/* RIGHT: Vantus Systems */}
      <div className="bg-signal-success/5 p-8 md:p-12 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-signal-success text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
           The Standard
        </div>
        <h3 className="text-2xl font-bold text-signal-success mb-8">Vantus Systems</h3>
        <ul className="space-y-4">
          {[
             "You own 100% of the code & data",
             "Instant updates via Admin Dashboard",
             "Google Core Web Vitals optimized (99/100)",
             "Enterprise-grade security (SOC2 Ready)",
             "ADA/WCAG Compliant by default",
             "Long-term support warranty"
          ].map((item) => (
             <li key={item} className="flex items-start gap-3 text-foreground">
                <div className="min-w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-signal-success flex items-center justify-center mt-0.5">
                   <Check className="w-4 h-4" />
                </div>
                <span className="font-medium">{item}</span>
             </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
