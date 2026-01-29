export const navbarQuery = `
{
  "products": *[
    _type == "category" &&
    showInMenu == true &&
    menuType == "products" &&
    !defined(parent)
  ] | order(order asc) {
    _id,
    title,
    slug,
    "children": *[
      _type == "category" &&
      showInMenu == true &&
      parent._ref == ^._id
    ] | order(order asc) {
      _id,
      title,
      slug
    }
  },

  "inspiration": *[
    _type == "category" &&
    showInMenu == true &&
    menuType == "inspiration" &&
    !defined(parent)
  ] | order(order asc) {
    _id,
    title,
    slug
  }
}
`;