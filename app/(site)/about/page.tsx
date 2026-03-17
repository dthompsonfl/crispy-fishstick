import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24 max-w-3xl mx-auto space-y-12">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Math, Not Marketing.</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
           Vantus Systems was founded on a simple frustration: Small businesses are constantly being sold "magic" marketing solutions that are technically broken.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p>
              We are not a marketing agency. We don't sell "vibes". We are an engineering studio.
              We believe that a website is a software product, and it should be built with the same rigor as a banking app or a flight control system.
          </p>
          <h3>Our Principles</h3>
          <ul>
              <li><strong>Transparency:</strong> If we don't know, we say so. If it costs more, we explain why.</li>
              <li><strong>Ownership:</strong> You should never feel trapped by your vendor. We build systems you own.</li>
              <li><strong>Performance:</strong> We obsess over milliseconds because speed equals trust.</li>
          </ul>
          <h3>Why "Vantus"?</h3>
          <p>
              Derived from "Advantage". We give small businesses the unfair advantage of enterprise-grade engineering, without the enterprise-grade bureaucracy.
          </p>
      </div>

      <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-6">Ready to work with engineers?</h2>
          <Button asChild size="lg" className="btn-precision rounded-full px-8">
              <Link href="/audit">Get Your Free Audit</Link>
          </Button>
      </div>
    </div>
  );
}
