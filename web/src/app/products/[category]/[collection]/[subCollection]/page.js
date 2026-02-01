import { notFound } from "next/navigation";
import { sanityClient } from "@/app/lib/sanity.client";
import { subCollectionPageQuery } from "@/app/lib/queries/subCollectionPageQuery";

export default async function SubCollectionPage({ params }) {
  const { subCollection } = await params;

  if (!subCollection) notFound();

  const data = await sanityClient.fetch(subCollectionPageQuery, {
    slug: subCollection,
  });

  if (!data) notFound();

  const { title, products } = data;

  return (
    <main style={{ padding: 40 }}>
      <h1>{title}</h1>

      {/* PRODUCTS GRID (TEMP – NO DESIGN) */}
      {products?.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </main>
  );
}