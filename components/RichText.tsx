import { PortableText } from "@portabletext/react";
import type { RichText as RichTextValue } from "@/types/content";

export default function RichText({ value }: { value?: RichTextValue }) {
  if (!value) return null;
  if (typeof value === "string") return <p>{value}</p>;

  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => <p>{children}</p>,
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
