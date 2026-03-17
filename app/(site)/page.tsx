import Link from "next/link";
import { ArrowRight, ShieldAlert, LayoutDashboard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/hero-background";
import { Reveal } from "@/components/reveal";
import { DashboardPreview } from "@/components/dashboard-preview";
import { RiskCards } from "@/components/risk-cards";
import { LocalBusinessImpact } from "@/components/local-business-impact";
import { CalibrationHeadline } from "@/components/calibration-headline";
import { AuditModal } from "@/components/audit-modal";
import { TrustWidget } from "@/components/trust-widget";
import { RevenueLeakDetector } from "@/components/revenue-leak-detector";
import { BuildPlanModule } from "@/components/build-plan-module";

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

            <Reveal delay={0.1}>
              <div className="mb-12">
                <CalibrationHeadline text="Transparent. Predictable. Done." />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 max-w-4xl text-balance">
                Enterprise-grade web apps that you actually <span className="text-primary">own</span> and <span className="text-primary">control</span>.
              </h2>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed text-balance">
                Stop renting your digital presence. We build rigorous, high-performance engines that you drive—without needing a developer for every price change.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
                <AuditModal />
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full hover:bg-background/80">
                  <Link href="/work">
                    View Case Studies
                  </Link>
                </Button>
              </div>
            </Reveal>
        </div>
      </section>

      {/* ENGINEERING RIGOR / TRUST SIGNALS */}
      <section className="py-20 border-b border-border/50 bg-background/50 backdrop-blur-sm relative overflow-hidden">
        <div className="container relative z-10">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--signal-success)]/10 text-[var(--signal-success)] text-xs font-bold uppercase tracking-wider mb-6">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Infrastructure
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Built for founders who demand <span className="text-primary">rigor</span>.</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We don&apos;t just build websites; we engineer digital assets. Every line of code is optimized for performance, security, and conversion.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Zero-Compromise Security</p>
                      <p className="text-sm text-muted-foreground">Hardened against common vectors like CSRF, XSS, and SQLi from day one.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Production-Grade Performance</p>
                      <p className="text-sm text-muted-foreground">Sub-second page loads and perfect Core Web Vitals for maximum SEO impact.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50" />
                <div className="relative z-10">
                  <TrustWidget />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* THE NO-CODE PROMISE */}
      <section className="py-24 bg-secondary/20 border-b border-border/50 overflow-hidden relative">
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-xl mb-6 text-primary">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">We build the engine. You drive the car.</h2>
            <p className="text-lg text-muted-foreground">
              Update your pricing, hours, and content instantly without calling a developer. Our &quot;BusinessOS&quot; dashboard puts the keys in your hands.
            </p>
          </div>

          <DashboardPreview />

          <div className="text-center mt-12">
            <Button variant="link" asChild className="text-lg text-primary">
              <Link href="/platform">See all features in the Owner&apos;s Dashboard &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* REVENUE LEAK DETECTOR */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Stop bleeding revenue.</h2>
              <p className="text-lg text-muted-foreground">
                A slow, insecure, or confusing website isn&apos;t just an eyesore—it&apos;s a liability. Use our diagnostic tool to estimate your monthly conversion leak.
              </p>
            </div>

            <RevenueLeakDetector />

            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground mb-4 italic">Note: These are estimates based on industry benchmarks for SMB lead response and performance impact.</p>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/lab/revenue-leak">Explore the full model &rarr;</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HIDDEN DANGERS */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4 text-amber-500 font-medium">
                <ShieldAlert className="w-5 h-5" />
                <span>Education First</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The Hidden Dangers</h2>
              <p className="text-lg text-muted-foreground">
                Most small business sites are ticking time bombs. Here is what cheap agencies don&apos;t tell you.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/academy">Read the full guide</Link>
            </Button>
          </div>

          <RiskCards />
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 border-y border-border/50 bg-secondary/10">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Real Results for Local Owners</h2>
            <p className="text-lg text-muted-foreground">
              When you stop fighting with your website, you start growing your business.
            </p>
          </div>
          <LocalBusinessImpact />
        </div>
      </section>

      {/* THE BUILD PLAN */}
      <section className="py-24 border-t border-border/50 bg-secondary/5">
        <div className="container">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">The Engineering Protocol</h2>
              <p className="text-lg text-muted-foreground">
                Our 7-step process ensures your digital asset is built to last, with total transparency at every stage.
              </p>
            </div>
            <BuildPlanModule />
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="py-32 container text-center relative overflow-hidden"
        data-hud-section="CTA"
      >
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform scale-150 z-0 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Ready to take control?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 text-balance">
            Stop renting. Start owning. Get a rigorous, compliant, and profitable digital asset.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg shadow-xl">
              <Link href="/contact">Book a Free Strategy Call</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg bg-background">
              <Link href="/process">How We Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
