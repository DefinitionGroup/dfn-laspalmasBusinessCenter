import { defineArrayMember, defineField, defineType } from "sanity";
import { createElement } from "react";

function HomepageIcon() {
  return createElement(
    "svg",
    {
      "aria-label": "Homepage",
      fill: "none",
      height: "1em",
      role: "img",
      viewBox: "0 0 25 25",
      width: "1em",
    },
    createElement("path", {
      d: "M14.5 18.5V12.5H10.5V18.5M5.5 11.5V18.5H19.5V11.5L12.5 5.5L5.5 11.5Z",
      stroke: "currentColor",
      strokeLinejoin: "round",
      strokeWidth: 1.2,
    }),
  );
}

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { name: "basic", title: "Basic", default: true },
    { name: "content", title: "Content" },
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "basic", validation: (Rule) => Rule.required() }),
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      group: "basic",
      initialValue: "es",
      options: { list: [{ title: "Español", value: "es" }, { title: "English", value: "en" }], layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: {
        source: "title",
        isUnique: async (value, context) => {
          const document = context.document;
          const id = document?._id.replace(/^drafts\./, "");
          const client = context.getClient({ apiVersion: "2026-07-14" });
          const count = await client.fetch<number>(
            `count(*[_type == "page" && language == $language && slug.current == $slug && !(_id in [$publishedId, $draftId])])`,
            { language: document?.language, slug: value, publishedId: id, draftId: `drafts.${id}` },
          );
          return count === 0;
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "translationKey",
      title: "Translation group",
      type: "string",
      group: "basic",
      description: "Use the same stable key for every translated version, for example private-offices.",
      validation: (Rule) => Rule.custom((value) => value ? true : "Add a translation group to keep hreflang links editable.").warning(),
    }),
    defineField({
      name: "isHomepage",
      title: "Homepage",
      type: "boolean",
      group: "settings",
      initialValue: false,
      description: "One homepage per language.",
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true;
          const document = context.document;
          const id = document?._id.replace(/^drafts\./, "");
          const client = context.getClient({ apiVersion: "2026-07-14" });
          const count = await client.fetch<number>(
            `count(*[_type == "page" && language == $language && isHomepage == true && !(_id in [$publishedId, $draftId])])`,
            { language: document?.language, publishedId: id, draftId: `drafts.${id}` },
          );
          return count === 0 || "Another homepage already exists for this language.";
        }),
    }),
    defineField({
      name: "navbarVariant",
      title: "Navigation contrast",
      type: "string",
      group: "settings",
      initialValue: "light",
      options: { list: [{ title: "Light text", value: "light" }, { title: "Dark text", value: "dark" }], layout: "radio" },
    }),
    defineField({ name: "metadata", title: "Metadata", type: "metadata", group: "seo" }),
    defineField({
      name: "content",
      title: "Page builder",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({ type: "heroBlock" }),
        defineArrayMember({ type: "introBlock" }),
        defineArrayMember({ type: "animatedHeadlineBlock" }),
        defineArrayMember({ type: "portableTextBlock" }),
        defineArrayMember({ type: "contactFormBlock" }),
        defineArrayMember({ type: "spaceListBlock" }),
        defineArrayMember({ type: "featureListBlock" }),
        defineArrayMember({ type: "splitContentBlock" }),
        defineArrayMember({ type: "galleryBlock" }),
        defineArrayMember({ type: "googleMapBlock" }),
        defineArrayMember({ type: "testimonialBlock" }),
        defineArrayMember({ type: "locationBlock" }),
        defineArrayMember({ type: "ctaBlock" }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", language: "language", homepage: "isHomepage" },
    prepare: ({ title, language, homepage }) => ({
      title,
      subtitle: `${language?.toUpperCase() || ""}${homepage ? " · Homepage" : ""}`,
      media: homepage ? HomepageIcon : undefined,
    }),
  },
});
