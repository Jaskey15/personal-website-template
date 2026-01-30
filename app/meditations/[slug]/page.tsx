import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getAllSlugs, MeditationFrontmatter } from "@/lib/mdx";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostNavigation } from "@/components/post-navigation";
import { CommentsSection } from "@/components/comments-section";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXLink } from "@/components/mdx-link";

const components = {
  p: (props: any) => {
    // Check if this paragraph contains "Total weight:" for special styling
    const text = typeof props.children === 'string' ? props.children : '';
    const isTotalWeight = text.includes('Total weight:');

    if (isTotalWeight) {
      return (
        <p
          className="mb-12 ml-8 text-foreground/70 italic font-light tracking-wide"
          {...props}
        />
      );
    }

    return <p className="text-foreground/90" {...props} />;
  },
  a: MDXLink,
  ul: (props: any) => (
    <ul
      className="mb-6 ml-8 space-y-3 text-foreground/80 list-disc"
      style={{
        paddingLeft: '1.5rem',
      }}
      {...props}
    >
      {props.children}
    </ul>
  ),
  ol: (props: any) => (
    <ol
      className="mb-6 ml-8 list-decimal space-y-3 text-foreground/80"
      {...props}
    />
  ),
  li: (props: any) => (
    <li
      {...props}
    />
  ),
};

interface MeditationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("meditations");
  return slugs.map((slug) => ({ slug }));
}

export default async function MeditationPage({ params }: MeditationPageProps) {
  const { slug } = await params;
  const post = getPostBySlug<MeditationFrontmatter>("meditations", slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 py-6 md:py-12 animate-fade-in-subtle">
          {/* Header */}
          <header className="mb-10">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1]">
              {post.frontmatter.title}
            </h1>
            <time className="text-muted-foreground/80 tracking-wide uppercase text-base md:text-lg font-medium">
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </time>
          </header>

          {/* Featured Image */}
          {post.frontmatter.image && (
            <div
              className="relative aspect-[4/3] mb-16 overflow-hidden rounded-[var(--radius-lg)] border border-border/20 shadow-sm"
            >
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="article-content prose prose-2xl dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight"
          >
            <MDXRemote source={post.content} components={components} />
          </div>

          {/* Notes */}
          {post.frontmatter.notes && (
            <div className="mt-12 pt-8 article-content">
              <p className="text-foreground/90">
                <strong>Notes:</strong> {post.frontmatter.notes.text}{' '}
                <a
                  href={post.frontmatter.notes.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--color-link))] hover:opacity-80 transition-opacity"
                >
                  {post.frontmatter.notes.name}
                </a>
              </p>
            </div>
          )}

          {/* Influences */}
          {post.frontmatter.influences && post.frontmatter.influences.length > 0 && (
            <div className="mt-12 pt-8 article-content">
              <p className="text-foreground/90">
                <strong>Influences:</strong>{' '}
                {post.frontmatter.influences.map((influence, index) => {
                  const isLast = index === (post.frontmatter.influences?.length ?? 0) - 1;
                  return (
                    <span key={index}>
                      <a
                        href={influence.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[hsl(var(--color-link))] hover:opacity-80 transition-opacity"
                      >
                        {influence.title}
                      </a>
                      {!isLast && ', '}
                    </span>
                  );
                })}
              </p>
            </div>
          )}
        </article>

        {/* Post Navigation */}
        <PostNavigation currentSlug={slug} contentType="meditations" />

        {/* Comments */}
        <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 pb-12">
          <CommentsSection postSlug={slug} postTitle={post.frontmatter.title} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
