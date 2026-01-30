import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MeditationFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  tags?: string[];
  popularity?: number;
  draft?: boolean;
  influences?: Array<{
    title: string;
    link: string;
  }>;
  notes?: {
    text: string;
    name: string;
    link: string;
  };
}

export interface PortfolioFrontmatter {
  title: string;
  date: string;
  image?: string;
  excerpt?: string;
  tags?: string[];
  role?: string;
  company?: string;
  technologies?: string[];
  featured?: boolean;
  problem?: string;
  solution?: string;
  githubLink?: string;
  projectLink?: string;
}

export interface MeditationPost {
  slug: string;
  frontmatter: MeditationFrontmatter;
  content: string;
}

export interface PortfolioPost {
  slug: string;
  frontmatter: PortfolioFrontmatter;
  content: string;
}

/**
 * Get all posts from a specific content type directory
 */
export function getPosts<T>(type: 'meditations' | 'portfolio'): Array<{
  slug: string;
  frontmatter: T;
  content: string;
}> {
  const postsDirectory = path.join(contentDirectory, type);

  // Return empty array if directory doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

  const posts = mdxFiles.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as T,
      content,
    };
  });

  // Filter out draft posts
  const publishedPosts = posts.filter((post) => !(post.frontmatter as any).draft);

  // Sort posts by date (newest first), then by popularity
  return publishedPosts.sort((a, b) => {
    const dateA = new Date((a.frontmatter as any).date);
    const dateB = new Date((b.frontmatter as any).date);
    const dateDiff = dateB.getTime() - dateA.getTime();

    // If dates are the same, sort by popularity (lower first)
    if (dateDiff === 0) {
      const popA = (a.frontmatter as any).popularity ?? 0;
      const popB = (b.frontmatter as any).popularity ?? 0;
      return popA - popB;
    }

    return dateDiff;
  });
}

/**
 * Get a single post by slug
 */
export function getPostBySlug<T>(
  type: 'meditations' | 'portfolio',
  slug: string
): { slug: string; frontmatter: T; content: string } | null {
  const postsDirectory = path.join(contentDirectory, type);
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as T,
    content,
  };
}

/**
 * Get all slugs for a content type
 */
export function getAllSlugs(type: 'meditations' | 'portfolio'): string[] {
  const postsDirectory = path.join(contentDirectory, type);

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}
