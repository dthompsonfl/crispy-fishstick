"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HeroBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={cn(
        "inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-md",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
