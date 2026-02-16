// src/app/layout.js
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar.server";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { getNavbarData } from "./lib/sanity/navbar";
import FooterServer from "./components/Footer.server";
import CampaignBanner from "./components/CampaignBanner";
import CustomCursor from "./components/CustomCursor";


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
  metadataBase: new URL("https://theunidecor.com"),

  title: {
    default: "Unidecor | Premium Laminates & Interior Surfaces",
    template: "%s | Unidecor",
  },

  description:
    "Unidecor offers premium laminates, louvers, acrylic surfaces, and interior materials backed by 1g0+ years of industry expertise.",

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
    url: "https://theunidecor.com",
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
   
       <Navbar />
       {/* <CampaignBanner/> */}
        {children}
        <WhatsAppFloat/>
        <FooterServer data={navigation} />
      </body>
    </html>
  );
}