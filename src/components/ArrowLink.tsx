import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ArrowLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "solid" | "outline" | "text";
};

export function ArrowLink({
  children,
  className = "",
  variant = "solid",
  ...props
}: ArrowLinkProps) {
  return (
    <a className={`arrow-link arrow-link--${variant} ${className}`} {...props}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
    </a>
  );
}
