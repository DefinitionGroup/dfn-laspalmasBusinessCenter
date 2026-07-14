import Link from "next/link";
import type { LinkField } from "@/types/content";

export default function ActionLink({
  link,
  variant = "primary",
}: {
  link: LinkField;
  variant?: "primary" | "secondary" | "text";
}) {
  const className = `action-link action-link--${variant}`;
  const external = /^(https?:|mailto:|tel:)/.test(link.href);

  if (external) {
    return (
      <a className={className} href={link.href}>
        <span>{link.label}</span>
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link className={className} href={link.href}>
      <span>{link.label}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
