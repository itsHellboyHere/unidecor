import { sanityClient } from "@/app/lib/sanity.client";
import { navbarQuery } from "@/app/lib/queries/navbar";

export async function getNavbarData() {
  return await sanityClient.fetch(navbarQuery);
}