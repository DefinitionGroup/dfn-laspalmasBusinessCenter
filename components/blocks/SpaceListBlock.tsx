import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { resolveImageUrl } from "@/sanity/lib/image";
import type { Locale, SpaceListBlock as SpaceListBlockType } from "@/types/content";

export default function SpaceListBlock({
  block,
  locale,
}: {
  block: SpaceListBlockType;
  locale: Locale;
}) {
  return (
    <section id={block._key} className="space-index page-gutter section-space">
      <Reveal className="section-heading">
        <p className="eyebrow">{block.eyebrow}</p>
        <h2>{block.headline}</h2>
        {block.intro ? <p>{block.intro}</p> : null}
      </Reveal>
      <div className="space-index__list">
        {block.spaces.map((space, index) => {
          const imageUrl = resolveImageUrl(space.image, { width: 1000, height: 700 });
          return (
            <Reveal key={space._id} delay={index * 0.06}>
              <Link href={`/${locale}/${space.slug}`} className="space-index__item">
                <span className="space-index__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="space-index__copy">
                  <strong>{space.title}</strong>
                  {space.summary ? <span>{space.summary}</span> : null}
                </span>
                {imageUrl ? (
                  <span className="space-index__media">
                    <Image src={imageUrl} alt={space.imageAlt || ""} fill sizes="(max-width: 800px) 42vw, 280px" />
                  </span>
                ) : null}
                <span className="space-index__arrow" aria-hidden="true">↗</span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
