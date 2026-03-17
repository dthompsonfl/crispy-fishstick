import Link from "next/link";
import { ArrowRight, ShieldAlert, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/hero-background";
import { Reveal } from "@/components/reveal";
import { DashboardPreview } from "@/components/dashboard-preview";
import { RiskCards } from "@/components/risk-cards";
import { LocalBusinessImpact } from "@/components/local-business-impact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section
        className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden border-b border-border/50 py-20"
        data-hud-section="Hero"
      >
        <HeroBackground />

        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
            <Reveal>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                Ownership. Control. Peace of Mind.
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 max-w-4xl text-balance">
                Enterprise-grade web apps that you actually <span className="text-primary">own</span> and <span className="text-primary">control</span>.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed text-balance">
                Stop renting your digital presence. We build rigorous, high-performance engines that you drive—without needing a developer for every price change.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
                <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20">
                  <Link href="/platform">
                    Tour the Platform <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full hover:bg-background/80">
                  <Link href="/work">
                    View Case Studies
                  </Link>
                </Button>
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

      {/* HIDDEN DANGERS */}
      <section className="py-24 bg-background">
         <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
               <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4 text-signal-warning font-medium">
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
