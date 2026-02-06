"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ============================
   VALIDATION SCHEMA
============================ */
const InquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(1, "Please select your professional role"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .regex(/^[0-9+ ]{10,15}$/, "Enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),

  // context (optional but important)
  contextType: z.string().optional(),
  productSlug: z.string().optional(),
  productTitle: z.string().optional(),
});

/* ============================
   SERVER ACTION
============================ */
export async function sendInquiry(formData) {
  const rawData = Object.fromEntries(formData.entries());

  const parsed = InquirySchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    name,
    role,
    email,
    phone,
    message,
    contextType,
    productSlug,
    productTitle,
  } = parsed.data;

  try {
    await resend.emails.send({
      from: "Unidecor Website <onboarding@resend.dev>",
      to: ["creatormonkstudios@gmail.com"], 
      reply_to: email,
      subject:
        contextType === "product" && productTitle
          ? `Product Inquiry — ${productTitle}`
          : "New Inquiry — Unidecor",
      html: buildEmailTemplate({
        name,
        role,
        email,
        phone,
        message,
        contextType,
        productTitle,
        productSlug,
      }),
    });

    return { success: true };
  } catch (err) {
    console.error("Send inquiry failed:", err);
    return {
      success: false,
      error: "Server error. Please try again later.",
    };
  }
}

/* ============================
   EMAIL TEMPLATE (UNIDECOR)
============================ */
function buildEmailTemplate(data) {
  return `
  <div style="background:#f6f6f5;padding:40px;font-family:Arial,sans-serif;">
    <div style="max-width:640px;margin:auto;background:#ffffff;border:1px solid #eee;padding:32px;">
      
      <h2 style="margin:0 0 16px;color:#111;">
        New Inquiry — Unidecor
      </h2>

      ${
        data.contextType === "product" && data.productTitle
          ? `
            <p style="font-size:14px;color:#555;margin-bottom:16px;">
              <strong>Product:</strong> ${data.productTitle}
            </p>
          `
          : ""
      }

      <table style="width:100%;font-size:14px;color:#333;border-collapse:collapse;">
        <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Role</strong></td><td>${data.role}</td></tr>
        <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
      </table>

      <div style="margin-top:24px;padding:16px;background:#f7f6f4;">
        <strong style="display:block;margin-bottom:8px;">Message</strong>
        <p style="margin:0;white-space:pre-wrap;">${data.message}</p>
      </div>

      <p style="margin-top:32px;font-size:12px;color:#999;">
        Submitted via unidecor.in
      </p>
    </div>
  </div>
  `;
}