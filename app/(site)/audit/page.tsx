"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitAudit } from "@/app/actions";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function AuditPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});

    try {
        const result = await submitAudit(formData);

        if (result.success) {
            setIsSuccess(true);
        } else {
            setErrors(result.errors || {});
        }
    } catch (e) {
        console.error(e);
        setErrors({ form: ["Something went wrong. Please try again."] });
    } finally {
        setIsSubmitting(false);
    }
  }

  if (isSuccess) {
      return (
          <div className="container py-24 flex justify-center">
              <Card className="max-w-md w-full text-center py-12 px-6">
                  <div className="flex justify-center mb-6">
                      <div className="rounded-full bg-signal-success/10 p-4">
                          <CheckCircle2 className="h-12 w-12 text-signal-success" />
                      </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Request Received</h2>
                  <p className="text-muted-foreground mb-8">
                      We've received your audit request. A senior engineer will review your site and email you a breakdown within 2 business days.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline">
                      Submit another
                  </Button>
              </Card>
          </div>
      )
  }

  return (
    <div className="container py-12 md:py-24 max-w-2xl mx-auto">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Free Engineering Mini-Audit</h1>
        <p className="text-muted-foreground text-lg">
          No sales pitch. Just a quick check of your site's performance, security, and code quality.
        </p>
      </div>

      <Card className="card-precision">
        <CardHeader>
          <CardTitle>Your Details</CardTitle>
          <CardDescription>We'll analyze your public site and send a report to your email.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Jane Doe" required className="input-precision" />
                    {errors.name && <p className="text-destructive text-xs">{errors.name[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="jane@company.com" required className="input-precision" />
                    {errors.email && <p className="text-destructive text-xs">{errors.email[0]}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input id="url" name="url" placeholder="https://example.com" className="input-precision" />
                {errors.url && <p className="text-destructive text-xs">{errors.url[0]}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="concern">Top Concern</Label>
                <Textarea id="concern" name="concern" placeholder="My site is slow / I'm worried about security / SEO is bad..." required className="input-precision" />
                {errors.concern && <p className="text-destructive text-xs">{errors.concern[0]}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="budget">Rough Budget for Fixes (Optional)</Label>
                <Select name="budget">
                    <SelectTrigger className="input-precision">
                        <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="under-2500">Under $2,500</SelectItem>
                        <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                        <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10000+">$10,000+</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" className="w-full btn-precision" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                    </>
                ) : (
                    "Get Free Audit"
                )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
                We respect your inbox. No spam, ever.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
