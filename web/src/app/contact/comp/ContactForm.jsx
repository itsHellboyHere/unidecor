"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { sendInquiry } from "@/app/actions/sendInquiry";
import styles from "@/app/contact/css/Contact.module.css";

export default function ContactForm() {
  const searchParams = useSearchParams();

  const contextType = searchParams.get("type") || "general";
  const productSlug = searchParams.get("slug") || "";
  const productTitle = searchParams.get("title") || "";

  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

async function handleSubmit(e) {
  e.preventDefault();
  setPending(true);
  setErrors({});
  setStatus(null);

  const formData = new FormData(e.target);
  const result = await sendInquiry(formData);

  setPending(false);

  if (result.success) {
    setStatus("success");

    //  WhatsApp message
    const message = `
New Inquiry from Unidecor Website:

Name: ${formData.get("name")}
Role: ${formData.get("role")}
Email: ${formData.get("email")}
Phone: ${formData.get("phone")}
Context: ${formData.get("contextType")}
Product: ${formData.get("productTitle") || "General"}

Message:
${formData.get("message")}
`;

  const encodedMessage = encodeURIComponent(message);

const whatsappNumber = "917004671676";
window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    e.target.reset();
  } else if (result.errors) {
    setErrors(result.errors);
  } else {
    setStatus("error");
  }
}

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>

        {/* LEFT */}
        <div className={styles.leftSide}>
          <span className={styles.kicker}>
            {contextType === "product" ? "Product Inquiry" : "Direct Partnership"}
          </span>

          <h1 className={styles.title}>
            Let’s discuss your <span>project.</span>
          </h1>

          {contextType === "product" && productTitle && (
            <div className={styles.productContext}>
              Inquiry for: <strong>{productTitle}</strong>
            </div>
          )}

          <form className={styles.formStyle} onSubmit={handleSubmit}>
            {/* hidden context */}
            <input type="hidden" name="contextType" value={contextType} />
            <input type="hidden" name="productSlug" value={productSlug} />
            <input type="hidden" name="productTitle" value={productTitle} />

            <div className={styles.row}>
              <Input label="Full Name" name="name" error={errors.name} />
              <Select
                label="Professional Role"
                name="role"
                options={[
                  "Architect / Interior Designer",
                  "Dealer / Distributor",
                  "Contractor",
                  "Homeowner",
                ]}
                error={errors.role}
              />
            </div>

            <div className={styles.row}>
              <Input label="Email" name="email" error={errors.email} />
              <Input label="Phone" name="phone" error={errors.phone} />
            </div>

            <Textarea
              label="Project Details"
              name="message"
              error={errors.message}
              placeholder={
                contextType === "product"
                  ? "Mention quantity, application area, city…"
                  : "Tell us about your requirement…"
              }
            />

            <button disabled={pending} className={styles.submitBtn}>
              {pending ? (
                <>
                  Processing <Loader2 className={styles.spin} size={16} />
                </>
              ) : (
                <>
                  Submit Inquiry <Send size={16} />
                </>
              )}
            </button>

            {status === "success" && (
              <p className={styles.successMsg}>
                Inquiry sent. Our team will contact you shortly.
              </p>
            )}

            {status === "error" && (
              <p className={styles.errorMsg}>
                <AlertCircle size={14} /> Something went wrong.
              </p>
            )}
          </form>
        </div>


        {/* RIGHT */}
        <aside className={styles.infoSide}>
          {/* PRESENCE */}
          <div className={styles.block}>
            <span className={styles.blockTitle}>Our Presence</span>

            <div className={styles.locationItem}>
              <MapPin size={20} />
              <div>
                <strong>Head Office</strong>
                <span>236, New Arya Nagar, Ghaziabad, UP</span>
              </div>
            </div>

            <div className={styles.locationItem}>
              <MapPin size={20} />
              <div>
                <strong>Experience Center</strong>
                <span>236, New Arya Nagar, Ghaziabad, UP</span>
              </div>
            </div>
          </div>

          {/* NETWORK */}
          <div className={styles.block}>
            <span className={styles.blockTitle}>Pan-India Network</span>
            <p className={styles.networkText}>
              Timely delivery and dependable support across major cities through our distribution partners.
            </p>
          </div>

          {/* CALL TO ACTION */}
          <div className={styles.ctaBlock}>
            <span className={styles.ctaTitle}>Transform your space</span>
            <p className={styles.ctaSub}>Talk to our experts today.</p>

            <a href="tel:+918527555909" className={styles.ctaItem}>
              <Phone size={16} />
              <span>+91 85275 55909</span>
            </a>

            <a href="tel:+919810166841" className={styles.ctaItem}>
              <Phone size={16} />
              <span>+91 98101 66841</span>
            </a>
            <a href="tel:+918527355586" className={styles.ctaItem}>
              <Phone size={16} />
              <span>+91 85273 55586</span>
            </a>

            <a href="mailto:info@theunidecor.com" className={styles.ctaItem}>
              <Mail size={16} />
              <span>info@theunidecor.com</span>
            </a>

            <div className={styles.ctaItem}>
              <span className={styles.ctaLabel}>Website</span>
              <a href="https://www.theunidecor.com"
              target="_blank"
              ><span>www.theunidecor.com</span></a>
            </div>

            <div className={styles.ctaItem}>
              <a
                href="https://wa.me/918527555909"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaItem}
              >
                <span className={styles.ctaLabel}>WhatsApp</span>
                <span>+91 8527555909</span>
              </a>
           
           
            </div>
            <div className={styles.ctaItem}>
   <a
                href="https://wa.me/919810166841"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaItem}
              >
                <span className={styles.ctaLabel}>WhatsApp</span>
                <span>+91 9810166841</span>
              </a>
            </div>
            <div className={styles.ctaItem}>
   <a
                href="https://wa.me/918527355586"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaItem}
              >
                <span className={styles.ctaLabel}>WhatsApp</span>
                <span>+91 8527355586</span>
              </a>
            </div>
            <p className={styles.ctaFootnote}>
              Visit us to explore products firsthand and receive expert guidance.
            </p>
          </div>

          {/* TRUST */}
          <div className={styles.trustStrip}>
            <ShieldCheck size={20} />
            <span>Quality sourcing & reliable logistics</span>
          </div>
        </aside>

      </div>
    </main>
  );
}

/* ---------- helpers ---------- */

function Input({ label, name, error }) {
  return (
    <div className={styles.inputGroup}>
      <label>{label}</label>
      <input name={name} />
      {error && <span className={styles.error}>{error[0]}</span>}
    </div>
  );
}

function Textarea({ label, name, error, placeholder }) {
  return (
    <div className={styles.inputGroup}>
      <label>{label}</label>
      <textarea name={name} rows={4} placeholder={placeholder} />
      {error && <span className={styles.error}>{error[0]}</span>}
    </div>
  );
}

function Select({ label, name, options, error }) {
  return (
    <div className={styles.inputGroup}>
      <label>{label}</label>
      <select name={name}>
        <option value="">Select</option>
        {options.map(o => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {error && <span className={styles.error}>{error[0]}</span>}
    </div>
  );
}