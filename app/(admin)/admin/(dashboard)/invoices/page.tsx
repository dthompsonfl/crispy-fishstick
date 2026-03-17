import { requireAdmin } from "@/lib/admin/guards";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Receipt } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";
import { InvoiceFilters } from "@/components/admin/invoices/invoice-filters";
import { Prisma } from "@prisma/client";

import { parsePaginationParams, getPrismaParams, buildPaginationResult } from "@/lib/api/pagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

export const dynamic = "force-dynamic";

export default async function InvoicesPage(
  props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const searchParams = await props.searchParams;
  await requireAdmin({ permissions: ["invoices.read"] });

  const params = parsePaginationParams(new URLSearchParams(searchParams as Record<string, string>));
  const prismaParams = getPrismaParams(params);

  const where: Prisma.InvoiceWhereInput = {};

  if (searchParams.status && searchParams.status !== "all") {
    where.status = searchParams.status as string;
  }

  if (searchParams.search) {
    where.OR = [
      { number: { contains: searchParams.search as string } },
      { Tenant: { name: { contains: searchParams.search as string } } },
    ];
  }

  const invoices = await prisma.invoice.findMany({
    where,
    ...prismaParams,
    orderBy: { createdAt: "desc" },
    include: {
      Tenant: true,
    },
  });

  const { data, nextCursor, prevCursor } = buildPaginationResult(invoices, params);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Manage billing and invoices.</p>
        </div>
        <Button asChild>
          <Link href="/admin/invoices/new">
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Link>
        </Button>
      </div>

      <InvoiceFilters />

      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <CardDescription>
            A list of all invoices and their payment status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No invoices found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <Receipt className="h-4 w-4 text-muted-foreground" />
                            {invoice.number}
                        </div>
                    </TableCell>
                    <TableCell>{invoice.Tenant.name}</TableCell>
                    <TableCell>
                      <Badge variant={
                        invoice.status === "paid" ? "success" :
                        invoice.status === "overdue" ? "destructive" :
                        invoice.status === "sent" ? "info" : "outline"
                      }>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(invoice.totalAmount)}</TableCell>
                    <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                    <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/invoices/${invoice.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PaginationControls nextCursor={nextCursor} prevCursor={prevCursor} />
    </div>
  );
}
