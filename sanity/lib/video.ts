import { dataset, projectId } from "@/sanity/env";
import type { SanityVideo } from "@/types/content";

export function resolveVideoUrl(source?: SanityVideo) {
  if (!source) return undefined;
  if (typeof source === "string") return source;
  if (source.asset?.url) return source.asset.url;

  const reference = source.asset?._ref;
  const match = reference?.match(/^file-(.+)-([a-z0-9]+)$/i);
  if (!match || !projectId) return undefined;

  const [, assetId, extension] = match;
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;
}
