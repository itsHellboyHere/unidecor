export default {
  name: "campaignBanner",
  title: "Campaign Banner",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Banner Text",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "ctaText",
      title: "CTA Text",
      type: "string",
    },
    {
      name: "ctaLink",
      title: "CTA Link",
      type: "string",
    },
    {
      name: "isActive",
      title: "Active?",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "datetime",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "datetime",
    },
    {
      name: "backgroundColor",
      title: "Background Color",
      type: "string",
      description: "Hex color like #1c1c1c",
    }
  ]
};