"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function VcpuCoreExplainer() {
  return (
    <Card className="my-8 overflow-hidden">
      <CardHeader className="bg-muted/30 pb-2">
        <CardTitle className="text-lg">Visualizer: What are you actually getting?</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="vcpu" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-background p-0">
            <TabsTrigger
              value="vcpu"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/10 px-6 py-3"
            >
              Cloud vCPU
            </TabsTrigger>
            <TabsTrigger
              value="core"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-muted/10 px-6 py-3"
            >
              Physical Core
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vcpu" className="p-6 space-y-4">
            <div className="flex gap-1 justify-center py-8">
              <div className="w-16 h-32 bg-blue-500/40 border-2 border-dashed border-blue-500 rounded flex items-center justify-center text-xs text-center p-1">
                Thread A<br/>(Your App)
              </div>
              <div className="w-4 h-32 flex items-center justify-center text-muted-foreground">
                vs
              </div>
              <div className="w-16 h-32 bg-red-500/40 border-2 border-dashed border-red-500 rounded flex items-center justify-center text-xs text-center p-1">
                Thread B<br/>(Neighbor)
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              A vCPU is usually a single hyperthread. If the &quot;noisy neighbor&quot; on the other thread spikes, your performance tanks. You share the L1/L2 cache and execution units.
            </p>
          </TabsContent>

          <TabsContent value="core" className="p-6 space-y-4">
            <div className="flex justify-center py-8">
              <div className="w-40 h-32 bg-green-500/20 border-2 border-green-500 rounded flex flex-col items-center justify-center p-2">
                <span className="font-bold text-green-500 mb-2">Physical Core</span>
                <div className="flex gap-2 w-full justify-center">
                  <div className="w-12 h-16 bg-green-500/40 rounded flex items-center justify-center text-[10px]">Thread 1</div>
                  <div className="w-12 h-16 bg-green-500/40 rounded flex items-center justify-center text-[10px]">Thread 2</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              With a physical core, you own the entire execution pipeline and L1/L2 cache. No neighbors fighting for resources. Predictable, sustained performance.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
