import Link from "next/link";

interface MDXLinkProps {
  href?: string;
  children?: React.ReactNode;
}

export function MDXLink({ href, children }: MDXLinkProps) {
  const isExternal = href?.startsWith('http');
  const Component = isExternal ? 'a' : Link;

  return (
    <Component
      href={href || '#'}
      className="text-[hsl(var(--color-link))] hover:opacity-80 transition-opacity"
      {...(isExternal && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
    >
      {children}
    </Component>
  );
}
