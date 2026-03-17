"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";
import { motion, useScroll, useSpring } from "framer-motion";

export function DesktopHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between relative z-50">
        <Link
            href="/"
            className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80 flex items-center gap-2"
        >
          {siteConfig.company}
          <span className="hidden lg:inline-block text-xs font-normal text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
             SMB
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="flex items-center gap-8">
          {siteConfig.mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-precision"
            >
              {link.title}
            </Link>
          ))}
          <div className="w-px h-6 bg-border mx-2" />
          <ThemeToggle />
          <Button asChild variant="default" className="rounded-full px-6 btn-precision">
            <Link href={siteConfig.cta.primary.href}>
              {siteConfig.cta.primary.text}
            </Link>
          </Button>
        </nav>
      </div>

      {/* Progress Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary origin-left"
        style={{ scaleX }}
      />
    </header>
  );
}
