import { defineArrayMember, defineField, defineType } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "brand", title: "Brand signal", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", title: "Supporting sentence", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Full-bleed image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: "imageAlt", title: "Image alt text", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "linkField" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "linkField" }),
  ],
  preview: { select: { title: "headline", media: "image" } },
});

export const introBlock = defineType({
  name: "introBlock",
  title: "Editorial intro",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Body", type: "richText" }),
  ],
  preview: { select: { title: "headline", subtitle: "eyebrow" } },
});

export const spaceListBlock = defineType({
  name: "spaceListBlock",
  title: "Spaces index",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3 }),
    defineField({
      name: "spaces",
      title: "Spaces",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "space" }] })],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: { select: { title: "headline", subtitle: "eyebrow" } },
});

export const featureListBlock = defineType({
  name: "featureListBlock",
  title: "Feature list",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3 }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: "headline", subtitle: "eyebrow" } },
});

export const splitContentBlock = defineType({
  name: "splitContentBlock",
  title: "Split content",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Body", type: "richText" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: "imageAlt", title: "Image alt text", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "reverse", title: "Place image first", type: "boolean", initialValue: false }),
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      initialValue: "paper",
      options: { list: [{ title: "Paper", value: "paper" }, { title: "Sand", value: "sand" }, { title: "Ink", value: "ink" }], layout: "radio" },
    }),
    defineField({ name: "cta", title: "Optional CTA", type: "linkField" }),
  ],
  preview: { select: { title: "headline", subtitle: "eyebrow", media: "image" } },
});

export const galleryBlock = defineType({
  name: "galleryBlock",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
            defineField({ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: { select: { title: "caption", media: "image" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "headline", subtitle: "eyebrow" } },
});

export const testimonialBlock = defineType({
  name: "testimonialBlock",
  title: "Testimonials",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: { select: { title: "headline", subtitle: "eyebrow" } },
});

export const locationBlock = defineType({
  name: "locationBlock",
  title: "Location",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({ name: "address", title: "Address", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "mapUrl", title: "Map URL", type: "url" }),
    defineField({
      name: "details",
      title: "Practical details",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", title: "Label", type: "string" }), defineField({ name: "value", title: "Value", type: "string" })] })],
    }),
  ],
  preview: { select: { title: "headline", subtitle: "address" } },
});

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "linkField", validation: (Rule) => Rule.required() }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "linkField" }),
  ],
  preview: { select: { title: "headline", subtitle: "eyebrow" } },
});

export const pageBuilderBlocks = [
  heroBlock,
  introBlock,
  spaceListBlock,
  featureListBlock,
  splitContentBlock,
  galleryBlock,
  testimonialBlock,
  locationBlock,
  ctaBlock,
];
