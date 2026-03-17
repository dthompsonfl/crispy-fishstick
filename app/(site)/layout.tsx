import { DesktopHeader } from "@/components/shells/desktop-header";
import { MobileHeader } from "@/components/shells/mobile-shell";
import { Footer } from "@/components/footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { PageTransition } from "@/components/page-transition";
import { ErrorBoundary } from "@/components/error-boundary";
import { SystemLayer } from "@/components/system-layer";
import { ConsoleHud } from "@/components/console-hud";
import { RouteTransitionLayer } from "@/components/route-transition-layer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Background system layer - Shared */}
      <SystemLayer />

      {/* Console HUD - Shared */}
      <ConsoleHud />

      {/* Route Transition Overlay - Shared */}
      <RouteTransitionLayer />

      <div className="flex flex-col min-h-screen bg-muted/5 md:bg-background">
         {/* Headers */}
         <div className="hidden md:block">
            <DesktopHeader />
         </div>
         <div className="md:hidden">
            <MobileHeader />
         </div>

         {/* Main Content - Single Render */}
         <PageTransition>
            <ErrorBoundary>
               {/* Mobile needs p-0 for edge-to-edge content, Desktop needs pt-20 for fixed header */}
               <main className="flex-1 p-0 md:pt-20">
                  {children}
               </main>
            </ErrorBoundary>
         </PageTransition>

         {/* Footers */}
         <div className="hidden md:block">
            <Footer />
         </div>
         <div className="md:hidden">
            <MobileBottomNav />
         </div>
      </div>
    </>
  );
}
