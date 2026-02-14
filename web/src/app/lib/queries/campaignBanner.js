const campaignQuery = `
*[
  _type == "campaignBanner" &&
  isActive == true &&
  (!defined(startDate) || startDate <= now()) &&
  (!defined(endDate) || endDate >= now())
][0]{
  _id,
  title,
  ctaText,
  ctaLink,
  backgroundColor
}
`;

export default campaignQuery;