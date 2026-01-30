import Link from "next/link";
import Image from "next/image";

interface MeditationCardProps {
  title: string;
  image: string;
  slug: string;
  excerpt?: string;
}

export function MeditationCard({ title, image, slug, excerpt }: MeditationCardProps) {
  return (
    <Link
      href={`/meditations/${slug}`}
      className="group block"
      style={{ viewTransitionName: `meditation-${slug}` } as React.CSSProperties}
    >
      <article className="space-y-6 transition-all duration-500 ease-out hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-border/20">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-[1.02] dark:group-hover:brightness-[1.08]"
          />

          {/* Warm atmospheric overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3 px-1">
          {/* Title */}
          <h3 className="font-serif font-semibold text-[1.5rem] md:text-[1.70rem] leading-tight tracking-[-0.01em] underline decoration-1 underline-offset-4 decoration-muted-foreground/40 md:no-underline">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-muted-foreground text-[0.875rem] md:text-[0.9375rem] leading-relaxed tracking-wide line-clamp-2">
              {excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
