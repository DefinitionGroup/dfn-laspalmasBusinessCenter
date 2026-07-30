import Image from "next/image";
import ActionLink from "@/components/ActionLink";
import { resolveImageUrl } from "@/sanity/lib/image";
import { resolveVideoUrl } from "@/sanity/lib/video";
import type { HeroBlock as HeroBlockType } from "@/types/content";

export default function HeroBlock({ block }: { block: HeroBlockType }) {
  const imageUrl = resolveImageUrl(block.image, { width: 2400, quality: 88 });
  const videoUrl = resolveVideoUrl(block.video);
  if (!imageUrl && !videoUrl) return null;

  return (
    <section className="hero-composition">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={block.imageAlt}
          fill
          priority
          sizes="100vw"
          className="hero-composition__image"
        />
      ) : null}
      {videoUrl ? (
        <video
          className="hero-composition__video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={imageUrl}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={videoUrl} type={typeof block.video === "object" ? block.video.asset?.mimeType : undefined} />
        </video>
      ) : null}
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
