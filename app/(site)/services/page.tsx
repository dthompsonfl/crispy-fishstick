import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function ServicesPage() {
  const services = [
    {
      title: "Website Rebuild & Modernization",
      description: "Migrate from slow WordPress/Wix sites to high-performance Next.js systems.",
      whoFor: "Businesses outgrowing DIY builders.",
      timeline: "4-6 weeks",
      price: "From $3,500",
      features: ["Sub-100ms load times", "Perfect SEO structure", "Mobile-first design", "Content Management System"]
    },
    {
      title: "Booking & Automation Systems",
      description: "Custom appointment flows, reminders, and payment processing.",
      whoFor: "Service businesses (Clinics, Salons, Consultancies).",
      timeline: "6-8 weeks",
      price: "From $5,000",
      features: ["Calendar integration", "Stripe/Square payments", "Automated SMS/Email", "Admin dashboard"]
    },
    {
      title: "Local SEO & Presence",
      description: "Technical SEO to dominate local search results. No magic, just clean data.",
      whoFor: "Local brick-and-mortar.",
      timeline: "Ongoing",
      price: "From $1,000/mo",
      features: ["Schema markup implementation", "Google Business Profile optimization", "Review management", "Local citation audits"]
    },
    {
      title: "Maintenance & Reliability",
      description: "We keep the lights on so you don't have to.",
      whoFor: "Anyone with a critical digital asset.",
      timeline: "Monthly",
      price: "From $250/mo",
      features: ["Daily backups", "Security patches", "Uptime monitoring", "Emergency response"]
    }
  ];

  return (
    <div className="container py-12 md:py-24 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Services</h1>
        <p className="text-xl text-muted-foreground">
          Engineering solutions for business problems. No fluff, no upsells you don't need.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col h-full card-precision">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                   <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                   <CardDescription className="text-base">{service.description}</CardDescription>
                </div>
                <Badge variant="secondary" className="whitespace-nowrap">{service.price}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
               <div className="grid grid-cols-2 gap-4 text-sm">
                   <div>
                       <span className="font-semibold text-muted-foreground block">Who it's for</span>
                       {service.whoFor}
                   </div>
                   <div>
                       <span className="font-semibold text-muted-foreground block">Timeline</span>
                       {service.timeline}
                   </div>
               </div>
               <ul className="space-y-2">
                   {service.features.map((feature, i) => (
                       <li key={i} className="flex items-center gap-2 text-sm">
                           <Check className="h-4 w-4 text-signal-success" />
                           {feature}
                       </li>
                   ))}
               </ul>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full btn-precision">
                    <Link href="/contact">Book Consultation</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
