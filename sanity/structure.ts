import type { StructureResolver } from "sanity/structure";

const singletonTypes = new Set(["siteSettings"]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Las Palmas Business Center")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Español")
                .child(S.documentList().title("Páginas en español").filter('_type == "page" && language == "es"')),
              S.listItem()
                .title("English")
                .child(S.documentList().title("English pages").filter('_type == "page" && language == "en"')),
            ]),
        ),
      S.documentTypeListItem("space").title("Spaces and services"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("menu").title("Navigation"),
      S.documentTypeListItem("contactSubmission").title("Contact submissions"),
      ...S.documentTypeListItems().filter(
        (item) =>
          !singletonTypes.has(item.getId() || "") &&
          !["page", "space", "testimonial", "menu", "contactSubmission"].includes(item.getId() || ""),
      ),
    ]);
