// app/lib/sanity.image.js
import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./sanity.client";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  return source ? builder.image(source) : null;
}