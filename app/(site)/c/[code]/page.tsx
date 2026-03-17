import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";


interface SavedBuildPageProps {
  params: Promise<{
    code: string;
  }>;
}

export const metadata = {
  title: "Saved Build | Vantus Systems",
};

export default async function SavedBuildPage(props: SavedBuildPageProps) {
  const params = await props.params;
  const build = await prisma.infraBuild.findUnique({
    where: { code: params.code }
  });

  if (!build) {
    notFound();
  }

  const isExpired = build.expiresAt < new Date();
  const state = JSON.parse(build.skuSnapshotJson);
  const validation = JSON.parse(build.optionsSnapshotJson);

  return (
    <div className="container py-24">
      <Link href="/infrastructure/configurator" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Configurator
      </Link>

      <div className="flex justify-between items-start mb-12">
        <div className="space-y-2">
           <h1 className="text-4xl font-bold tracking-tight">Build #{build.code}</h1>
           <p className="text-muted-foreground">Snapshot created {formatDistanceToNow(build.createdAt)} ago</p>
        </div>
        <div>
           {isExpired ? (
             <Badge variant="destructive" className="text-lg px-4 py-1">Expired</Badge>
           ) : (
             <Badge variant="outline" className="text-lg px-4 py-1 border-signal-success text-signal-success">
               <Clock className="w-4 h-4 mr-2" />
               Valid for {formatDistanceToNow(build.expiresAt)}
             </Badge>
           )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
         <div className="md:col-span-2 space-y-8">
            <Card>
               <CardHeader>
                  <CardTitle>Configuration</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <div className="text-sm text-muted-foreground">CPU Model</div>
                        <div className="font-semibold">{state.cpuModel}</div>
                     </div>
                     <div>
                        <div className="text-sm text-muted-foreground">RAM</div>
                        <div className="font-semibold">{state.ramGB} GB</div>
                     </div>
                     <div>
                        <div className="text-sm text-muted-foreground">Storage</div>
                        <div className="font-semibold">
                           {state.storageDrives.map((d: any, i: number) => (
                             <div key={i}>{d.qty}x {d.sizeGB}GB {d.type}</div>
                           ))}
                        </div>
                     </div>
                     <div>
                        <div className="text-sm text-muted-foreground">Network</div>
                        <div className="font-semibold">{state.networkSpeedGbps} Gbps</div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Validation Proof</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 text-signal-success">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Configuration Validated</span>
                     </div>
                     <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="text-center">
                           <div className="text-xs uppercase text-muted-foreground">Monthly</div>
                           <div className="font-mono font-bold">${validation.metrics.totalCostMonthly}</div>
                        </div>
                        <div className="text-center">
                           <div className="text-xs uppercase text-muted-foreground">Power</div>
                           <div className="font-mono font-bold">{validation.metrics.powerDrawWatts} W</div>
                        </div>
                        <div className="text-center">
                           <div className="text-xs uppercase text-muted-foreground">Size</div>
                           <div className="font-mono font-bold">{validation.metrics.rackUnitSize} U</div>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="space-y-6">
            <div className="p-6 border rounded-xl bg-card/50 space-y-6">
               <h3 className="font-semibold text-lg">Actions</h3>
               <Button className="w-full" size="lg" disabled={isExpired}>
                  Reserve Hardware (15m)
               </Button>
               <Button variant="outline" className="w-full" asChild>
                  <Link href={`/infrastructure/configurator?specs=${encodeURIComponent(JSON.stringify({ cpuCores: 0, ramGB: state.ramGB, storageGB: 0, networkGbps: state.networkSpeedGbps }))}`}>
                     Open in Configurator <ExternalLink className="ml-2 w-4 h-4" />
                  </Link>
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
}
