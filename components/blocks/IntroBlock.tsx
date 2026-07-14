import Reveal from "@/components/motion/Reveal";
import RichText from "@/components/RichText";
import type { IntroBlock as IntroBlockType } from "@/types/content";

export default function IntroBlock({ block }: { block: IntroBlockType }) {
  return (
    <section className="editorial-intro page-gutter section-space">
      <Reveal className="editorial-intro__grid">
        <p className="eyebrow">{block.eyebrow}</p>
        <h2>{block.headline}</h2>
        <div className="rich-text editorial-intro__body"><RichText value={block.body} /></div>
      </Reveal>
    </section>
  );
}
