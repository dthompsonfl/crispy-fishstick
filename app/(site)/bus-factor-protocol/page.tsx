import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileKey, ShieldAlert, GitBranch, Database } from "lucide-react";

export default function BusFactorProtocolPage() {
  return (
    <div className="container py-12 md:py-24 max-w-4xl mx-auto space-y-12">
      <Button asChild variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
          <Link href="/trust" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Trust Center
          </Link>
      </Button>

      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">The Bus Factor Protocol</h1>
        <p className="text-xl text-muted-foreground">
          A contingency plan for the worst-case scenario. Ensuring your business continuity if Vantus Systems is unable to operate.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h3>The Philosophy</h3>
          <p>
              In software engineering, the "Bus Factor" is the minimum number of team members that have to disappear (e.g., get hit by a bus) before a project stalls.
              For many agencies, the Bus Factor is 1. If that person disappears, you lose access to your website, your domain, and your email.
          </p>
          <p>
              At Vantus, we design for a <strong>Client-Sovereign Bus Factor</strong>. You should never depend solely on us for your digital existence.
          </p>
      </div>

      <div className="grid gap-8">
          <div className="flex gap-6 items-start p-6 rounded-xl border bg-card/50">
              <GitBranch className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                  <h3 className="text-xl font-bold mb-2">1. Source Code Repository</h3>
                  <p className="text-muted-foreground mb-4">
                      All code lives in a Git repository (GitHub/GitLab).
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                      <li>We invite your email as an Admin on the repository from Day 1.</li>
                      <li>If we disappear, you simply remove us and invite a new developer.</li>
                      <li>The code history is preserved, so the new developer knows exactly what happened.</li>
                  </ul>
              </div>
          </div>

          <div className="flex gap-6 items-start p-6 rounded-xl border bg-card/50">
              <FileKey className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                  <h3 className="text-xl font-bold mb-2">2. Credentials & Hosting</h3>
                  <p className="text-muted-foreground mb-4">
                      We never put critical assets in a "Vantus Agency Account".
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                      <li><strong>Domains:</strong> Registered in your name/account (GoDaddy, Namecheap, etc.).</li>
                      <li><strong>Hosting:</strong> Vercel/Netlify/AWS accounts are yours. We are added as a "Team Member".</li>
                      <li><strong>Secrets:</strong> API keys are stored in encrypted environment variables, not hardcoded.</li>
                  </ul>
              </div>
          </div>

          <div className="flex gap-6 items-start p-6 rounded-xl border bg-card/50">
              <Database className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                  <h3 className="text-xl font-bold mb-2">3. The "Emergency Handoff" File</h3>
                  <p className="text-muted-foreground mb-4">
                      Every project repository includes a `docs/HANDOFF.md` file containing:
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Architecture overview.</li>
                      <li>Build and deploy instructions.</li>
                      <li>List of all external services (Payment gateways, CMS, Analytics).</li>
                      <li>Emergency contacts for 3rd party support.</li>
                  </ul>
              </div>
          </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex gap-4">
          <ShieldAlert className="h-6 w-6 text-red-500 shrink-0" />
          <div>
              <h4 className="font-bold text-red-500 mb-2">Our Promise</h4>
              <p className="text-sm text-muted-foreground">
                  We will never hold your digital assets hostage for payment. Disputes are handled via contract law, not by shutting down your website.
                  You maintain administrative control at all times.
              </p>
          </div>
      </div>
    </div>
  );
}
