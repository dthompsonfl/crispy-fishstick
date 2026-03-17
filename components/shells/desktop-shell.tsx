"use client";

import { DesktopHeader } from "@/components/shells/desktop-header";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { ErrorBoundary } from "@/components/error-boundary";

export function DesktopShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden md:flex flex-col min-h-screen">
       <DesktopHeader />
       <PageTransition>
          <ErrorBoundary>
            <main className="flex-1 pt-20">
                {children}
            </main>
          </ErrorBoundary>
       </PageTransition>
       <Footer />
    </div>
  );
}
