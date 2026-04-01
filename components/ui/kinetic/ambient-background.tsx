"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AmbientBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Top-center sky glow — stronger in light mode for visible depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
        className="absolute top-[-25%] left-[10%] w-[80%] h-[70%] rounded-full blur-[140px] ambient-orb-sky-top"
      />

      {/* Right-side navy depth anchor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.4 }}
        className="absolute top-[0%] right-[-15%] w-[50%] h-[60%] rounded-full blur-[120px] ambient-orb-navy-right"
      />

      {/* Bottom-left warm accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full blur-[110px] ambient-orb-sky-bottom"
      />

      {/* Dark-mode extra depth — invisible in light mode */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.3 }}
        className="absolute top-[5%] left-[40%] w-[60%] h-[50%] rounded-full blur-[160px] ambient-orb-dark-sky dark:opacity-[1] opacity-0"
      />
    </div>
  );
}
