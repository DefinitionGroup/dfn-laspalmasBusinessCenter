import Reveal from "@/components/motion/Reveal";
import type { TestimonialBlock as TestimonialBlockType } from "@/types/content";

export default function TestimonialBlock({ block }: { block: TestimonialBlockType }) {
  return (
    <section className="testimonial-block section-space page-gutter">
      <Reveal>
        <p className="eyebrow">{block.eyebrow}</p>
        {block.headline ? <h2>{block.headline}</h2> : null}
      </Reveal>
      {block.testimonials.map((testimonial) => (
        <Reveal key={testimonial._id} className="testimonial-block__quote">
          <blockquote>“{testimonial.quote}”</blockquote>
          <p>
            <strong>{testimonial.name}</strong>
            {[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}
          </p>
        </Reveal>
      ))}
    </section>
  );
}
