// src/app/layout.js
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar.server";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { getNavbarData } from "./lib/sanity/navbar";
import FooterServer from "./components/Footer.server";


const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["500", "600"],
});

export const metadata = {
  metadataBase: new URL("https://www.theunidecor.com"),

  title: {
    default: "Unidecor | Premium Laminates & Interior Surfaces",
    template: "%s | Unidecor",
  },

  description:
    "Unidecor offers premium laminates, louvers, acrylic surfaces, and interior materials backed by 20+ years of industry expertise.",

  keywords: [
    "laminates",
    "acrylic laminates",
    "interior surfaces",
    "decorative laminates",
    "louvers",
    "interior materials",
    "Unidecor",
  ],

  openGraph: {
    type: "website",
    siteName: "Unidecor",
    url: "https://www.theunidecor.com",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Unidecor – Premium Interior Surfaces",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default async function RootLayout({ children }) {
  const navigation = await getNavbarData();
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable}`}>
        {/* <CustomCursor/> */}
       <Navbar />
        {children}
        <WhatsAppFloat/>
        <FooterServer data={navigation} />
      </body>
    </html>
  );
}