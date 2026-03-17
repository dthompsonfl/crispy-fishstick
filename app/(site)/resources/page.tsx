import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckSquare } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      title: "Website ROI Checklist",
      description: "A 20-point checklist to see if your current site is actually making money or just burning cash.",
      icon: CheckSquare,
      type: "PDF Guide"
    },
    {
      title: "Red Flags When Hiring Devs",
      description: "How to spot bad agencies before you sign the contract. Questions they hate answering.",
      icon: FileText,
      type: "Cheatsheet"
    },
    {
      title: "Launch Readiness Protocol",
      description: "The exact checklist we use before taking any site live. SEO, Security, and Performance checks.",
      icon: Download,
      type: "Template"
    }
  ];

  return (
    <div className="container py-12 md:py-24 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Resources</h1>
        <p className="text-xl text-muted-foreground">
          Free tools and guides to help you navigate the digital landscape. No email required.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {resources.map((res, i) => (
            <Card key={i} className="card-precision flex flex-col">
                <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                        <res.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{res.title}</CardTitle>
                    <CardDescription>{res.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        {res.type}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full btn-precision group">
                        Download
                        <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
