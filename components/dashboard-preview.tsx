"use client";

import { motion } from "framer-motion";
import { Settings, BarChart3, Users, Globe, Edit3, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardPreview() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-background/95 backdrop-blur-sm">
      {/* Fake Browser Toolbar */}
      <div className="bg-muted/50 px-4 py-3 border-b border-border/50 flex items-center gap-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 bg-background/50 rounded-md px-3 py-1 text-xs text-muted-foreground font-mono flex justify-between items-center">
          <span>admin.yourbusiness.com/dashboard</span>
          <span className="flex items-center gap-1 text-green-500"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> Secure</span>
        </div>
      </div>

      <div className="flex h-[500px] md:h-[600px]">
        {/* Sidebar */}
        <div className="w-16 md:w-64 border-r border-border/50 bg-muted/10 p-4 flex flex-col gap-2">
          <div className="font-bold text-lg px-2 mb-6 hidden md:block">BusinessOS</div>

          {[
            { icon: BarChart3, label: "Overview", active: true },
            { icon: Edit3, label: "Content Editor" },
            { icon: Users, label: "Customers" },
            { icon: Globe, label: "SEO & Traffic" },
            { icon: Settings, label: "Settings" },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/50'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden md:block">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10 bg-background overflow-hidden relative">

           {/* Floating "Edit" Tooltips (Animated) */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.5 }}
             className="absolute top-20 right-20 bg-background border border-primary/20 shadow-lg p-4 rounded-xl z-20 max-w-xs"
           >
              <div className="flex items-start gap-3">
                 <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Edit3 className="w-4 h-4" />
                 </div>
                 <div>
                    <h4 className="font-semibold text-sm mb-1">Update Prices Instantly</h4>
                    <p className="text-xs text-muted-foreground">Change &quot;Consultation&quot; from $150 to $200 and hit save. Live in 1 second.</p>
                 </div>
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.5, duration: 0.5 }}
             className="absolute bottom-20 left-1/3 bg-background border border-primary/20 shadow-lg p-4 rounded-xl z-20 max-w-xs"
           >
              <div className="flex items-start gap-3">
                 <div className="bg-blue-500/10 p-2 rounded-full text-blue-500">
                    <ImageIcon className="w-4 h-4" />
                 </div>
                 <div>
                    <h4 className="font-semibold text-sm mb-1">Swap Hero Images</h4>
                    <p className="text-xs text-muted-foreground">Drag & drop new photos from your phone. No developer needed.</p>
                 </div>
              </div>
           </motion.div>


           {/* Mock Dashboard UI */}
           <div className="space-y-6 opacity-50 pointer-events-none filter blur-[1px]">
              <div className="flex justify-between items-end">
                 <div>
                    <h1 className="text-2xl font-bold">Good Morning, Owner</h1>
                    <p className="text-muted-foreground">Here is what&apos;s happening today.</p>
                 </div>
                 <Button>Create Post</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-secondary/30 rounded-xl border border-border/50" />
                 ))}
              </div>

              <div className="h-64 bg-secondary/30 rounded-xl border border-border/50" />
           </div>

           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="bg-background/80 backdrop-blur-md border border-border px-6 py-3 rounded-full font-mono text-sm shadow-sm">
                Live Preview Mode
              </span>
           </div>

        </div>
      </div>
    </div>
  );
}
