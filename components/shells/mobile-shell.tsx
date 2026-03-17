"use client";

import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { PageTransition } from "@/components/page-transition";
import { ErrorBoundary } from "@/components/error-boundary";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileHeader() {
    return (
        <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
            <div className="flex items-center justify-between h-14 px-4">
                <Link href="/" className="text-base font-bold tracking-tight">
                    {siteConfig.company}
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
}

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:hidden flex flex-col min-h-screen pb-20 bg-muted/5">
       <MobileHeader />
       <PageTransition>
          <ErrorBoundary>
            <main className="flex-1 p-0">
                {/* Mobile often needs 0 padding at root to allow full-width heroes,
                    padding applied in page components */}
                {children}
            </main>
          </ErrorBoundary>
       </PageTransition>
       <MobileBottomNav />
    </div>
  );
}
