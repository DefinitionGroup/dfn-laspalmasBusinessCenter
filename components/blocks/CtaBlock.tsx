import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/motion/Reveal";
import type { CtaBlock as CtaBlockType } from "@/types/content";

export default function CtaBlock({ block }: { block: CtaBlockType }) {
  return (
    <section className="cta-block page-gutter section-space">
      <Reveal className="cta-block__inner">
        <p className="eyebrow">{block.eyebrow}</p>
        <h2>{block.headline}</h2>
        {block.body ? <p>{block.body}</p> : null}
        <div className="cta-block__actions">
          <ActionLink link={block.primaryCta} />
          {block.secondaryCta ? <ActionLink link={block.secondaryCta} variant="secondary" /> : null}
        </div>
      </Reveal>
    </section>
  );
}
