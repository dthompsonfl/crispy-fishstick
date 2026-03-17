"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash, CheckCircle, XCircle, Mail, Printer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";
import { useAdmin } from "@/hooks/useAdmin";

interface ProposalActionsProps {
  proposalId: string;
  currentStatus: string;
}

export function ProposalActions({ proposalId, currentStatus }: ProposalActionsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { hasPermission } = useAdmin();
  const [isLoading, setIsLoading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const updateStatus = async (status: string) => {
    setIsLoading(true);
    try {
      const response = await fetchWithCsrf(`/api/admin/proposals/${proposalId}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      toast({
        title: "Status Updated",
        description: `Proposal status updated to ${status}`,
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProposal = async () => {
    if (!confirm("Are you sure you want to delete this proposal?")) return;

    setIsLoading(true);
    try {
      const response = await fetchWithCsrf(`/api/admin/proposals/${proposalId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete proposal");

      toast({
        title: "Deleted",
        description: "Proposal deleted",
      });
      router.push("/admin/proposals");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete proposal",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 print:hidden">
      <Button variant="outline" size="sm" onClick={handlePrint}>
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      {currentStatus === "draft" && hasPermission("proposals.edit") && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            updateStatus("pending_approval");
            toast({ title: "Sent", description: "Proposal sent to client for approval." });
          }}
          disabled={isLoading}
        >
          <Mail className="mr-2 h-4 w-4" />
          Send to Client
        </Button>
      )}
      
      {currentStatus === "sent" && hasPermission("proposals.edit") && (
        <>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-green-600 hover:text-green-700"
            onClick={() => updateStatus("approved")}
            disabled={isLoading}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={() => updateStatus("rejected")}
            disabled={isLoading}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </>
      )}

      {hasPermission("proposals.delete") && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={isLoading}>
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              className="text-destructive"
              onClick={deleteProposal}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Proposal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
