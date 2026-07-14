import Image from "next/image";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/motion/Reveal";
import RichText from "@/components/RichText";
import { resolveImageUrl } from "@/sanity/lib/image";
import type { SplitContentBlock as SplitContentBlockType } from "@/types/content";

export default function SplitContentBlock({ block }: { block: SplitContentBlockType }) {
  const imageUrl = resolveImageUrl(block.image, { width: 1600, height: 1200 });
  if (!imageUrl) return null;

  return (
    <section className={`split-content split-content--${block.tone || "paper"} section-space page-gutter`}>
      <div className={`split-content__grid ${block.reverse ? "split-content__grid--reverse" : ""}`}>
        <Reveal className="split-content__copy">
          <p className="eyebrow">{block.eyebrow}</p>
          <h2>{block.headline}</h2>
          <div className="rich-text"><RichText value={block.body} /></div>
          {block.cta ? <ActionLink link={block.cta} variant="text" /> : null}
        </Reveal>
        <Reveal className="split-content__media" delay={0.08}>
          <Image src={imageUrl} alt={block.imageAlt} fill sizes="(max-width: 800px) 100vw, 55vw" />
        </Reveal>
      </div>
    </section>
  );
}
