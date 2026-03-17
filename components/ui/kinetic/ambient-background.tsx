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
       {/* Top Center Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen"
      />

      {/* Bottom Left Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-signal-success/10 blur-[100px] rounded-full mix-blend-screen"
      />
    </div>
  );
}
