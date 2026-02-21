export const relatedProductsQuery = `
*[
  _type == "product" &&
  collection._ref == $collectionId &&
  slug.current != $slug
][0..20]{
  _id,
  name,
  slug,
  designCode,
  "heroImage": images[isHero == true][0].asset->{
    url
  }
}
`;