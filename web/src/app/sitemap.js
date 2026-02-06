import { sanityClient } from "@/app/lib/sanity.client";

export default async function sitemap() {
  const baseUrl = "https://www.theunidecor.com";

  /* -----------------------------
     STATIC ROUTES
  ----------------------------- */
  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/contact",
    "/catalogue",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  /* -----------------------------
     DYNAMIC ROUTES (SANITY)
  ----------------------------- */
  const data = await sanityClient.fetch(`
  {
    "categories": *[_type == "productCategory"]{
      "slug": slug.current
    },

    "collections": *[_type == "productCollection"]{
      "slug": slug.current,
      "category": category->slug.current
    },

    "products": *[_type == "product"]{
      "slug": slug.current,
      "collection": collection->{
        slug,
        category->{
          slug
        }
      }
    }
  }
  `);

  /* -----------------------------
     CATEGORY PAGES
     /products/[category]
  ----------------------------- */
  const categoryRoutes = data.categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  /* -----------------------------
     COLLECTION PAGES
     /products/[category]/[collection]
  ----------------------------- */
  const collectionRoutes = data.collections
    .filter((c) => c.category)
    .map((col) => ({
      url: `${baseUrl}/products/${col.category}/${col.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }));

  /* -----------------------------
     PRODUCT PAGES
     /products/[category]/[collection]/[product]
  ----------------------------- */
  const productRoutes = data.products
    .filter(
      (p) =>
        p.collection?.slug &&
        p.collection?.category?.slug
    )
    .map((product) => ({
      url: `${baseUrl}/products/${product.collection.category.slug}/${product.collection.slug}/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...collectionRoutes,
    ...productRoutes,
  ];
}