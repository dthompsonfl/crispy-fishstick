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
        "md:hidden fixed bottom-0 left-0 right-0 z-50 frosted-nav pb-safe transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-stretch justify-around h-16 px-1">
        {siteConfig.mobileNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = icons[item.icon as keyof typeof icons] || Home;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 min-h-[44px] py-2 gap-0.5",
                "rounded-xl mx-0.5 my-1 transition-all duration-150",
                "active:scale-[0.90] active:opacity-80",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vantus-sky)] focus-visible:ring-offset-1",
                isActive
                  ? "text-[var(--vantus-sky)]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Active pill indicator bar at top */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-0 left-1/2 -translate-x-1/2 rounded-full transition-all duration-200 h-[2px]",
                  isActive
                    ? "w-6 bg-[var(--vantus-sky)] opacity-100"
                    : "w-0 opacity-0"
                )}
              />
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={isActive ? "nav-icon-active" : ""}
              />
              <span className={cn(
                "text-[10px] tracking-tight font-medium",
                isActive ? "font-semibold" : ""
              )}>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
