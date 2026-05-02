// lib/queries/catalogueQuery.js
export const catalogueQuery = `
*[_type == "catalogue" && isActive == true] | order(order asc){
  _id,
  title,
  subtitle,
  brand,
  "fileUrl": file.asset->url,
  "coverImage": coverImage.asset->{
    url,
    metadata { lqip }
  }
}
`;