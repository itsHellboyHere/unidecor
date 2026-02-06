import { Suspense } from "react";
import ContactForm from "./comp/ContactForm";

export const metadata = {
  title: "Contact Unidecor | Get in Touch for Interior Solutions",
  description:
    "Contact Unidecor for premium laminates, wall panels, and interior surface solutions. Reach out for product inquiries, partnerships, or project support across India.",
  keywords: [
    "Contact Unidecor",
    "Unidecor contact",
    "Interior laminates enquiry",
    "Wall panels supplier",
    "Interior surface solutions India",
  ],
  openGraph: {
    title: "Contact Unidecor | Interior Surface Solutions",
    description:
      "Have a question or project in mind? Contact Unidecor for expert guidance on laminates, wall panels, and premium interior materials.",
    url: "https://www.unidecor.com/contact",
    siteName: "Unidecor",
    images: [
      {
        url: "/og-default.webp",
        width: 1200,
        height: 630,
        alt: "Contact Unidecor – Interior Surface Solutions",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://www.unidecor.com/contact",
  },
};

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}