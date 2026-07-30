"use client";

import { motion, useReducedMotion } from "motion/react";
import type { AnimatedHeadlineBlock as AnimatedHeadlineBlockType } from "@/types/content";

const wordVariants = {
  hidden: {
    opacity: 0,
    transform: "translateY(105%)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0%)",
    transition: {
      duration: 0.76,
      ease: [0.62, 0.05, 0.01, 0.99] as const,
    },
  },
};

export default function AnimatedHeadlineBlock({
  block,
}: {
  block: AnimatedHeadlineBlockType;
}) {
  const reduceMotion = useReducedMotion();
  const words = block.headline.trim().split(/\s+/);
  const Heading = block.level === "h1" ? motion.h1 : motion.h2;

  return (
    <motion.section
      className="animated-headline-block page-gutter section-space"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: {
          transition: {
            delayChildren: 0.04,
            staggerChildren: 0.055,
          },
        },
      }}
    >
      {block.eyebrow ? (
        <motion.p className="eyebrow animated-headline-block__eyebrow" variants={wordVariants}>
          {block.eyebrow}
        </motion.p>
      ) : null}
      <Heading aria-label={block.headline}>
        <span className="animated-headline-block__text" aria-hidden="true">
          {words.map((word, index) => (
            <span className="animated-headline-block__word-mask" key={`${word}-${index}`}>
              <motion.span className="animated-headline-block__word" variants={wordVariants}>
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      </Heading>
    </motion.section>
  );
}
