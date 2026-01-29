// src/app/layout.js
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar.server";



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
  title: "Unidecor",
  description: "Premium laminates & interior surfaces",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${playfair.variable}`}>
       <Navbar />
        {children}
      </body>
    </html>
  );
}