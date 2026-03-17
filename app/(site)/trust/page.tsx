import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Server, Key, FileText, UserCheck } from "lucide-react";

export default function TrustPage() {
  return (
    <div className="container py-12 md:py-24 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Trust Center</h1>
        <p className="text-xl text-muted-foreground">
          We build systems you can rely on. Here is exactly how we handle security, ownership, and emergencies.
        </p>
      </div>

      {/* Trust Pillars */}
      <div className="grid md:grid-cols-2 gap-8">
          <Card className="card-precision">
              <CardHeader>
                  <Key className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>100% Ownership</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p>
                      You own the code, the domain, and the hosting accounts. We do not hold your assets hostage.
                  </p>
                  <p className="text-sm text-muted-foreground">
                      We set up accounts in your name (or transfer them immediately). If we part ways, you have everything you need to hire someone else.
                  </p>
              </CardContent>
          </Card>

          <Card className="card-precision">
              <CardHeader>
                  <Server className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>Security Baseline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p>
                      Every project includes our standard security hardening:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Automated daily backups</li>
                      <li>Least-privilege access controls</li>
                      <li>Environment variable encryption</li>
                      <li>DDoS protection (via Vercel/Cloudflare)</li>
                  </ul>
              </CardContent>
          </Card>
      </div>

      {/* Bus Factor Protocol */}
      <section className="bg-muted/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                  <UserCheck className="h-8 w-8" />
                  Bus Factor Protocol
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                  "What happens if Vantus Systems disappears tomorrow?" <br/>
                  It's a morbid question, but a responsible business owner must ask it. We have a pre-defined protocol to ensure you are never locked out of your business.
              </p>
              <Button asChild size="lg" className="btn-precision">
                  <Link href="/bus-factor-protocol">
                      Read the Protocol
                  </Link>
              </Button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-background to-transparent pointer-events-none md:block hidden" />
      </section>

      {/* FAQ Teaser */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
              <h3 className="text-2xl font-bold mb-4">Support & Escalation</h3>
              <p className="text-muted-foreground mb-4">
                  We provide ongoing maintenance packages to ensure your system stays healthy.
              </p>
              <ul className="space-y-4">
                  <li className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                          <span className="font-bold">1</span>
                      </div>
                      <div>
                          <h4 className="font-semibold">Standard Support</h4>
                          <p className="text-sm text-muted-foreground">Email support with 24h response time for non-emergencies.</p>
                      </div>
                  </li>
                  <li className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                          <span className="font-bold">2</span>
                      </div>
                      <div>
                          <h4 className="font-semibold">Emergency Escalation</h4>
                          <p className="text-sm text-muted-foreground">Direct SMS line for site outages (available on Maintenance plans).</p>
                      </div>
                  </li>
              </ul>
          </div>
          <div className="bg-card border p-6 rounded-xl">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" /> Standard Contract Terms
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                  We believe in plain English contracts. No hidden IP clauses.
              </p>
              <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                      <span>Payment Terms</span>
                      <span className="font-mono">50% Start / 50% Launch</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                      <span>IP Ownership</span>
                      <span className="font-mono">Client (Upon Payment)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                      <span>Warranty</span>
                      <span className="font-mono">30 Days Bug-Free</span>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
