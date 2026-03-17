"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, Trash, Wand2 } from "lucide-react";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";

const proposalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["draft", "pending_approval", "approved", "rejected", "sent"]),
  clientEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  content: z.string().optional(),
  validUntil: z.string().optional(),
  items: z.array(z.object({
    description: z.string().min(1, "Description is required"),
    hours: z.number().min(0, "Hours must be non-negative"),
    rate: z.number().min(0, "Rate must be non-negative"),
  })).min(1, "At least one item is required"),
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

const TEMPLATES = [
  {
    name: "Web Development",
    data: {
      title: "Web Development Project",
      content: "Full-stack web development services including frontend implementation, backend API development, and database design.",
      items: [
        { description: "Frontend Development", hours: 40, rate: 120 },
        { description: "Backend API Development", hours: 30, rate: 130 },
        { description: "Database Design", hours: 10, rate: 140 },
      ]
    }
  },
  {
    name: "SEO Audit",
    data: {
      title: "Comprehensive SEO Audit",
      content: "Technical SEO audit, keyword research, and competitor analysis.",
      items: [
        { description: "Technical Site Audit", hours: 8, rate: 150 },
        { description: "Keyword Research", hours: 6, rate: 150 },
        { description: "Competitor Analysis", hours: 4, rate: 150 },
      ]
    }
  },
  {
    name: "Consulting Retainer",
    data: {
      title: "Monthly Strategic Consulting",
      content: "Ongoing strategic advice and technical consultation.",
      items: [
        { description: "Weekly Strategy Calls", hours: 4, rate: 200 },
        { description: "Technical Review", hours: 6, rate: 200 },
      ]
    }
  }
];

export function ProposalForm({ initialData }: { initialData?: {
  id?: string;
  title?: string;
  status?: string;
  clientEmail?: string;
  content?: string;
  validUntil?: string;
  items?: Array<{
    description: string;
    hours: number;
    rate: number;
  }>;
} }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: initialData ? {
      title: initialData.title || "",
      status: (initialData.status as "draft" | "pending_approval" | "approved" | "rejected" | "sent") || "draft",
      clientEmail: initialData.clientEmail || "",
      content: initialData.content || "",
      validUntil: initialData.validUntil || "",
      items: initialData.items || [{ description: "", hours: 0, rate: 0 }],
    } : {
      title: "",
      status: "draft",
      clientEmail: "",
      content: "",
      validUntil: "",
      items: [{ description: "", hours: 0, rate: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");
  const totalAmount = items.reduce((sum, item) => sum + (item.hours * item.rate), 0);

  const applyTemplate = (templateName: string) => {
    const template = TEMPLATES.find(t => t.name === templateName);
    if (template) {
      setValue("title", template.data.title);
      setValue("content", template.data.content);
      setValue("items", template.data.items);
      toast({
        title: "Template Applied",
        description: `Applied ${templateName} template.`,
      });
    }
  };

  async function onSubmit(data: any) {
    setIsLoading(true);

    try {
      const url = initialData 
        ? `/api/admin/proposals/${initialData.id}` 
        : "/api/admin/proposals";
      const method = initialData ? "PATCH" : "POST";

      const response = await fetchWithCsrf(url, {
        method,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create proposal");
      }

      toast({
        title: "Success",
        description: "Proposal created successfully",
      });

      router.push("/admin/proposals");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Proposal Details</CardTitle>
            <CardDescription>
              Create a new proposal for a potential client.
            </CardDescription>
          </div>
          <Select onValueChange={applyTemplate}>
            <SelectTrigger className="w-[200px]">
              <Wand2 className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Load Template" />
            </SelectTrigger>
            <SelectContent>
              {TEMPLATES.map(t => (
                <SelectItem key={t.name} value={t.name}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} placeholder="Proposal Title" />
              {errors.title && (
                <p className="text-sm text-signal-danger">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input id="clientEmail" {...register("clientEmail")} placeholder="client@example.com" type="email" />
              {errors.clientEmail && (
                <p className="text-sm text-signal-danger">{errors.clientEmail.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input id="validUntil" type="date" {...register("validUntil")} />
              {errors.validUntil && (
                <p className="text-sm text-signal-danger">{errors.validUntil.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Proposal Content / Overview</Label>
            <Textarea 
              id="content" 
              {...register("content")} 
              placeholder="Describe the proposal details..." 
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Line Items</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => append({ description: "", hours: 0, rate: 0 })}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
            
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-6 space-y-2">
                  <Label className="text-xs">Description</Label>
                  <Input {...register(`items.${index}.description`)} placeholder="Item description" />
                  {errors.items?.[index]?.description && (
                    <p className="text-xs text-signal-danger">{errors.items[index]?.description?.message}</p>
                  )}
                </div>
                <div className="col-span-2 space-y-2">
                  <Label className="text-xs">Hours</Label>
                  <Input 
                    type="number" 
                    {...register(`items.${index}.hours`, { valueAsNumber: true })} 
                  />
                  {errors.items?.[index]?.hours && (
                    <p className="text-xs text-signal-danger">{errors.items[index]?.hours?.message}</p>
                  )}
                </div>
                <div className="col-span-2 space-y-2">
                  <Label className="text-xs">Rate ($)</Label>
                  <Input 
                    type="number" 
                    {...register(`items.${index}.rate`, { valueAsNumber: true })} 
                  />
                  {errors.items?.[index]?.rate && (
                    <p className="text-xs text-signal-danger">{errors.items[index]?.rate?.message}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                    <Trash className="h-4 w-4 text-signal-danger" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalAmount)}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Proposal
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
