import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/motion/Reveal";
import type { LocationBlock as LocationBlockType } from "@/types/content";

export default function LocationBlock({ block }: { block: LocationBlockType }) {
  return (
    <section className="location-block section-space page-gutter">
      <Reveal className="location-block__intro">
        <p className="eyebrow">{block.eyebrow}</p>
        <h2>{block.headline}</h2>
        {block.body ? <p>{block.body}</p> : null}
      </Reveal>
      <Reveal className="location-block__details">
        <p>{block.address}</p>
        {block.details?.map((detail) => (
          <div key={detail._key}><span>{detail.label}</span><strong>{detail.value}</strong></div>
        ))}
        {block.mapUrl ? <ActionLink link={{ label: "Google Maps", href: block.mapUrl }} variant="text" /> : null}
      </Reveal>
    </section>
  );
}
