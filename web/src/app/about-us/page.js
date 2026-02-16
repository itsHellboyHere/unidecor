import AboutPage from "../components/AboutUs";

export const metadata = {
  title: "About Unidecor | Premium Interior Surface Solutions",
  description:
    "Discover Unidecor — a leading provider of premium laminates, wall panels, and interior surface solutions designed for modern Indian homes and commercial spaces.",
  keywords: [
    "Unidecor",
    "About Unidecor",
    "Interior laminates",
    "Wall panels",
    "Interior surface solutions",
    "Indian interior materials",
  ],
  openGraph: {
    title: "About Unidecor | Premium Interior Surface Solutions",
    description:
      "Learn about Unidecor’s vision, craftsmanship, and commitment to high-quality interior surface solutions for homes and commercial spaces.",
    url: "https://theunidecor.com/about-us",
    siteName: "Unidecor",
    images: [
      {
        url: "/og-default.webp",
        width: 1200,
        height: 630,
        alt: "Unidecor Interior Surface Solutions",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://www.unidecor.com/about-us",
  },
};


export default function AboutUsPage(){
    return(
        <AboutPage/>
    )
}