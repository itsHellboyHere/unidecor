export const subCollectionPageQuery = `
*[_type == "productCollection" && slug.current == $slug][0]{
  _id,
  title,

  "products": *[
    _type == "product" &&
    collection._ref == ^._id
  ]{
    _id,
    name,
    slug
  }
}
`;