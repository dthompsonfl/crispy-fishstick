import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminFeatureHighlightProps {
  icon: LucideIcon;
  title: string;
  description: string;
  timeSaved: string;
  className?: string;
}

export function AdminFeatureHighlight({ icon: Icon, title, description, timeSaved, className }: AdminFeatureHighlightProps) {
  return (
    <div className={cn("flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-secondary/20 border border-border/50 items-start md:items-center", className)}>
      <div className="shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="w-7 h-7" />
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="shrink-0 bg-background border border-border px-4 py-2 rounded-lg text-center min-w-[120px]">
         <div className="text-xs text-muted-foreground uppercase font-semibold mb-0.5">Time Saved</div>
         <div className="text-signal-success font-bold">{timeSaved}</div>
      </div>
    </div>
  );
}
