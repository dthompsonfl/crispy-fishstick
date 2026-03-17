import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "neutral";
  children: React.ReactNode;
}

export function Callout({ type = "neutral", children }: CalloutProps) {
  const styles = {
    info: "bg-signal-info/10 border-signal-info/20 text-signal-info",
    warning: "bg-signal-warning/10 border-signal-warning/20 text-signal-warning",
    success: "bg-signal-success/10 border-signal-success/20 text-signal-success",
    neutral: "bg-secondary/50 border-border text-foreground",
  };

  const icons = {
    info: Info,
    warning: AlertCircle,
    success: CheckCircle,
    neutral: Info,
  };

  // Safe access with fallback
  const Icon = icons[type] || icons.neutral;
  const styleClass = styles[type] || styles.neutral;

  return (
    <div className={cn("my-6 flex gap-4 rounded-lg border p-4", styleClass)}>
      <Icon className="h-5 w-5 shrink-0 mt-0.5 opacity-80" />
      <div className="text-sm [&>p]:last:mb-0 [&>p]:leading-relaxed">{children}</div>
    </div>
  );
}
