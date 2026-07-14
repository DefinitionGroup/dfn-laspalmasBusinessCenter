import Reveal from "@/components/motion/Reveal";
import type { FeatureListBlock as FeatureListBlockType } from "@/types/content";

export default function FeatureListBlock({ block }: { block: FeatureListBlockType }) {
  return (
    <section className="feature-list section-space page-gutter">
      <Reveal className="section-heading section-heading--narrow">
        <p className="eyebrow">{block.eyebrow}</p>
        <h2>{block.headline}</h2>
        {block.intro ? <p>{block.intro}</p> : null}
      </Reveal>
      <div className="feature-list__items">
        {block.items.map((item, index) => (
          <Reveal key={item._key} className="feature-list__item" delay={index * 0.05}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            {item.text ? <p>{item.text}</p> : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
