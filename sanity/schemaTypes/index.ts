import type { SchemaTypeDefinition } from "sanity";
import { pageBuilderBlocks } from "./blocks";
import { contactSubmission, menu, siteSettings, space, testimonial } from "./documents";
import { linkField, metadata, richText } from "./objects";
import { page } from "./page";

export const schemaTypes: SchemaTypeDefinition[] = [
  page,
  space,
  testimonial,
  menu,
  siteSettings,
  contactSubmission,
  linkField,
  metadata,
  richText,
  ...pageBuilderBlocks,
];
