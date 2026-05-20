// schemas/heroSlide.js
export default {
  name: "heroSlide",
  title: "Hero Slides",
  type: "document",
  orderings: [
    {
      title: "Order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link",
      title: "Link",
      type: "string",
      description: "e.g. /products/laminates#collections",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "video",
      title: "Background Video",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description: "Optional. If set, video plays as background.",
    },
    {
      name: "poster",
      title: "Poster / Fallback Image",
      type: "image",
      options: { hotspot: true },
      description: "Shows while video loads or if no video set.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "1 = first card, 2 = second, etc.",
      validation: (Rule) => Rule.required().min(1),
    },
    {
  name: "loop",
  title: "Loop Video",
  type: "boolean",
  description: "Card 1 = true, Card 2 & 3 = false",
  initialValue: false,
},
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "poster",
      order: "order",
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle,
        media,
      };
    },
  },
};