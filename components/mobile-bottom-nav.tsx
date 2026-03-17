"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Layers, CreditCard, Activity, MessageSquare } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { siteConfig } from "@/lib/site";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show on scroll up or at the very top
      if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/auth")) {
    return null;
  }

  // Map icon strings from config to actual components if needed, or just hardcode mapping here
  // tailored to the config I just wrote.
  const icons = {
    Home,
    Layers,
    CreditCard,
    Activity,
    MessageSquare
  };

  return (
    <div 
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/50 pb-safe transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {siteConfig.mobileNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = icons[item.icon as keyof typeof icons] || Home;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 active:scale-95 transition-transform duration-150 relative",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-tight">{item.title}</span>
              {isActive && (
                <span className="absolute top-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
