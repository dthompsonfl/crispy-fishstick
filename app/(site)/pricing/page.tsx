import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, HelpCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function PricingPage() {
  const packages = [
    {
      name: "Starter",
      description: "Perfect for a launch or refresh.",
      price: "$2,500",
      features: [
        "High-performance Landing Page",
        "CMS Integration (Sanity/Contentful)",
        "Basic SEO Setup",
        "Contact Form & Lead Capture",
        "Mobile Optimized",
        "1 Month Support"
      ],
      notIncluded: [
        "Complex backend logic",
        "User accounts/Auth",
        "Payment processing"
      ]
    },
    {
      name: "Growth",
      description: "Systems & Automation for scaling.",
      price: "$5,000",
      popular: true,
      features: [
        "Everything in Starter",
        "Booking/Scheduling System",
        "Payment Integration (Stripe)",
        "Automated Email Notifications",
        "CRM Integration (HubSpot/Salesforce)",
        "3 Months Support"
      ],
      notIncluded: [
        "Custom mobile app",
        "Enterprise SSO"
      ]
    },
    {
      name: "Scale",
      description: "Advanced custom engineering.",
      price: "$10,000+",
      features: [
        "Everything in Growth",
        "Multi-location support",
        "Custom Database Architecture",
        "User Authentication & Portals",
        "Advanced Analytics Dashboard",
        "Priority Support SLA"
      ],
      notIncluded: []
    }
  ];

  return (
    <div className="container py-12 md:py-24 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">
          Fixed prices. Clear scope. No surprise invoices.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {packages.map((pkg, index) => (
          <Card key={index} className={`flex flex-col h-full card-precision relative ${pkg.popular ? 'border-primary ring-1 ring-primary shadow-lg' : ''}`}>
            {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
              <div className="mt-4">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">/ project</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
               <div>
                   <h4 className="font-semibold text-sm mb-3">Includes:</h4>
                   <ul className="space-y-2">
                       {pkg.features.map((feature, i) => (
                           <li key={i} className="flex items-start gap-2 text-sm">
                               <Check className="h-4 w-4 text-signal-success mt-0.5 shrink-0" />
                               <span>{feature}</span>
                           </li>
                       ))}
                   </ul>
               </div>
               {pkg.notIncluded.length > 0 && (
                   <div>
                       <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Not included:</h4>
                       <ul className="space-y-2">
                           {pkg.notIncluded.map((feature, i) => (
                               <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                   <X className="h-4 w-4 mt-0.5 shrink-0 opacity-50" />
                                   <span>{feature}</span>
                               </li>
                           ))}
                       </ul>
                   </div>
               )}
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full btn-precision" variant={pkg.popular ? "default" : "outline"}>
                    <Link href="/contact">Select Package</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Budget Reality Check */}
      <section className="bg-muted/30 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">Budget Reality Check</h2>
              <p className="text-muted-foreground">
                  We believe in financial transparency. If your budget is under $2,500, we might not be the best fit right now.
                  However, we highly recommend <Link href="/resources" className="underline underline-offset-4 decoration-primary/50 hover:decoration-primary">launching with these free tools</Link> instead of hiring a cheap freelancer who might deliver broken code.
              </p>
          </div>
      </section>
    </div>
  );
}
