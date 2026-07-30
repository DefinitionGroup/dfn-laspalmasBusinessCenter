import { defineArrayMember, defineField, defineType } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "brand", title: "Brand signal", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", title: "Supporting sentence", type: "text", rows: 3 }),
    defineField({
      name: "image",
      title: "Fallback / poster image",
      type: "image",
      description: "Used as the hero background when no video is selected, and as the video poster and reduced-motion fallback.",
      options: { hotspot: true },
      validation: (Rule) => Rule.custom((image, context) => {
        const parent = context.parent as { video?: unknown } | undefined;
        return image || parent?.video ? true : "Add an image or a background video.";
      }),
    }),
    defineField({
      name: "video",
      title: "Background video",
      type: "file",
      description: "Optional full-bleed video. MP4 or WebM is recommended; playback is muted, looping and inline.",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
    }),
    defineField({ name: "imageAlt", title: "Media alternative text", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "linkField" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "linkField" }),
  ],
  preview: {
    select: { headline: "headline", media: "image" },
    prepare: ({ headline, media }) => ({
      title: "Hero",
      subtitle: headline || "No headline yet",
      media,
    }),
  },
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
  preview: {
    select: { headline: "headline", eyebrow: "eyebrow" },
    prepare: ({ headline, eyebrow }) => ({
      title: "Editorial intro",
      subtitle: headline || eyebrow || "No headline yet",
    }),
  },
});

export const animatedHeadlineBlock = defineType({
  name: "animatedHeadlineBlock",
  title: "Animated headline",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Heading level",
      type: "string",
      initialValue: "h2",
      description: "Use H1 only when this is the main page heading.",
      options: {
        list: [
          { title: "H1 — page heading", value: "h1" },
          { title: "H2 — section heading", value: "h2" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { headline: "headline" },
    prepare: ({ headline }) => ({
      title: "Animated headline",
      subtitle: headline || "No headline yet",
    }),
  },
});

export const portableTextBlock = defineType({
  name: "portableTextBlock",
  title: "Portable text",
  type: "object",
  fields: [
    defineField({
      name: "body",
      title: "Text",
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { text: "body.0.children.0.text" },
    prepare: ({ text }) => ({
      title: "Portable text",
      subtitle: text || "No text yet",
    }),
  },
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
  preview: {
    select: { headline: "headline", eyebrow: "eyebrow" },
    prepare: ({ headline, eyebrow }) => ({
      title: "Spaces index",
      subtitle: headline || eyebrow || "No headline yet",
    }),
  },
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
  preview: {
    select: { headline: "headline", eyebrow: "eyebrow" },
    prepare: ({ headline, eyebrow }) => ({
      title: "Feature list",
      subtitle: headline || eyebrow || "No headline yet",
    }),
  },
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
  preview: {
    select: { headline: "headline", eyebrow: "eyebrow", media: "image" },
    prepare: ({ headline, eyebrow, media }) => ({
      title: "Split content",
      subtitle: headline || eyebrow || "No headline yet",
      media,
    }),
  },
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
  preview: {
    select: { headline: "headline", eyebrow: "eyebrow" },
    prepare: ({ headline, eyebrow }) => ({
      title: "Gallery",
      subtitle: headline || eyebrow || "No headline yet",
    }),
  },
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
  preview: {
    select: { headline: "headline", eyebrow: "eyebrow" },
    prepare: ({ headline, eyebrow }) => ({
      title: "Testimonials",
      subtitle: headline || eyebrow || "Referenced testimonial content",
    }),
  },
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
  preview: {
    select: { headline: "headline", address: "address" },
    prepare: ({ headline, address }) => ({
      title: "Location",
      subtitle: headline || address || "No location details yet",
    }),
  },
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
  preview: {
    select: { headline: "headline", eyebrow: "eyebrow" },
    prepare: ({ headline, eyebrow }) => ({
      title: "Call to action",
      subtitle: headline || eyebrow || "No headline yet",
    }),
  },
});

export const pageBuilderBlocks = [
  heroBlock,
  introBlock,
  animatedHeadlineBlock,
  portableTextBlock,
  spaceListBlock,
  featureListBlock,
  splitContentBlock,
  galleryBlock,
  testimonialBlock,
  locationBlock,
  ctaBlock,
];
