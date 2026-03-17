"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { PenTool } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";

interface ContractSignatureProps {
  contractId: string;
  status: string;
  signedBy?: string | null;
  signedAt?: string | null;
}

export function ContractSignature({ contractId, status, signedBy, signedAt }: ContractSignatureProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [open, setOpen] = useState(false);

  if (status === "active" && signedBy) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            Signed & Active
          </CardTitle>
          <CardDescription className="text-green-700">
            This contract was signed by <strong>{signedBy}</strong> on {new Date(signedAt!).toLocaleDateString()}.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (status !== "pending_signature" && status !== "draft") {
    return null;
  }

  const handleSign = async () => {
    if (!signerName) return;

    try {
      setLoading(true);
      const res = await fetchWithCsrf(`/api/admin/contracts/${contractId}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "active",
          signedBy: signerName,
          signedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to sign");
      
      toast.success("Contract signed successfully");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign contract");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Electronic Signature</CardTitle>
        <CardDescription>
          This contract requires a signature to become active.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <PenTool className="mr-2 h-4 w-4" />
              Sign Contract
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign Contract</DialogTitle>
              <DialogDescription>
                By signing this, you agree to the terms and conditions outlined in the contract.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Type your full name to sign"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSign} disabled={!signerName || loading}>
                {loading ? "Signing..." : "Confirm Signature"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
