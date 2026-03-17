import type { Metadata } from "next";
import { Code, Layers, Database, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services & Packages",
  description: "Specialized engineering and design services for high-stakes digital products.",
};

const packages = [
  {
    title: "The Business OS",
    description: "The complete technology foundation for your business. You get the site, the hosting, and the control panel.",
    price: "Starting at $5,000",
    features: [
      "Custom Next.js Website (Fastest tech available)",
      "Owner's Dashboard (Edit content instantly)",
      "Google Core Web Vitals Optimization",
      "Managed Hosting & Security Updates",
      "Full Code Ownership (No lock-in)"
    ],
    cta: "Build My Foundation",
    highlight: true,
  },
  {
    title: "Audit & Rescue",
    description: "Fixing your current site's speed, legal compliance, and lost leads.",
    price: "Flat Fee: $1,500",
    features: [
      "ADA/WCAG Compliance Audit",
      "Performance Optimization (Speed up load times)",
      "Security Vulnerability Scan",
      "SEO Technical Fixes",
      "Detailed 'Plain English' Report"
    ],
    cta: "Fix My Site",
    highlight: false,
  }
];

const services = [
  {
    icon: Code,
    title: "Design Engineering",
    description:
      "Bridging the gap between Figma and production code. I build pixel-perfect UI systems that scale.",
    features: [
      "Component Libraries",
      "Design Systems",
      "Motion & Interaction",
      "Storybook Architecture",
    ],
  },
  {
    icon: Layers,
    title: "Frontend Systems",
    description:
      "Scalable React architectures for complex applications. Optimized for performance and maintainability.",
    features: [
      "Next.js Architecture",
      "State Management",
      "Performance Optimization",
      "Type-Safe APIs",
    ],
  },
  {
    icon: Database,
    title: "Commerce Integrations",
    description:
      "Reliable synchronization engines and custom storefronts for high-volume commerce.",
    features: [
      "Shopify Headless",
      "ERP Synchronization",
      "Inventory Management",
      "Payment Gateways",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Services & Packages
          </h1>
          <p className="text-xl text-muted-foreground">
            Whether you need a full digital transformation or just a specific technical problem solved, we have a package for you.
          </p>
        </div>

        {/* SMB PACKAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 max-w-5xl mx-auto">
          {packages.map((pkg) => (
             <Card
               key={pkg.title}
               className={cn(
                 "relative flex flex-col p-8",
                 pkg.highlight ? "bg-secondary/10 border-primary/50 shadow-lg shadow-primary/5" : "bg-card border-border"
               )}
             >
                {pkg.highlight && (
                   <div className="absolute top-0 right-0">
                      <Badge variant="default" className="rounded-bl-xl rounded-tr-lg rounded-tl-none rounded-br-none px-3 py-1 text-xs font-bold uppercase tracking-wider">
                        Most Popular
                      </Badge>
                   </div>
                )}
                <div className="mb-6">
                   <h2 className="text-3xl font-bold mb-2">{pkg.title}</h2>
                   <p className="text-lg font-medium text-primary">{pkg.price}</p>
                </div>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed flex-1">
                   {pkg.description}
                </p>
                <ul className="space-y-4 mb-8">
                   {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                         <div className="mt-1 min-w-4 h-4 rounded-full bg-signal-success/20 text-signal-success flex items-center justify-center">
                            <Box className="w-2.5 h-2.5" />
                         </div>
                         <span>{f}</span>
                      </li>
                   ))}
                </ul>
                <Button
                    className="w-full h-12 text-lg rounded-xl"
                    variant={pkg.highlight ? "default" : "outline"}
                    asChild
                >
                   <Link href="/contact">{pkg.cta}</Link>
                </Button>
             </Card>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-12">
           <div className="h-px bg-border flex-1" />
           <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Specialized Engineering</span>
           <div className="h-px bg-border flex-1" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="group p-6 hover:border-foreground/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary group-hover:bg-foreground/5 transition-colors">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-3">{service.title}</h2>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-xs font-medium flex items-center gap-2 text-foreground/80"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="border-t border-border pt-24 text-center">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">
                  Not sure what you need?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We often take on custom engineering challenges that don&apos;t fit neatly into a bucket.
                </p>
                <Button asChild size="lg" className="rounded-full px-8">
                   <Link href="/contact">Book a Consultation</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
