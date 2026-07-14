import Image from "next/image";
import ActionLink from "@/components/ActionLink";
import { resolveImageUrl } from "@/sanity/lib/image";
import type { HeroBlock as HeroBlockType } from "@/types/content";

export default function HeroBlock({ block }: { block: HeroBlockType }) {
  const imageUrl = resolveImageUrl(block.image, { width: 2400, quality: 88 });
  if (!imageUrl) return null;

  return (
    <section className="hero-composition">
      <Image
        src={imageUrl}
        alt={block.imageAlt}
        fill
        priority
        sizes="100vw"
        className="hero-composition__image"
      />
      <div className="hero-composition__scrim" />
      <div className="hero-composition__content page-gutter">
        <p className="hero-composition__brand">{block.brand || "Las Palmas Business Center"}</p>
        <h1>{block.headline}</h1>
        {block.summary ? <p className="hero-composition__summary">{block.summary}</p> : null}
        {(block.primaryCta || block.secondaryCta) && (
          <div className="hero-composition__actions">
            {block.primaryCta ? <ActionLink link={block.primaryCta} /> : null}
            {block.secondaryCta ? <ActionLink link={block.secondaryCta} variant="secondary" /> : null}
          </div>
        )}
      </div>
    </section>
  );
}
