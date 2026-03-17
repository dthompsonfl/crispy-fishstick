"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CloudTaxCalculator() {
  const [vcpuCount, setVcpuCount] = useState([8]);
  const [ramGb, setRamGb] = useState([32]);

  // Assumptions (Monthly)
  const CLOUD_VCPU_PRICE = 35; // Expensive cloud vCPU
  const CLOUD_RAM_PRICE = 8;
  const HARDWARE_PRICE_AMORTIZED = 45; // Fixed cost for owned metal equivalent (very rough)

  const cloudCost = (vcpuCount[0] * CLOUD_VCPU_PRICE) + (ramGb[0] * CLOUD_RAM_PRICE);
  const ownCost = HARDWARE_PRICE_AMORTIZED + (vcpuCount[0] * 2) + (ramGb[0] * 0.5); // Power + Maintenance

  const taxPercent = Math.round(((cloudCost - ownCost) / ownCost) * 100);

  return (
    <Card className="border-primary/20 my-8">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          Interactive Proof: The &quot;Rent&quot; Premium
          <Badge variant="outline" className="text-xs font-normal">Live Calc</Badge>
        </CardTitle>
        <CardDescription>
          Adjust resources to see the divergence between Cloud Rent and Hardware Ownership.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">vCPUs: {vcpuCount[0]}</label>
          </div>
          <Slider value={vcpuCount} onValueChange={setVcpuCount} min={2} max={64} step={2} />
        </div>

        <div className="space-y-4">
           <div className="flex justify-between">
            <label className="text-sm font-medium">RAM (GB): {ramGb[0]}</label>
          </div>
          <Slider value={ramGb} onValueChange={setRamGb} min={4} max={256} step={4} />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="p-4 bg-signal-danger/10 rounded-lg border border-signal-danger/20 text-center">
            <div className="text-xs uppercase text-muted-foreground mb-1">Cloud Monthly</div>
            <div className="text-2xl font-bold text-signal-danger">${cloudCost}</div>
          </div>
          <div className="p-4 bg-signal-success/10 rounded-lg border border-signal-success/20 text-center">
            <div className="text-xs uppercase text-muted-foreground mb-1">Own Monthly (Amortized)</div>
            <div className="text-2xl font-bold text-signal-success">${Math.round(ownCost)}</div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            You are paying a <span className="font-bold text-primary">{taxPercent}% premium</span> for flexibility you might not need.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
