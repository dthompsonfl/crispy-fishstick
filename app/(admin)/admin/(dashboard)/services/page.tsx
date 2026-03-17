import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Server } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/lib/api/pagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

export const dynamic = "force-dynamic";

export default async function ServicesPage(
  props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["services.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const services = await prisma.service.findMany({
    ...prismaParams,
    orderBy: { createdAt: "desc" },
    include: {
      User: true,
      _count: {
        select: { Incident: true },
      },
    },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(services, params);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage microservices and infrastructure components.</p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Register Service
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Catalog</CardTitle>
          <CardDescription>
            Inventory of all technical services and their ownership.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Lifecycle</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Repo</TableHead>
                <TableHead>Incidents</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No services registered.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <Server className="h-4 w-4 text-muted-foreground" />
                            {service.name}
                        </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        service.lifecycle === "production" ? "default" :
                        service.lifecycle === "deprecated" ? "destructive" : "secondary"
                      }>
                        {service.lifecycle}
                      </Badge>
                    </TableCell>
                    <TableCell>{service.User?.name || "Unassigned"}</TableCell>
                    <TableCell>
                        {service.repoUrl ? (
                            <a href={service.repoUrl} target="_blank" rel="noopener noreferrer" className="text-signal-info hover:underline">
                                Link
                            </a>
                        ) : "-"}
                    </TableCell>
                    <TableCell>{service._count.Incident}</TableCell>
                    <TableCell>{formatDate(service.updatedAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/services/${service.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          
          <PaginationControls nextCursor={nextCursor} prevCursor={prevCursor} />
        </CardContent>
      </Card>
    </div>
  );
}
