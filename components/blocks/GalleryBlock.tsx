import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { resolveImageUrl } from "@/sanity/lib/image";
import type { GalleryBlock as GalleryBlockType } from "@/types/content";

export default function GalleryBlock({ block }: { block: GalleryBlockType }) {
  return (
    <section className="gallery-block page-gutter section-space">
      <Reveal className="section-heading">
        <p className="eyebrow">{block.eyebrow}</p>
        <h2>{block.headline}</h2>
      </Reveal>
      <div className="gallery-block__grid">
        {block.images.map((item, index) => {
          const imageUrl = resolveImageUrl(item.image, { width: 1600, height: 1200 });
          if (!imageUrl) return null;
          return (
            <Reveal key={item._key} className="gallery-block__item" delay={index * 0.06}>
              <Image src={imageUrl} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 50vw" />
              {item.caption ? <p>{item.caption}</p> : null}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
