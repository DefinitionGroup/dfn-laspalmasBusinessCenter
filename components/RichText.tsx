import { PortableText } from "@portabletext/react";
import type { RichText as RichTextValue } from "@/types/content";

export default function RichText({
  value,
  promoteFirstHeading = false,
}: {
  value?: RichTextValue;
  promoteFirstHeading?: boolean;
}) {
  if (!value) return null;
  if (typeof value === "string") return <p>{value}</p>;

  let promoted = false;
  const renderedValue = promoteFirstHeading
    ? value.map((block) => {
        if (!promoted && block._type === "block" && block.style === "h2") {
          promoted = true;
          return { ...block, style: "h1" };
        }
        return block;
      })
    : value;

  return (
    <PortableText
      value={renderedValue}
      components={{
        block: {
          normal: ({ children }) => <p>{children}</p>,
          h1: ({ children }) => <h1>{children}</h1>,
          h2: ({ children }) => <h2>{children}</h2>,
          h3: ({ children }) => <h3>{children}</h3>,
          h4: ({ children }) => <h4>{children}</h4>,
          blockquote: ({ children }) => <blockquote>{children}</blockquote>,
        },
        list: {
          bullet: ({ children }) => <ul>{children}</ul>,
          number: ({ children }) => <ol>{children}</ol>,
        },
        listItem: {
          bullet: ({ children }) => <li>{children}</li>,
          number: ({ children }) => <li>{children}</li>,
        },
        marks: {
          link: ({ children, value }) => (
            <a href={typeof value?.href === "string" ? value.href : undefined}>
              {children}
            </a>
          ),
        },
      }}
    />
  );
}
