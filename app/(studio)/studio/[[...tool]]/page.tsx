import dynamic from "next/dynamic";
import { isSanityConfigured } from "@/sanity/env";

const Studio = dynamic(() => import("@/components/Studio"));

export const dynamicParams = true;

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="studio-setup">
        <p className="eyebrow">Studio prepared</p>
        <h1>Connect the dedicated Sanity project when we create the account.</h1>
        <p>
          Copy <code>.env.example</code> to <code>.env.local</code>, then add the
          project ID and dataset. The Studio will mount here automatically.
        </p>
      </main>
    );
  }

  return <Studio />;
}
