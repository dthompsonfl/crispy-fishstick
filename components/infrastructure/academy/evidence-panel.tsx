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
            {isTrue && <CheckCircle className="text-green-500 w-6 h-6" />}
            {isFalse && <AlertTriangle className="text-red-500 w-6 h-6" />}
            {!isTrue && !isFalse && <AlertTriangle className="text-yellow-500 w-6 h-6" />}
          </div>
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-muted-foreground">Truth Engine Verification</div>
            <h4 className="font-bold text-lg">&quot;{claim}&quot;</h4>

            <div className="py-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isTrue ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                isFalse ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" :
                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
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
