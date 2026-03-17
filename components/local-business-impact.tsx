import { Quote, TrendingUp } from "lucide-react";

export function LocalBusinessImpact() {
  const impacts = [
    {
      company: "Local Artisan Bakery",
      stat: "$12k",
      label: "Saved in 3rd Party Fees",
      quote: "We finally own our online orders. No more paying 30% to delivery apps.",
    },
    {
      company: "Metro Construction",
      stat: "#1",
      label: "Rank for 'Commercial Paving'",
      quote: "Our old Wix site was invisible. Now we get 5 qualified leads a week.",
    },
    {
      company: "City Dental Group",
      stat: "100%",
      label: "HIPAA & ADA Compliant",
      quote: "Peace of mind knowing we aren't a legal target. The site just works.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {impacts.map((item, i) => (
        <div key={i} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl -z-10 group-hover:from-primary/10 transition-colors" />
          <div className="p-8 border border-border/50 rounded-2xl h-full flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-6">
                 <Quote className="h-8 w-8 text-primary/20" />
                 <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-4xl font-bold mb-2 tracking-tight">{item.stat}</h3>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">{item.label}</p>
              <p className="text-lg italic text-foreground/80 leading-relaxed">&quot;{item.quote}&quot;</p>
            </div>
            <div className="mt-8 pt-4 border-t border-border/30">
               <p className="font-bold text-sm">{item.company}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
