import { AlertTriangle, Gavel, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RiskCards() {
  const risks = [
    {
      title: "Google's Core Web Vitals",
      icon: Gauge,
      color: "text-signal-warning",
      description: "Google now penalizes slow sites. If your page takes >2.5s to load, you lose rank to competitors.",
    },
    {
      title: "ADA Lawsuits",
      icon: Gavel,
      color: "text-signal-danger",
      description: "Small businesses are prime targets for predatory lawsuits. Accessibility isn't optional; it's legal insurance.",
    },
    {
      title: "The 'Latency Tax'",
      icon: AlertTriangle,
      color: "text-signal-warning",
      description: "Every 100ms delay costs you 1% of sales. Cheap hosting saves $5/mo but loses you thousands in leads.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {risks.map((risk) => {
        const Icon = risk.icon;
        return (
          <Card key={risk.title} className="card-precision border-l-4 border-l-primary/20 hover:border-l-primary transition-all">
            <CardHeader className="pb-2">
              <div className={`mb-4 w-12 h-12 rounded-full bg-secondary flex items-center justify-center ${risk.color} bg-opacity-10`}>
                <Icon className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">{risk.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{risk.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
