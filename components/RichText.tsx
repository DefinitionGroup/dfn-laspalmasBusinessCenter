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
          h3: ({ children }) => <h3>{children}</h3>,
        },
      }}
    />
  );
}
