import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck, Zap, Lock, Database, LayoutTemplate, Clock } from "lucide-react";
import { TextReveal } from "@/components/ui/kinetic/text-reveal";
import { HeroBadge } from "@/components/ui/kinetic/hero-badge";
import { AmbientBackground } from "@/components/ui/kinetic/ambient-background";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-32 pb-24 md:pb-32 relative">
      <AmbientBackground />
      {/* Hero Section */}
      <section className="relative pt-8 md:pt-24 lg:pt-32 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-6 md:gap-8">
          <HeroBadge>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-success"></span>
              </span>
              Accepting New Clients for Q3
            </span>
          </HeroBadge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-balance">
            <TextReveal text="Engineering-grade systems for small businesses." />
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
            Math, not marketing. We build rigorous, high-performance websites and systems that you own 100%. No vague promises, just measurable outcomes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <Button asChild size="lg" className="h-12 px-8 rounded-full text-base btn-precision">
              <Link href="/audit">
                Get a Free Mini-Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-full text-base btn-precision">
              <Link href="/pricing">
                View Packages
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground mt-8 border-t border-border/50 pt-8 w-full max-w-3xl">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> 100% Ownership Transfer</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Guaranteed Timelines</span>
            <span className="flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Enterprise Security</span>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="card-precision bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Performance First</CardTitle>
              <CardDescription>
                Speed is revenue. We build for sub-100ms interactions and perfect Core Web Vitals scores.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="card-precision bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <Database className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Data Sovereignty</CardTitle>
              <CardDescription>
                You own your code, your data, and your infrastructure. We provide a full "Bus Factor" handoff protocol.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="card-precision bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <LayoutTemplate className="h-8 w-8 text-primary mb-4" />
              <CardTitle>Transparent Scope</CardTitle>
              <CardDescription>
                Fixed packages with clear deliverables. No scope creep, no surprise invoices, no "hourly" black holes.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How it Works (Short) */}
      <section className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How we work</h2>
            <p className="text-muted-foreground">Simple, deterministic, and transparent.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
           <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border -z-10" />
           {[
               { step: "01", title: "Audit & Scope", desc: "We analyze your needs and define a fixed scope." },
               { step: "02", title: "Build & Verify", desc: "Rigorous development with weekly demos." },
               { step: "03", title: "Launch & Handover", desc: "Full ownership transfer + training." }
           ].map((item, i) => (
               <div key={i} className="flex flex-col items-center text-center bg-background p-4 rounded-lg border border-transparent hover:border-border transition-colors">
                   <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4 shadow-lg z-10">
                       {item.step}
                   </div>
                   <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                   <p className="text-muted-foreground">{item.desc}</p>
               </div>
           ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Stop guessing. Start building.</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                Get a free engineering audit of your current setup. No sales pressure, just technical facts.
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8 h-12 text-foreground font-bold btn-precision relative z-10">
                <Link href="/audit">
                    Get Your Audit
                </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
