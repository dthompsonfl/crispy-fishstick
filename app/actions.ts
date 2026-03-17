"use server";

import { z } from "zod";

const auditSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  url: z.string().optional(),
  concern: z.string().min(1, "Please tell us your top concern"),
  budget: z.string().optional(),
});

export async function submitAudit(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    url: formData.get("url"),
    concern: formData.get("concern"),
    budget: formData.get("budget"),
  };

  const result = auditSchema.safeParse(rawData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  // Simulator delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, send email or save to DB
  console.log("Audit Request:", result.data);

  return { success: true, message: "Audit request received. We'll be in touch shortly." };
}

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export async function submitContact(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  // Simulator delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Contact Request:", result.data);

  return { success: true, message: "Message sent. We'll get back to you soon." };
}
