"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EstimatorWizardSchema, EstimatorWizardState, EstimatorResult } from "@/lib/infrastructure/estimator/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ArrowRight } from "lucide-react";
import { EstimatorOutput } from "./output";

export function EstimatorWizard() {
  const [result, setResult] = useState<EstimatorResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EstimatorWizardState>({
    resolver: zodResolver(EstimatorWizardSchema),
    defaultValues: {
      workloadType: "web_server",
      trafficPattern: "constant",
      userCount: 100,
      environment: "production",
      requestsPerSecond: 50,
      datasetSizeGB: 10,
    }
  });

  const workloadType = form.watch("workloadType");

  const onSubmit = async (data: EstimatorWizardState) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/infrastructure/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Estimation failed");

      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
      alert("Failed to calculate estimate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return <EstimatorOutput result={result} onReset={() => setResult(null)} />;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-primary/20">
      <CardHeader>
        <CardTitle>Workload Parameters</CardTitle>
        <CardDescription>
          We use these inputs to calculate hardware physics, not to upsell you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Workload Type</Label>
              <Select
                onValueChange={(val) => form.setValue("workloadType", val as any)}
                defaultValue={workloadType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web_server">Web Server</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="ai_ml">AI / ML Model</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Traffic Pattern</Label>
              <Select
                onValueChange={(val) => form.setValue("trafficPattern", val as any)}
                defaultValue="constant"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="constant">Constant (Steady)</SelectItem>
                  <SelectItem value="bursty">Bursty (Spikes)</SelectItem>
                  <SelectItem value="predictable_spikes">Predictable Spikes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Concurrent Users (Est)</Label>
              <Input
                type="number"
                {...form.register("userCount", { valueAsNumber: true })}
              />
              {form.formState.errors.userCount && (
                <p className="text-xs text-signal-danger">{form.formState.errors.userCount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Environment</Label>
              <Select
                onValueChange={(val) => form.setValue("environment", val as any)}
                defaultValue="production"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="dev">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t pt-4">
             <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wider">Specifics</h3>

             {workloadType === "web_server" && (
                <div className="space-y-2">
                  <Label>Requests Per Second (Peak)</Label>
                  <Input type="number" {...form.register("requestsPerSecond", { valueAsNumber: true })} />
                </div>
             )}

             {workloadType === "database" && (
                <div className="space-y-2">
                  <Label>Dataset Size (GB)</Label>
                  <Input type="number" {...form.register("datasetSizeGB", { valueAsNumber: true })} />
                </div>
             )}

             {workloadType === "ai_ml" && (
                <div className="space-y-2">
                  <Label>Model Size</Label>
                  <Select onValueChange={(val) => form.setValue("modelSizeParams", val as any)} defaultValue="medium">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                       <SelectItem value="medium">Medium (13B-30B)</SelectItem>
                       <SelectItem value="large">Large (30B-70B)</SelectItem>
                       <SelectItem value="xlarge">X-Large (70B+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
             )}
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : <>Calculate <ArrowRight className="ml-2 w-4 h-4" /></>}
            </Button>
          </div>

        </form>
      </CardContent>
    </Card>
  );
}
