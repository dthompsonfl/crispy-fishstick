"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface EvidencePanelProps {
  claim: string;
  verdict: "true" | "false" | "nuanced";
  dataPoint: string;
  source: string;
}

export function EvidencePanel({ claim, verdict, dataPoint, source }: EvidencePanelProps) {
  const isTrue = verdict === "true";
  const isFalse = verdict === "false";

  return (
    <Card className="my-8 border-l-4 border-l-primary bg-muted/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            {isTrue && <CheckCircle className="text-signal-success w-6 h-6" />}
            {isFalse && <AlertTriangle className="text-signal-danger w-6 h-6" />}
            {!isTrue && !isFalse && <AlertTriangle className="text-yellow-500 w-6 h-6" />}
          </div>
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-muted-foreground">Truth Engine Verification</div>
            <h4 className="font-bold text-lg">&quot;{claim}&quot;</h4>

            <div className="py-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isTrue ? "bg-signal-success/10 text-signal-success dark:bg-signal-success/90 dark:text-signal-success" :
                isFalse ? "bg-signal-danger/10 text-signal-danger dark:bg-signal-danger/90 dark:text-signal-danger" :
                "bg-signal-warning/10 text-signal-warning dark:bg-signal-warning/90 dark:text-signal-warning"
              }`}>
                Verdict: {verdict.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-foreground/90 font-medium">
              Evidence: {dataPoint}
            </p>
            <p className="text-xs text-muted-foreground">
              Source: {source}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
