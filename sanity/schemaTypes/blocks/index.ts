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

export const contactFormBlock = defineType({
  name: "contactFormBlock",
  title: "Contact form",
  type: "object",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "labels", title: "Field labels" },
    { name: "feedback", title: "Feedback" },
  ],
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "content",
      initialValue: "Contacto",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "text",
      rows: 2,
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({ name: "nameLabel", title: "Name", type: "string", group: "labels", initialValue: "Nombre" }),
    defineField({ name: "companyLabel", title: "Company", type: "string", group: "labels", initialValue: "Empresa" }),
    defineField({ name: "emailLabel", title: "Email", type: "string", group: "labels", initialValue: "Email" }),
    defineField({ name: "phoneLabel", title: "Phone", type: "string", group: "labels", initialValue: "Teléfono" }),
    defineField({ name: "interestLabel", title: "Interest", type: "string", group: "labels", initialValue: "Me interesa" }),
    defineField({
      name: "interestOptions",
      title: "Interest options",
      type: "array",
      group: "labels",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({ name: "messageLabel", title: "Message", type: "string", group: "labels", initialValue: "Mensaje" }),
    defineField({ name: "submitLabel", title: "Submit button", type: "string", group: "labels", initialValue: "Enviar consulta" }),
    defineField({
      name: "privacyNotice",
      title: "Privacy note",
      type: "text",
      rows: 2,
      group: "feedback",
      initialValue: "Usaremos tus datos únicamente para responder a esta consulta.",
    }),
    defineField({
      name: "successTitle",
      title: "Success title",
      type: "string",
      group: "feedback",
      initialValue: "Gracias. Hemos recibido tu mensaje.",
    }),
    defineField({
      name: "successMessage",
      title: "Success message",
      type: "text",
      rows: 2,
      group: "feedback",
      initialValue: "Nos pondremos en contacto contigo lo antes posible.",
    }),
    defineField({
      name: "errorMessage",
      title: "Error message",
      type: "text",
      rows: 2,
      group: "feedback",
      initialValue: "No hemos podido enviar el mensaje. Inténtalo de nuevo.",
    }),
  ],
  preview: {
    select: { headline: "headline" },
    prepare: ({ headline }) => ({
      title: "Contact form",
      subtitle: headline || "No headline yet",
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

export const googleMapBlock = defineType({
  name: "googleMapBlock",
  title: "Google Maps (privacy-first)",
  type: "object",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "location", title: "Map location" },
    { name: "privacy", title: "Privacy and labels" },
  ],
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", group: "content" }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Visible address",
      type: "string",
      group: "location",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "googleMapsQuery",
      title: "Google Maps search query",
      type: "string",
      group: "location",
      description: "Optional precise place name or latitude/longitude. The visible address is used when left empty.",
    }),
    defineField({
      name: "zoom",
      title: "Map zoom",
      type: "number",
      group: "location",
      initialValue: 16,
      validation: (Rule) => Rule.integer().min(12).max(20),
    }),
    defineField({
      name: "previewImage",
      title: "Privacy-safe map preview",
      type: "image",
      group: "location",
      description:
        "Shown before consent. This image is served by the website; Google Maps is not contacted. The built-in local map preview is used when empty.",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageAlt",
      title: "Preview alternative text",
      type: "string",
      group: "location",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "activationLabel",
      title: "Activation button",
      type: "string",
      group: "privacy",
      initialValue: "Click to activate map",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "privacyNotice",
      title: "Privacy notice",
      type: "text",
      rows: 2,
      group: "privacy",
      initialValue: "Google Maps is loaded only after you activate it. Google may then process your data.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "directionsLabel",
      title: "Directions link",
      type: "string",
      group: "privacy",
      initialValue: "Open directions in Google Maps",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { address: "address", media: "previewImage" },
    prepare: ({ address, media }) => ({
      title: "Google Maps (privacy-first)",
      subtitle: address || "No address yet",
      media,
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
  contactFormBlock,
  spaceListBlock,
  featureListBlock,
  splitContentBlock,
  galleryBlock,
  googleMapBlock,
  testimonialBlock,
  locationBlock,
  ctaBlock,
];
