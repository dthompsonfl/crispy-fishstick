"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ConfiguratorState, ValidationResult } from "@/lib/infrastructure/configurator/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Zap, DollarSign, Server, Loader2, Save } from "lucide-react";

// Inline debounce for safety if not exists
function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const DEFAULT_STATE: ConfiguratorState = {
  cpuModel: "AMD Epyc 7763",
  ramGB: 64,
  storageDrives: [{ type: "NVMe", sizeGB: 1024, qty: 2 }],
  gpuCount: 0,
  networkSpeedGbps: 10,
  powerRedundancy: true,
};

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<ConfiguratorState>(DEFAULT_STATE);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load specs from estimator if present
  useEffect(() => {
    const specsParam = searchParams.get("specs");
    if (specsParam) {
      try {
        const specs = JSON.parse(specsParam);
        setState({
          cpuModel: specs.cpuCores > 32 ? "AMD Epyc 7763" : "Intel Xeon Gold",
          ramGB: specs.ramGB,
          storageDrives: [{ type: "NVMe", sizeGB: Math.round(specs.storageGB / 2), qty: 2 }],
          gpuCount: specs.gpuCount || 0,
          gpuType: specs.gpuType,
          networkSpeedGbps: specs.networkGbps,
          powerRedundancy: true,
        });
      } catch (e) {
        console.error("Failed to parse specs", e);
      }
    }
  }, [searchParams]);

  const debouncedState = useDebounceValue(state, 500);

  useEffect(() => {
    async function validate() {
      setIsValidating(true);
      try {
        const res = await fetch("/api/infrastructure/configurator/validate", {
           method: "POST",
           body: JSON.stringify(debouncedState),
        });
        const json = await res.json();
        setValidation(json);
      } catch (e) {
        console.error(e);
      } finally {
        setIsValidating(false);
      }
    }
    validate();
  }, [debouncedState]);

  const saveBuild = async () => {
     setIsSaving(true);
     try {
       const res = await fetch("/api/infrastructure/builds", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ state, validation }),
       });
       if (!res.ok) throw new Error("Save failed");
       const { code } = await res.json();
       window.location.href = `/c/${code}`;
     } catch (_e) {
       alert("Failed to save build");
     } finally {
       setIsSaving(false);
     }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
        {/* Main Config Area */}
        <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2 pb-12">
           <div className="space-y-4">
              <h2 className="text-xl font-bold">Core Hardware</h2>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 border rounded bg-card/50">
                    <label htmlFor="cpu-model" className="text-sm font-medium block mb-2">CPU Model</label>
                    <select
                      id="cpu-model"
                      className="w-full bg-background border rounded p-2"
                      value={state.cpuModel}
                      onChange={e => setState({...state, cpuModel: e.target.value})}
                    >
                       <option value="AMD Epyc 7763">AMD Epyc 7763 (64 Core)</option>
                       <option value="Intel Xeon Gold">Intel Xeon Gold (32 Core)</option>
                       <option value="Intel Atom">Intel Atom (Low Power)</option>
                    </select>
                 </div>

                 <div className="p-4 border rounded bg-card/50">
                    <label htmlFor="ram-gb" className="text-sm font-medium block mb-2">RAM (GB)</label>
                    <input
                      id="ram-gb"
                      type="range" min="8" max="1024" step="8"
                      className="w-full"
                      value={state.ramGB}
                      onChange={e => setState({...state, ramGB: parseInt(e.target.value)})}
                    />
                    <div className="text-right font-mono">{state.ramGB} GB</div>
                 </div>
              </div>

              <div className="p-4 border rounded bg-card/50">
                 <label htmlFor="gpu-count" className="text-sm font-medium block mb-2">Accelerators (GPU)</label>
                 <div className="flex gap-4 items-center">
                    <input
                      id="gpu-count"
                      type="number" min="0" max="8"
                      className="w-20 bg-background border rounded p-2"
                      value={state.gpuCount}
                      onChange={e => setState({...state, gpuCount: parseInt(e.target.value)})}
                    />
                    <span>units of</span>
                    <select
                      id="gpu-type"
                      className="bg-background border rounded p-2 flex-1"
                      value={state.gpuType || ""}
                      onChange={e => setState({...state, gpuType: e.target.value})}
                    >
                       <option value="">Select GPU...</option>
                       <option value="NVIDIA A100-80GB">NVIDIA A100 80GB</option>
                       <option value="NVIDIA A10G">NVIDIA A10G</option>
                       <option value="NVIDIA T4">NVIDIA T4</option>
                    </select>
                 </div>
              </div>
           </div>
        </div>

        {/* Persistent Context Panel */}
        <div className="border-l pl-8 space-y-6">
           <div className="sticky top-0 space-y-6">
              <div className="flex justify-between items-center">
                 <h2 className="font-semibold text-lg">Live Context</h2>
                 {isValidating && <Loader2 className="animate-spin w-4 h-4 text-muted-foreground" />}
              </div>

              <div className="space-y-4">
                 <Card>
                   <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-center">
                         <span className="text-sm text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4" /> Monthly</span>
                         <span className="text-xl font-mono font-bold">${validation?.metrics.totalCostMonthly || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-sm text-muted-foreground flex items-center gap-2"><Zap className="w-4 h-4" /> Power</span>
                         <span className="text-xl font-mono font-bold">{validation?.metrics.powerDrawWatts || 0} W</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-sm text-muted-foreground flex items-center gap-2"><Server className="w-4 h-4" /> Size</span>
                         <span className="text-xl font-mono font-bold">{validation?.metrics.rackUnitSize || 0} U</span>
                      </div>
                   </CardContent>
                 </Card>
              </div>

              <div className="space-y-2">
                 {validation?.hardBlocks.map((err, i) => (
                    <Alert key={i} variant="destructive">
                       <AlertCircle className="h-4 w-4" />
                       <AlertTitle>Invalid Config</AlertTitle>
                       <AlertDescription>{err}</AlertDescription>
                    </Alert>
                 ))}

                 {validation?.warnings.map((warn, i) => (
                    <Alert key={i} className="border-yellow-500/50 bg-yellow-500/10">
                       <AlertCircle className="h-4 w-4 text-yellow-500" />
                       <AlertTitle className="text-yellow-500">Warning</AlertTitle>
                       <AlertDescription className="text-yellow-600 dark:text-yellow-400">{warn}</AlertDescription>
                    </Alert>
                 ))}

                 {validation?.isValid && (
                    <Alert className="border-green-500/50 bg-green-500/10">
                       <CheckCircle className="h-4 w-4 text-green-500" />
                       <AlertTitle className="text-green-500">Valid Build</AlertTitle>
                       <AlertDescription className="text-green-600 dark:text-green-400">
                         Ready for reservation.
                       </AlertDescription>
                    </Alert>
                 )}
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!validation?.isValid || isSaving || isValidating}
                onClick={saveBuild}
              >
                 {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 w-4 h-4" />}
                 Save & Get Shortlink
              </Button>
           </div>
        </div>
    </div>
  );
}

export function Configurator() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="animate-spin w-8 h-8" /></div>}>
       <ConfiguratorContent />
    </Suspense>
  );
}
