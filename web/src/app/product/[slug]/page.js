import { notFound } from "next/navigation";
import { sanityClient } from "@/app/lib/sanity.client";
import { productDetailQuery } from "@/app/lib/queries/productDetailQuery";
import ProductDescription from "@/app/product/components/ProductDescrption";

export default async function ProductPage({ params }) {
    const {slug} = await params;
  const product = await sanityClient.fetch(productDetailQuery, {
    slug: slug,
  });

  if (!product) notFound();

  return <ProductDescription product={product} />;
}