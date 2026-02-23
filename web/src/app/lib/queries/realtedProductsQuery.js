export const relatedProductsQuery = `
*[
  _type == "product" &&
  collection._ref == $collectionId &&
  slug.current != $slug
]{
  _id,
  name,
  slug,
  designCode,
  "heroImage": images[isHero == true][0].asset->{
    url
  }
}
`;