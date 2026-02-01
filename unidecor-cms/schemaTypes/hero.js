// hero.js
export default {
  name: "hero",
  title: "Hero Section",
  type: "object",

  description:
    "Optional hero section. Can be used on category, collection, or product pages.",

  fields: [
    {
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Wide image. No text baked into image. Used as page hero.",
    },

    {
      name: "heading",
      title: "Hero Heading",
      type: "string",
      description: "Optional overlay heading",
    },

    {
      name: "subheading",
      title: "Hero Subheading",
      type: "text",
      description: "Optional supporting text",
    },
  ],
};