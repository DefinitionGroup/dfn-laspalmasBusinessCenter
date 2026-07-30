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
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL or path",
                type: "string",
                validation: (Rule) => Rule.required(),
              }),
            ],
          },
        ],
      },
    }),
  ],
});
