import { createReadStream, existsSync } from "node:fs";
import { basename, resolve } from "node:path";
import { getCliClient } from "sanity/cli";
import {
  getDemoHome,
  getDemoPage,
  getDemoPageSlugs,
  getDemoShell,
} from "../content/demo";
import type {
  LinkField,
  Locale,
  PageBuilderBlock,
  PageDocument,
  SanityImage,
  SpaceSummary,
  TestimonialSummary,
} from "../types/content";

const apiVersion = "2026-07-14";
const locales: Locale[] = ["es", "en"];
const dryRun = process.argv.includes("--dry-run");
const client = getCliClient({ apiVersion });

type SeedDocument = Record<string, unknown> & {
  _id: string;
  _type: string;
};

type ImageValue = Exclude<SanityImage, string> & { _type?: "image" };

const pages = locales.flatMap((locale) => [
  getDemoHome(locale),
  ...getDemoPageSlugs(locale)
    .map((slug) => getDemoPage(slug, locale))
    .filter((page): page is PageDocument => Boolean(page)),
]);

const imagePaths = Array.from(collectImagePaths([
  pages,
  getDemoShell("es").settings,
]));

const assetIds = new Map<string, string>();

async function main() {
  if (dryRun) {
    for (const imagePath of imagePaths) {
      assetIds.set(imagePath, `image-dryrun-${slugify(basename(imagePath))}-1x1-jpg`);
    }
  } else {
    for (const imagePath of imagePaths) {
      const filePath = resolve(process.cwd(), "public", imagePath.replace(/^\//, ""));
      if (!existsSync(filePath)) throw new Error(`Missing local image: ${filePath}`);

      const asset = await client.assets.upload("image", createReadStream(filePath), {
        filename: basename(filePath),
        label: "LPBC initial content",
      });
      assetIds.set(imagePath, asset._id);
      console.log(`Asset ready: ${imagePath} -> ${asset._id}`);
    }
  }

  const homePages = new Map(
    locales.map((locale) => [locale, getDemoHome(locale)] as const),
  );

  const spaces = locales.flatMap((locale) => {
    const block = homePages
      .get(locale)
      ?.content.find((item) => item._type === "spaceListBlock");

    if (!block || block._type !== "spaceListBlock") return [];
    return block.spaces.map((space) => makeSpaceDocument(space, locale));
  });

  const testimonials = makeTestimonialDocuments(pages);
  const settings = makeSettingsDocument();
  const menus = locales.map((locale) => makeMenuDocument(locale));
  const pageDocuments = pages.map((page) => makePageDocument(page));
  const documents: SeedDocument[] = [
    settings,
    ...menus,
    ...spaces,
    ...testimonials,
    ...pageDocuments,
  ];

  assertUniqueIds(documents);

  if (dryRun) {
    printSummary(documents, "Dry run complete; nothing was written.");
  } else {
    let transaction = client.transaction();
    for (const document of documents) transaction = transaction.createOrReplace(document);
    const result = await transaction.commit({ visibility: "sync" });
    printSummary(documents, `Seed committed: ${result.transactionId}`);
  }
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

function makeSettingsDocument(): SeedDocument {
  const source = getDemoShell("es").settings;
  return {
    ...source,
    _id: "siteSettings",
    _type: "siteSettings",
    defaultMetadata: source.defaultMetadata
      ? {
          _type: "metadata",
          ...source.defaultMetadata,
          image: toImage(source.defaultMetadata.image),
        }
      : undefined,
  };
}

function makeMenuDocument(locale: Locale): SeedDocument {
  const source = getDemoShell(locale).menu;
  return {
    ...source,
    _id: `menu-${locale}`,
    _type: "menu",
    items: source.items.map((item) => ({ ...item, _type: "object" })),
    cta: toLink(source.cta),
  };
}

function makeSpaceDocument(space: SpaceSummary, locale: Locale): SeedDocument {
  return {
    _id: spaceId(locale, space.kind),
    _type: "space",
    title: space.title,
    language: locale,
    slug: { _type: "slug", current: space.slug },
    kind: space.kind,
    summary: space.summary,
    image: toImage(space.image),
    imageAlt: space.imageAlt,
  };
}

function makeTestimonialDocuments(sourcePages: PageDocument[]): SeedDocument[] {
  const unique = new Map<string, SeedDocument>();

  for (const page of sourcePages) {
    for (const block of page.content) {
      if (block._type !== "testimonialBlock") continue;
      for (const testimonial of block.testimonials) {
        const id = testimonialId(page.language, testimonial);
        unique.set(id, {
          _id: id,
          _type: "testimonial",
          language: page.language,
          quote: testimonial.quote,
          name: testimonial.name,
          role: testimonial.role,
          company: testimonial.company,
          approved: true,
        });
      }
    }
  }

  return [...unique.values()];
}

function makePageDocument(page: PageDocument): SeedDocument {
  return {
    _id: pageId(page),
    _type: "page",
    title: page.title,
    language: page.language,
    translationKey: page.translationKey,
    slug: { _type: "slug", current: page.slug },
    isHomepage: Boolean(page.isHomepage),
    navbarVariant: page.navbarVariant ?? "light",
    metadata: page.metadata
      ? {
          _type: "metadata",
          ...page.metadata,
          image: toImage(page.metadata.image),
        }
      : undefined,
    content: page.content.map((block) => normalizeBlock(block, page.language)),
  };
}

function normalizeBlock(block: PageBuilderBlock, locale: Locale): Record<string, unknown> {
  switch (block._type) {
    case "heroBlock":
      return {
        ...block,
        image: toImage(block.image),
        primaryCta: toLink(block.primaryCta),
        secondaryCta: toLink(block.secondaryCta),
      };
    case "introBlock":
      return { ...block, body: toPortableText(block.body, `${block._key}-body`) };
    case "animatedHeadlineBlock":
      return block;
    case "portableTextBlock":
      return { ...block, body: toPortableText(block.body, `${block._key}-body`) };
    case "contactFormBlock":
      return block;
    case "spaceListBlock":
      return {
        ...block,
        spaces: block.spaces.map((space) => ({
          _key: `space-${space.kind}`,
          _type: "reference",
          _ref: spaceId(locale, space.kind),
        })),
      };
    case "featureListBlock":
      return {
        ...block,
        items: block.items.map((item) => ({ ...item, _type: "object" })),
      };
    case "splitContentBlock":
      return {
        ...block,
        body: toPortableText(block.body, `${block._key}-body`),
        image: toImage(block.image),
        cta: toLink(block.cta),
      };
    case "galleryBlock":
      return {
        ...block,
        images: block.images.map((item) => ({
          ...item,
          _type: "object",
          image: toImage(item.image),
        })),
      };
    case "googleMapBlock":
      return {
        ...block,
        previewImage: toImage(block.previewImage),
      };
    case "testimonialBlock":
      return {
        ...block,
        testimonials: block.testimonials.map((testimonial) => ({
          _key: `testimonial-${slugify(testimonial.name)}`,
          _type: "reference",
          _ref: testimonialId(locale, testimonial),
        })),
      };
    case "locationBlock":
      return {
        ...block,
        details: block.details?.map((detail) => ({ ...detail, _type: "object" })),
      };
    case "ctaBlock":
      return {
        ...block,
        primaryCta: toLink(block.primaryCta),
        secondaryCta: toLink(block.secondaryCta),
      };
  }
}

function toLink(link?: LinkField) {
  return link ? { _type: "linkField", ...link } : undefined;
}

function toImage(image?: SanityImage): ImageValue | undefined {
  if (!image) return undefined;
  if (typeof image !== "string") return image;
  const assetId = assetIds.get(image);
  if (!assetId) throw new Error(`No uploaded asset found for ${image}`);
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

function toPortableText(value: unknown, key: string) {
  if (!value || Array.isArray(value)) return value;
  return [
    {
      _key: key,
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ _key: `${key}-span`, _type: "span", marks: [], text: String(value) }],
    },
  ];
}

function spaceId(locale: Locale, kind: SpaceSummary["kind"]) {
  return `space-${locale}-${kind}`;
}

function testimonialId(locale: Locale, testimonial: TestimonialSummary) {
  return `testimonial-${locale}-${slugify(testimonial.name)}`;
}

function pageId(page: PageDocument) {
  return `page-${page.language}-${page.isHomepage ? "home" : slugify(page.slug)}`;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function collectImagePaths(values: unknown[]) {
  const paths = new Set<string>();
  const visit = (value: unknown): void => {
    if (typeof value === "string" && value.startsWith("/images/")) {
      paths.add(value);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (value && typeof value === "object") Object.values(value).forEach(visit);
  };
  values.forEach(visit);
  return paths;
}

function assertUniqueIds(sourceDocuments: SeedDocument[]) {
  const ids = new Set<string>();
  for (const document of sourceDocuments) {
    if (ids.has(document._id)) throw new Error(`Duplicate document id: ${document._id}`);
    ids.add(document._id);
  }
}

function printSummary(sourceDocuments: SeedDocument[], heading: string) {
  const counts = sourceDocuments.reduce<Record<string, number>>((result, document) => {
    result[document._type] = (result[document._type] ?? 0) + 1;
    return result;
  }, {});
  console.log(heading);
  console.table(counts);
  console.log(`Total documents: ${sourceDocuments.length}`);
}
