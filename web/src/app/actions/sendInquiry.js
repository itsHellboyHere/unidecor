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
  phone: z.string().regex(/^[0-9+ ]{10,15}$/, "Enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { name, role, email, phone, message, contextType, productSlug, productTitle } = parsed.data;

  try {
    await resend.emails.send({
      from: "Unidecor Website <onboarding@resend.dev>",
      to: ["creatormonkstudios@gmail.com"],
      reply_to: email,
      subject:
        contextType === "product" && productTitle
          ? `Product Inquiry — ${productTitle}`
          : "New Inquiry — Unidecor",
      html: buildEmailTemplate({ name, role, email, phone, message, contextType, productTitle, productSlug }),
    });
    return { success: true };
  } catch (err) {
    console.error("Send inquiry failed:", err);
    return { success: false, error: "Server error. Please try again later." };
  }
}

/* ============================
   EMAIL TEMPLATE
============================ */
function buildEmailTemplate(data) {
  const isProduct = data.contextType === "product" && data.productTitle;
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Inquiry — Unidecor</title>
</head>
<body style="margin:0;padding:0;background-color:#f0ece6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0ece6;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a1814;border-radius:12px 12px 0 0;padding:32px 40px;text-align:left;">
              <img
                src="https://theunidecor.com/logo-footer.png"
                alt="Unidecor"
                height="30"
                style="display:block;height:30px;width:auto;filter:none;opacity:0.95;"
              />
              <p style="margin:16px 0 0;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.35);font-weight:600;">
                Premium Interior Surfaces
              </p>
            </td>
          </tr>

          <!-- ACCENT BAR -->
          <tr>
            <td style="background:#b08d57;height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;">

              <!-- SUBJECT LINE -->
              <h1 style="margin:0 0 6px;font-size:22px;font-weight:600;color:#1a1814;letter-spacing:-0.02em;line-height:1.2;">
                ${isProduct ? `Product Inquiry` : `New Website Inquiry`}
              </h1>
              <p style="margin:0 0 28px;font-size:13px;color:#999;letter-spacing:0.01em;">
                Submitted via theunidecor.com
              </p>

              ${isProduct ? `
              <!-- PRODUCT BADGE -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#f7f4ef;border-left:3px solid #b08d57;padding:12px 18px;border-radius:0 8px 8px 0;">
                    <p style="margin:0;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#b08d57;font-weight:700;">Product Inquiry</p>
                    <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#1a1814;">${data.productTitle}</p>
                    ${data.productSlug ? `<a href="https://theunidecor.com/products/${data.productSlug}" style="font-size:12px;color:#b08d57;text-decoration:none;">View Product →</a>` : ""}
                  </td>
                </tr>
              </table>
              ` : ""}

              <!-- DIVIDER LABEL -->
              <p style="margin:0 0 16px;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#bbb;font-weight:700;border-bottom:1px solid #f0ece6;padding-bottom:10px;">
                Contact Details
              </p>

              <!-- DETAILS TABLE -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                ${buildRow("Name", data.name)}
                ${buildRow("Role", data.role)}
                ${buildRow("Email", `<a href="mailto:${data.email}" style="color:#b08d57;text-decoration:none;">${data.email}</a>`)}
                ${buildRow("Phone", `<a href="tel:${data.phone}" style="color:#b08d57;text-decoration:none;">${data.phone}</a>`)}
              </table>

              <!-- MESSAGE -->
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#bbb;font-weight:700;border-bottom:1px solid #f0ece6;padding-bottom:10px;">
                Message
              </p>
              <div style="background:#faf8f5;border-radius:8px;padding:20px 22px;margin-bottom:32px;">
                <p style="margin:0;font-size:14px;color:#3a3a3a;line-height:1.75;white-space:pre-wrap;">${data.message}</p>
              </div>

              <!-- REPLY CTA -->
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:100px;background:#1a1814;">
                    <a href="mailto:${data.email}" style="display:inline-block;padding:12px 28px;font-size:13px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.04em;">
                      Reply to ${data.name} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f7f4ef;border-radius:0 0 12px 12px;padding:24px 40px;border-top:1px solid #ede8e0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#aaa;line-height:1.6;">
                      © ${year} Unidecor. All rights reserved.<br/>
                      <a href="https://theunidecor.com" style="color:#b08d57;text-decoration:none;">theunidecor.com</a>
                      &nbsp;·&nbsp;
                      <span style="color:#ccc;">236, New Arya Nagar, Ghaziabad, UP</span>
                    </p>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <p style="margin:0;font-size:10px;color:#ccc;letter-spacing:0.1em;text-transform:uppercase;text-align:right;">
                      Internal Notification
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
}

function buildRow(label, value) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f5f2ee;width:110px;vertical-align:top;">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#bbb;">${label}</span>
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f5f2ee;vertical-align:top;">
        <span style="font-size:14px;color:#2a2a2a;font-weight:500;">${value}</span>
      </td>
    </tr>
  `;
}