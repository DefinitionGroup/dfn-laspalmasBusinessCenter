import RichText from "@/components/RichText";
import type { PortableTextBlock as PortableTextBlockType } from "@/types/content";

export default function PortableTextBlock({
  block,
}: {
  block: PortableTextBlockType;
}) {
  return (
    <section className="portable-text-block page-gutter section-space">
      <div className="portable-text-block__inner rich-text">
        <RichText value={block.body} />
      </div>
    </section>
  );
}
