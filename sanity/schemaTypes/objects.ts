import { defineArrayMember, defineField, defineType } from "sanity";

export const linkField = defineType({
  name: "linkField",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", title: "URL or path", type: "string", validation: (Rule) => Rule.required() }),
  ],
});

export const metadata = defineType({
  name: "metadata",
  title: "Metadata",
  type: "object",
  fields: [
    defineField({ name: "title", title: "SEO title", type: "string" }),
    defineField({ name: "description", title: "SEO description", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Social image", type: "image", options: { hotspot: true } }),
  ],
});

export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [defineArrayMember({ type: "block" })],
});
