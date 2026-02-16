import { sanityClient } from "@/app/lib/sanity.client";

export default async function sitemap() {
  const baseUrl = "https://theunidecor.com";

  /* -----------------------------
     STATIC ROUTES
  ----------------------------- */
  const staticRoutes = [
    "",
    "/",
    "/about-us",
    "/products",
    "/contact",
    "/catalogue",
    "/inspiration",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  /* -----------------------------
     FETCH SANITY DATA
  ----------------------------- */
  const data = await sanityClient.fetch(`
  {
    "categories": *[_type == "productCategory"]{
      slug,
      _updatedAt
    },

    "collections": *[_type == "productCollection"]{
      slug,
      _updatedAt,
      category->{
        slug
      },
      parent->{
        slug
      }
    },

    "products": *[_type == "product"]{
      slug,
      _updatedAt
    }
  }
  `);

  /* -----------------------------
     CATEGORY ROUTES
     /products/[category]
  ----------------------------- */
  const categoryRoutes = data.categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug.current}`,
    lastModified: new Date(cat._updatedAt),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  /* -----------------------------
     COLLECTION ROUTES
     Handles deep nesting
     /products/[category]/[parent?]/[collection]
  ----------------------------- */
  const collectionRoutes = data.collections.map((col) => {
    const categorySlug = col.category?.slug?.current;
    const parentSlug = col.parent?.slug?.current;
    const currentSlug = col.slug?.current;

    if (!categorySlug || !currentSlug) return null;

    let urlPath = `${baseUrl}/products/${categorySlug}`;

    if (parentSlug) {
      urlPath += `/${parentSlug}`;
    }

    urlPath += `/${currentSlug}`;

    return {
      url: urlPath,
      lastModified: new Date(col._updatedAt),
      changeFrequency: "weekly",
      priority: 0.85,
    };
  }).filter(Boolean);

  /* -----------------------------
     PRODUCT ROUTES
     /product/[slug]
  ----------------------------- */
  const productRoutes = data.products.map((product) => ({
    url: `${baseUrl}/product/${product.slug.current}`,
    lastModified: new Date(product._updatedAt),
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