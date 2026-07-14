import { defineArrayMember, defineField, defineType } from "sanity";

const languageField = defineField({
  name: "language",
  title: "Language",
  type: "string",
  initialValue: "es",
  options: { list: [{ title: "Español", value: "es" }, { title: "English", value: "en" }], layout: "radio" },
  validation: (Rule) => Rule.required(),
});

export const space = defineType({
  name: "space",
  title: "Space / service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    languageField,
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        isUnique: async (value, context) => {
          const document = context.document;
          const id = document?._id.replace(/^drafts\./, "");
          const client = context.getClient({ apiVersion: "2026-07-14" });
          const count = await client.fetch<number>(
            `count(*[_type == "space" && language == $language && slug.current == $slug && !(_id in [$publishedId, $draftId])])`,
            { language: document?.language, slug: value, publishedId: id, draftId: `drafts.${id}` },
          );
          return count === 0;
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: { list: [{ title: "Private office", value: "privateOffice" }, { title: "Meeting room", value: "meetingRoom" }, { title: "Coworking", value: "coworking" }, { title: "Virtual office", value: "virtualOffice" }] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageAlt", title: "Image alt text", type: "string" }),
    defineField({ name: "capacity", title: "Capacity", type: "string" }),
    defineField({ name: "size", title: "Size", type: "string" }),
    defineField({ name: "pricing", title: "Pricing note", type: "string" }),
    defineField({ name: "availability", title: "Availability note", type: "string" }),
    defineField({ name: "features", title: "Included features", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
  preview: { select: { title: "title", subtitle: "kind", media: "image" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    languageField,
    defineField({ name: "quote", title: "Quote", type: "text", rows: 5, validation: (Rule) => Rule.required() }),
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "approved", title: "Approved for publication", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "name", subtitle: "company" } },
});

export const menu = defineType({
  name: "menu",
  title: "Navigation",
  type: "document",
  fields: [
    languageField,
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }), defineField({ name: "href", title: "Path", type: "string", validation: (Rule) => Rule.required() })] })],
    }),
    defineField({ name: "cta", title: "Primary CTA", type: "linkField" }),
  ],
  preview: { select: { language: "language" }, prepare: ({ language }) => ({ title: `${language?.toUpperCase() || ""} navigation` }) },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "brandName", title: "Brand name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "shortName", title: "Short name", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "phone", title: "Phone numbers", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "email", title: "Email addresses", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "receptionHours", title: "Reception hours", type: "string" }),
    defineField({ name: "accessHours", title: "Tenant access", type: "string" }),
    defineField({ name: "defaultMetadata", title: "Default metadata", type: "metadata" }),
  ],
  preview: { select: { title: "brandName" } },
});

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact submission",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "interest", title: "Interest", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "submittedAt", title: "Submitted at", type: "datetime" }),
  ],
});
