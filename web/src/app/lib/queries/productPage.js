export const productPageQuery = `
{
  "node":
    *[
      (
        _type == "productCategory" ||
        _type == "productCollection"
      )
      && slug.current == $slug
    ][0]{
      _id,
      _type,
      title,
      slug,
      description,
      hero,
      hasProducts,

      /* CHILD COLLECTIONS */
      "children": *[
        _type == "productCollection" &&
        parent._ref == ^._id
      ] | order(title asc){
        _id,
        title,
        slug,
        hero,
        hasProducts
      },

      /* PRODUCTS (ONLY IF TERMINAL) */
      "products": *[
        _type == "product" &&
        collection._ref == ^._id
      ] | order(name asc){
        _id,
        name,
        slug,
        designCode,
        images[]{
          asset->{url},
          isHero
        }
      }
    }
}
`;