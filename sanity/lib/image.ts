import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "@/types/content";
import { getSanityClient } from "./client";

export function resolveImageUrl(
  source: SanityImage | undefined,
  options: { width?: number; height?: number; quality?: number } = {},
) {
  if (!source) return undefined;
  if (typeof source === "string") return source;

  const client = getSanityClient();
  if (!client || !source.asset?._ref) return undefined;

  let builder = createImageUrlBuilder(client).image(source).auto("format");
  if (options.width) builder = builder.width(options.width);
  if (options.height) builder = builder.height(options.height).fit("crop");
  if (options.quality) builder = builder.quality(options.quality);
  return builder.url();
}
