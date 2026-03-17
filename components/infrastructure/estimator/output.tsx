"use client";

import { useState } from "react";
import { EstimatorResult } from "@/lib/infrastructure/estimator/schema";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, RefreshCcw } from "lucide-react";
import Link from "next/link";

interface EstimatorOutputProps {
  result: EstimatorResult;
  onReset: () => void;
}

export function EstimatorOutput({ result, onReset }: EstimatorOutputProps) {
  const [detailed, setDetailed] = useState(false);
  const { recommendedSpec, breakdown } = result;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-signal-success/20 shadow-2xl shadow-signal-success/5">
        <CardHeader className="bg-signal-success/10 pb-6 border-b border-signal-success/10">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-signal-success">Recommended Specification</CardTitle>
            <Badge variant="outline" className="bg-background text-foreground border-signal-success/50">
               Confidence: High
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">{recommendedSpec.cpuCores}</div>
              <div className="text-xs uppercase text-muted-foreground mt-1">Physical Cores</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{recommendedSpec.ramGB} <span className="text-lg">GB</span></div>
              <div className="text-xs uppercase text-muted-foreground mt-1">DDR5 RAM</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{recommendedSpec.storageGB} <span className="text-lg">GB</span></div>
              <div className="text-xs uppercase text-muted-foreground mt-1">NVMe Storage</div>
            </div>
             <div>
              <div className="text-3xl font-bold">{(recommendedSpec.gpuCount || 0) > 0 ? recommendedSpec.gpuCount : "-"}</div>
              <div className="text-xs uppercase text-muted-foreground mt-1">GPU ({recommendedSpec.gpuType || "N/A"})</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Switch id="transparency" checked={detailed} onCheckedChange={setDetailed} />
            <Label htmlFor="transparency" className="cursor-pointer font-medium">Transparency Mode</Label>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onReset}>
              <RefreshCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
            <Button asChild>
              <Link href={`/infrastructure/configurator?specs=${encodeURIComponent(JSON.stringify(recommendedSpec))}`}>
                Configure this Build <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {detailed && (
        <Card className="bg-muted/10 border-dashed">
          <CardHeader>
            <CardTitle className="text-lg">The Math (Proof of Work)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2 text-sm">Formulas Used:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {breakdown.formulas.map((f, i) => (
                  <li key={i} className="font-mono">{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-sm">Assumptions & Headroom:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {breakdown.assumptions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
                <li>Applied Headroom Factor: <span className="font-mono font-bold text-primary">x{result.headroomFactor}</span></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
