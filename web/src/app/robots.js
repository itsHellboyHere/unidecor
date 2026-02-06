export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/studio/",
          "/admin/",
          "/_next/",
          "/draft/",
          "/*?*",          // blocks filter/query URLs
        ],
      },
    ],
    sitemap: "https://www.theunidecor.com/sitemap.xml",
  };
}