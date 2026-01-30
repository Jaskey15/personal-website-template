import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getAllSlugs, PortfolioFrontmatter } from "@/lib/mdx";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXLink } from "@/components/mdx-link";
import { Github } from "lucide-react";

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
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                className="object-cover"
                priority
              />
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
              <span
                className="inline-flex items-center gap-2 text-lg font-medium text-foreground/80 cursor-default"
              >
                View Live Dashboard →
              </span>
            </section>
          )}

          {/* GitHub Link Section */}
          {post.frontmatter.githubLink && (
            <section className="mb-12">
              <span
                className="inline-flex items-center gap-2 text-lg font-medium text-foreground/80 cursor-default"
              >
                <Github className="w-6 h-6" />
                View on GitHub
              </span>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
