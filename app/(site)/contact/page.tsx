"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { submitContact } from "@/app/actions";
import { Loader2, Mail, MapPin, Calendar } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors({});

    try {
        const result = await submitContact(formData);

        if (result.success) {
            setIsSuccess(true);
        } else {
            setErrors(result.errors || {});
        }
    } catch (e) {
        setErrors({ form: ["Something went wrong."] });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="container py-12 md:py-24 grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
      <div className="space-y-8">
          <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Let's Talk</h1>
              <p className="text-xl text-muted-foreground">
                  Ready to build something rigorous? Send us a message or book a time.
              </p>
          </div>

          <div className="space-y-6">
              <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">hello@vantus.systems</p>
                  </div>
              </div>
              <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                      <h3 className="font-semibold">Service Area</h3>
                      <p className="text-muted-foreground">
                          Based in US/EU. Remote-first.
                          <br/>We work with clients specifically in UTC-5 to UTC+1 timezones.
                      </p>
                  </div>
              </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="font-bold flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5" /> Book a call
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                  Skip the email tag. Grab 15 minutes on our calendar to discuss your project.
              </p>
              <Button variant="outline" className="btn-precision w-full bg-background">
                  View Calendar
              </Button>
          </div>
      </div>

      <Card className="card-precision h-fit">
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
          <CardDescription>We usually reply within 24 hours.</CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
              <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-signal-success mb-2">Message Sent</h3>
                  <p className="text-muted-foreground">We'll be in touch shortly.</p>
                  <Button onClick={() => setIsSuccess(false)} variant="link" className="mt-4">
                      Send another
                  </Button>
              </div>
          ) : (
            <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required className="input-precision" />
                    {errors.name && <p className="text-destructive text-xs">{errors.name[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required className="input-precision" />
                    {errors.email && <p className="text-destructive text-xs">{errors.email[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea id="message" name="message" className="min-h-[120px] input-precision" required />
                    {errors.message && <p className="text-destructive text-xs">{errors.message[0]}</p>}
                </div>

                <Button type="submit" className="w-full btn-precision" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                        </>
                    ) : (
                        "Send Message"
                    )}
                </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
