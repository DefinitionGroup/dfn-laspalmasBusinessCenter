import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured || !projectId) return null;

  if (!client) {
    const token = process.env.SANITY_API_READ_TOKEN;

    client = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: process.env.NODE_ENV === "production" && !token,
      stega: { studioUrl: "/studio" },
    });
  }

  return client;
}
