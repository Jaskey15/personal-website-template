import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getAllSlugs, PortfolioFrontmatter } from "@/lib/mdx";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXLink } from "@/components/mdx-link";

const components = {
  p: (props: any) => (
    <p className="text-foreground/90" {...props} />
  ),
  a: MDXLink,
  h2: (props: any) => (
    <h2
      className="font-serif text-3xl font-bold mt-12 mb-6 tracking-tight"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="mb-6 ml-8 space-y-3 text-foreground/80"
      style={{
        listStyleType: 'none',
        paddingLeft: '0',
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
      className="pl-6 relative before:content-['—'] before:absolute before:left-0 before:text-foreground/40 before:font-light"
      {...props}
    />
  ),
};

interface PortfolioPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("portfolio");
  return slugs.map((slug) => ({ slug }));
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { slug } = await params;
  const post = getPostBySlug<PortfolioFrontmatter>("portfolio", slug);

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
          </header>

          {/* Featured Image */}
          {post.frontmatter.image && (
            <div
              className="relative aspect-[4/3] mb-16 overflow-hidden rounded-[var(--radius-lg)] border border-border/20 shadow-sm"
            >
              {post.frontmatter.projectLink ? (
                <a
                  href={post.frontmatter.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full h-full"
                >
                  <Image
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover hover:opacity-90 transition-opacity"
                    priority
                  />
                </a>
              ) : (
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          )}

          {/* The Problem Section */}
          {post.frontmatter.problem && (
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold mb-6 tracking-tight">
                The Problem
              </h2>
              <div
                className="article-content prose prose-2xl dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight"
              >
                <MDXRemote source={post.frontmatter.problem} components={components} />
              </div>
            </section>
          )}

          {/* The Solution Section */}
          {post.frontmatter.solution && (
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold mb-6 tracking-tight">
                The Solution
              </h2>
              <div
                className="article-content prose prose-2xl dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight"
              >
                <MDXRemote source={post.frontmatter.solution} components={components} />
              </div>
            </section>
          )}

          {/* Project Link Section */}
          {post.frontmatter.projectLink && (
            <section className="mb-12">
              <a
                href={post.frontmatter.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                View Live Dashboard →
              </a>
            </section>
          )}

          {/* GitHub Link Section */}
          {post.frontmatter.githubLink && (
            <section className="mb-12">
              <a
                href={post.frontmatter.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
