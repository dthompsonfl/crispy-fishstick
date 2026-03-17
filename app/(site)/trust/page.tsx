import { Shield, CheckCircle, AlertTriangle, Lock, FileText, Scale } from "lucide-react"
import { Metadata } from "next"
import { BeforeAfterComparison } from "@/components/before-after-comparison"

export const metadata: Metadata = {
  title: "Trust Center | Vantus Systems",
  description: "How we protect your IP, ensure predictability, and define success. No black boxes.",
}

export default function TrustCenterPage() {
  return (
    <div className="container max-w-4xl py-24 space-y-24">
      {/* Header */}
      <section className="space-y-6 text-center">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
          <Shield className="w-4 h-4 mr-2" />
          The Anti-Scam Shield
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
          Trust Center
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          The software industry is full of vague promises and vendor lock-in.
          Here is exactly how I protect your business, your budget, and your sanity.
        </p>
      </section>

      {/* 1. Ownership */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Lock className="w-8 h-8 text-primary" />
          What You Own
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
             <h3 className="font-semibold text-lg mb-2">Total IP Ownership</h3>
             <p className="text-muted-foreground">
               You keep your domain, accounts, assets, and code. I build in your repositories (or transfer them immediately). You are never locked out of your own business.
             </p>
          </div>
          <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
             <h3 className="font-semibold text-lg mb-2">Zero Vendor Lock-in</h3>
             <p className="text-muted-foreground">
               I use standard, widely-supported technologies (React, Next.js, Postgres). Any competent engineer can pick up where I leave off. No proprietary &quot;black box&quot; CMS.
             </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Scale className="w-8 h-8 text-primary" />
          The Difference
        </h2>
        <BeforeAfterComparison />
      </section>

      {/* 2. Predictability */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          How Projects Stay Predictable
        </h2>
        <div className="space-y-4">
           <div className="flex gap-4 items-start">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                 <span className="font-bold text-primary">1</span>
              </div>
              <div>
                 <h4 className="font-semibold text-lg">Clear Phases & Deliverables</h4>
                 <p className="text-muted-foreground">Every project follows the Build Plan. You know exactly what is being delivered at each stage, from design mockups to the final line of code.</p>
              </div>
           </div>
           <div className="flex gap-4 items-start">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                 <span className="font-bold text-primary">2</span>
              </div>
              <div>
                 <h4 className="font-semibold text-lg">Written Scope & Change Control</h4>
                 <p className="text-muted-foreground">We agree on a scope in writing. If you want to add more, we pause, estimate the new work, and you approve it before I start. No surprise bills.</p>
              </div>
           </div>
           <div className="flex gap-4 items-start">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                 <span className="font-bold text-primary">3</span>
              </div>
              <div>
                 <h4 className="font-semibold text-lg">Weekly Updates</h4>
                 <p className="text-muted-foreground">You get a plain-English status update every week. What I did, what&apos;s next, and any blockers.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 3. Definition of Done */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-primary" />
          What &apos;Done&apos; Means
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
           {[
             "Performance Baseline (90+ Lighthouse)",
             "Mobile Responsiveness Checked",
             "Accessibility (WCAG AA) Audit",
             "Analytics Installed & Verified",
             "SEO Basics (Meta tags, Sitemap)",
             "Handoff Documentation Provided"
           ].map((item) => (
             <div key={item} className="flex items-center gap-3 p-4 border border-border/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-signal-success" />
                <span>{item}</span>
             </div>
           ))}
        </div>
      </section>

      {/* 4. Red Flags */}
      <section className="p-8 rounded-3xl bg-signal-danger/5 border border-signal-danger/10 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-signal-danger">
          <AlertTriangle className="w-6 h-6" />
          Red Flags to Watch For
        </h2>
        <p className="text-foreground/80">
          Whether you hire me or someone else, please be careful if you see these signs:
        </p>
        <ul className="space-y-4">
           <li className="flex gap-3">
              <span className="text-signal-danger font-bold">•</span>
              <span className="text-foreground/80"><strong>No Admin Access:</strong> If a vendor won&apos;t give you full admin access to your own site or hosting, run. They are holding you hostage.</span>
           </li>
           <li className="flex gap-3">
              <span className="text-signal-danger font-bold">•</span>
              <span className="text-foreground/80"><strong>Vague Pricing:</strong> &quot;It depends&quot; is fine for an estimate, but you need a fixed project fee or a clear hourly rate with a cap.</span>
           </li>
           <li className="flex gap-3">
              <span className="text-signal-danger font-bold">•</span>
              <span className="text-foreground/80"><strong>No Deliverables List:</strong> If they can&apos;t list exactly what you are paying for (e.g., &quot;Home page, About page, Contact form&quot;), you will likely be disappointed.</span>
           </li>
        </ul>
      </section>
    </div>
  )
}
