import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "neutral";
  children: React.ReactNode;
}

export function Callout({ type = "neutral", children }: CalloutProps) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300",
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
