// schemaTypes/catalogue.js
export default {
  name: "catalogue",
  title: "Catalogue",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Catalogue Title",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle / Description",
      type: "string",
      description: "Short line shown under title e.g. 'Acrylic Laminates 2025-26'",
    },
    {
      name: "brand",
      title: "Brand",
      type: "string",
      description: "e.g. HexaLam, Trend Hardware, Unidecor",
    },
    {
      name: "file",
      title: "PDF File",
      type: "file",
      options: { accept: ".pdf" },
      validation: Rule => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Cover Image (Thumbnail)",
      type: "image",
      options: { hotspot: true },
      description: "Used as preview card image on the downloads page",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = shown first",
      initialValue: 0,
    },
    {
      name: "isActive",
      title: "Show on Website",
      type: "boolean",
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "brand",
      media: "coverImage",
    },
  },
};