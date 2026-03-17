import { Metadata } from "next";
import { Zap, ShieldCheck, Server, Globe, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpeedMeter } from "@/components/speed-meter";

export const metadata: Metadata = {
  title: "Technology & Performance",
  description: "Why our sites are faster and more secure than the competition.",
};

export default function PerformancePage() {
  return (
    <div className="container py-24 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
           Speed is a Feature.
        </h1>
        <p className="text-xl text-muted-foreground text-balance">
           We don&apos;t sell specs. We sell outcomes. Here is the technology stack that powers your business, translated into plain English.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-center">
         <div>
            <SpeedMeter score={99} />
         </div>
         <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why Speed Matters</h2>
            <p className="text-lg text-muted-foreground">
               Amazon found that every 100ms of latency cost them 1% in sales. You aren&apos;t Amazon, but your customers still expect instant loading.
            </p>
            <ul className="space-y-4">
               {[
                  "Higher Google Rankings (SEO)",
                  "Lower Bounce Rates",
                  "Better Mobile Experience",
                  "Increased Conversion Rates"
               ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium">
                     <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Zap className="w-4 h-4" />
                     </div>
                     {item}
                  </li>
               ))}
            </ul>
         </div>
      </div>

      {/* Tech Stack Benefits */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">The &quot;No-Crash&quot; Architecture</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <Globe className="w-10 h-10 mb-4 text-primary" />
              <CardTitle>Edge Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your site is replicated on servers worldwide. A customer in London loads it from London, not New York.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader>
              <Database className="w-10 h-10 mb-4 text-primary" />
              <CardTitle>Database Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We use strict data rules. It is mathematically impossible to save an order without a price, or a user without an email.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader>
              <Server className="w-10 h-10 mb-4 text-primary" />
              <CardTitle>Auto-Scaling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you get featured on the news, your site won&apos;t crash. It automatically adds power to handle the traffic spike.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security */}
      <section className="bg-secondary/10 rounded-3xl p-8 md:p-12 border border-border/50">
         <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
               <div className="flex items-center gap-3 text-emerald-500 font-bold">
                  <ShieldCheck className="w-6 h-6" />
                  <span>Bank-Grade Security</span>
               </div>
               <h2 className="text-3xl font-bold">Sleep Soundly.</h2>
               <p className="text-muted-foreground">
                  Wordpress sites get hacked because they rely on 50 different plugins from unknown developers. We write custom, secure code with zero bloat.
               </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
               {[
                  "SSL Encryption (HTTPS)",
                  "DDoS Protection",
                  "Automated Backups",
                  "OWASP Compliant"
               ].map((item) => (
                  <div key={item} className="bg-background p-4 rounded-xl border border-border text-center font-medium text-sm">
                     {item}
                  </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}
