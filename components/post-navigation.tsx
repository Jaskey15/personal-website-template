import Link from "next/link";
import { getPosts, MeditationFrontmatter, PortfolioFrontmatter } from "@/lib/mdx";

interface PostNavigationProps {
  currentSlug: string;
  contentType: "meditations" | "portfolio";
}

export function PostNavigation({ currentSlug, contentType }: PostNavigationProps) {
  const posts = getPosts<MeditationFrontmatter | PortfolioFrontmatter>(contentType);

  // Find current post index
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  // If post not found or only one post exists, don't render navigation
  if (currentIndex === -1 || posts.length <= 1) {
    return null;
  }

  // Previous post is at index - 1 (older post)
  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  // Next post is at index + 1 (newer post)
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // Don't render if no navigation is available
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav
      className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-6"
      aria-label="Post navigation"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Previous Post Link */}
        {previousPost ? (
          <Link
            href={`/${contentType}/${previousPost.slug}`}
            className="group flex items-center gap-3 text-left transition-all hover:translate-x-[-4px]"
            aria-label={`Previous post: ${previousPost.frontmatter.title}`}
          >
            <span className="text-2xl text-muted-foreground group-hover:text-foreground transition-colors">
              ‹
            </span>
            <span className="text-[1.25rem] leading-[1.8] text-foreground/90 font-bold group-hover:text-foreground transition-colors">
              {previousPost.frontmatter.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {/* Next Post Link */}
        {nextPost ? (
          <Link
            href={`/${contentType}/${nextPost.slug}`}
            className="group flex items-center justify-end gap-3 text-right transition-all hover:translate-x-[4px] md:col-start-2"
            aria-label={`Next post: ${nextPost.frontmatter.title}`}
          >
            <span className="text-[1.25rem] leading-[1.8] text-foreground/90 font-bold group-hover:text-foreground transition-colors">
              {nextPost.frontmatter.title}
            </span>
            <span className="text-2xl text-muted-foreground group-hover:text-foreground transition-colors">
              ›
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
