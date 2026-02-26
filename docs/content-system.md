# Content System

This directory contains all the site's content written in MDX (Markdown + JSX).

## Directory Structure

```
/content
  ├── meditations/          # Blog posts
  │   ├── .gitkeep
  │   └── [slug].mdx        # Individual posts
  │
  ├── portfolio/            # Portfolio projects
  │   ├── .gitkeep
  │   └── [slug].mdx        # Individual projects
  │
  └── about.md              # About page content
```

## File Naming Convention

- **Slugs become URLs:** `my-first-post.mdx` → `/meditations/my-first-post`
- **Use kebab-case:** lowercase with hyphens
- **Be descriptive:** `authentication-system.mdx` not `auth.mdx`
- **Avoid dates in filenames:** Use frontmatter `date` field instead

## Frontmatter Schemas

### Meditation (Blog Post)

**Location:** `content/meditations/[slug].mdx`

**Schema:** (defined in [lib/mdx.ts:7-18](../lib/mdx.ts#L7-L18))

```typescript
interface MeditationFrontmatter {
  title: string
  date: string        // ISO format: "2024-01-15"
  excerpt: string     // Short description for cards/previews
  image?: string      // Optional cover image path
  tags?: string[]     // ["reflection", "tech", "philosophy"]
  popularity?: number // Manual popularity score (higher = more popular)
  influences?: Array<{
    title: string
    link: string
  }>
}
```

**Example:**

```mdx
---
title: "On Building Personal Websites"
date: "2024-03-15"
excerpt: "Thoughts on crafting a digital home that feels authentic and intentional."
image: "/images/meditations/building-websites.jpg"
tags: ["web", "design", "reflection"]
popularity: 95
---

Your content here in Markdown format.

## You can use headings

And all standard Markdown features.
```

### Portfolio Project

**Location:** `content/portfolio/[slug].mdx`

**Schema:** (defined in [lib/mdx.ts:11-21](../lib/mdx.ts#L11-L21))

```typescript
interface PortfolioFrontmatter {
  title: string
  date: string            // ISO format: "2024-01-15"
  excerpt?: string        // Short description for cards
  tags?: string[]         // ["react", "typescript", "api"]
  role?: string           // "Lead Developer", "Designer", etc.
  company?: string        // "Acme Corp", "Personal Project"
  technologies?: string[] // ["Next.js", "PostgreSQL", "Tailwind"]
  featured?: boolean      // Display prominently
  image?: string          // Optional cover image path
  problem?: string        // Problem statement for case studies
  solution?: string       // Solution description for case studies
  githubLink?: string     // Link to GitHub repository
  projectLink?: string    // Link to live project
}
```

**Example:**

```mdx
---
title: "E-commerce Platform Redesign"
date: "2024-02-20"
excerpt: "Complete redesign and rebuild of a high-traffic e-commerce platform."
tags: ["react", "typescript", "e-commerce"]
role: "Lead Frontend Developer"
company: "Acme Corp"
technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe"]
featured: true
image: "/images/portfolio/ecommerce.png"
problem: "The existing platform had poor performance and outdated UX patterns"
solution: "Rebuilt with modern React patterns and optimized for performance"
githubLink: "https://github.com/example/project"
projectLink: "https://example.com"
---

## Project Overview

Brief description of the project...

## Challenge

What problem were you solving?

## Solution

How did you approach it?

## Results

What was the impact?
```

### Post Type Interfaces

**Defined in:** [lib/mdx.ts:36-46](../lib/mdx.ts#L36-L46)

Complete post objects returned by utility functions:

```typescript
interface MeditationPost {
  slug: string
  frontmatter: MeditationFrontmatter
  content: string
}

interface PortfolioPost {
  slug: string
  frontmatter: PortfolioFrontmatter
  content: string
}
```

These interfaces represent the complete structure of posts returned by `getPosts()` and `getPostBySlug()`.

## MDX Processing Utilities

**File:** [lib/mdx.ts](../lib/mdx.ts)

### `getPosts<T>(type: string)`

Retrieves all posts of a given type, sorted by date (newest first).

**Usage:**

```typescript
import { getPosts } from '@/lib/mdx'
import { MeditationFrontmatter } from '@/lib/mdx'

// In a Server Component
const meditations = await getPosts<MeditationFrontmatter>('meditations')
const portfolioProjects = await getPosts<PortfolioFrontmatter>('portfolio')
```

**Returns:**

```typescript
{
  slug: string           // Filename without extension
  frontmatter: T         // Parsed frontmatter (typed)
  content: string        // Raw MDX content
}[]
```

**Implementation:** ([lib/mdx.ts:23-52](../lib/mdx.ts#L23-L52))
- Reads `/content/{type}/` directory
- Filters `.mdx` files
- Parses frontmatter with `gray-matter`
- Sorts by `date` field (descending)

### `getPostBySlug<T>(type: string, slug: string)`

Retrieves a single post by its slug.

**Usage:**

```typescript
import { getPostBySlug } from '@/lib/mdx'

// In a dynamic route: app/meditations/[slug]/page.tsx
const post = await getPostBySlug<MeditationFrontmatter>('meditations', params.slug)

if (!post) {
  notFound()  // Show 404 page
}
```

**Returns:**

```typescript
{
  slug: string
  frontmatter: T
  content: string
} | null
```

**Implementation:** ([lib/mdx.ts:54-72](../lib/mdx.ts#L54-L72))
- Reads single file: `/content/{type}/{slug}.mdx`
- Returns `null` if file doesn't exist
- Parses frontmatter and content

### `getAllSlugs(type: string)`

Gets all available slugs for static generation.

**Usage:**

```typescript
import { getAllSlugs } from '@/lib/mdx'

// In a dynamic route for static generation
export async function generateStaticParams() {
  const slugs = await getAllSlugs('meditations')
  return slugs.map((slug) => ({ slug }))
}
```

**Returns:**

```typescript
string[]  // ["first-post", "second-post", ...]
```

**Implementation:** ([lib/mdx.ts:74-83](../lib/mdx.ts#L74-L83))
- Reads `/content/{type}/` directory
- Returns array of filenames without `.mdx` extension
- Used by Next.js to pre-render pages at build time

## Custom MDX Components

**Approach:** Page-specific MDX component definitions for flexibility.

**Typography System:** Components inherit from `.article-content` class (16px) rather than explicit text sizes for sustainability and modularity.

### Current Implementation

**Meditation Articles:** [app/meditations/[slug]/page.tsx](../app/meditations/[slug]/page.tsx)

```tsx
const components = {
  p: (props: any) => (
    <p className="text-foreground/90" {...props} />  // Inherits 16px from .article-content
  ),
  ul: (props: any) => (
    <ul className="mb-6 ml-8 space-y-3 text-foreground/80 list-disc" {...props} />
  ),
  // ... other elements
}

// Usage:
<div className="article-content prose">
  <MDXRemote source={content} components={components} />
</div>
```

**Portfolio Articles:** [app/portfolio/[slug]/page.tsx](../app/portfolio/[slug]/page.tsx)

```tsx
const components = {
  p: (props: any) => (
    <p className="text-foreground/90" {...props} />  // Inherits from .article-content
  ),
  // ... other elements
}
```

**About Page:** [app/about/page.tsx](../app/about/page.tsx)

```tsx
const mdxComponents = {
  p: ({ children }: any) => (
    <p className="text-muted-foreground tracking-wide">{children}</p>
  ),
  a: MDXLink,
}

// Wrapper has article-content class
<div className="article-content">
  <MDXRemote source={paragraph} components={mdxComponents} />
</div>
```

### Legacy Pattern (Deprecated)

```tsx
// ❌ Old - Explicit text sizes
p: ({ children }) => (
  <p className="text-[1.25rem] leading-[1.8]">{children}</p>
)
```

**Why Changed:**
- Explicit sizes scattered across files = hard to maintain
- Changing text size required editing multiple components
- New approach: single source of truth in globals.css

**Links:**
```tsx
a: ({ href, children }) => {
  const isExternal = href?.startsWith('http')
  return (
    <a
      href={href}
      className="text-primary hover:underline"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
      {isExternal && <ExternalLink className="inline h-4 w-4 ml-1" />}
    </a>
  )
}
```

**Code Blocks:**
```tsx
code: ({ className, children }) => (
  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
    {children}
  </code>
)

pre: ({ children }) => (
  <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
    {children}
  </pre>
)
```

**Lists:**
```tsx
ul: ({ children }) => (
  <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
)

ol: ({ children }) => (
  <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
)
```

**Other Elements:**
- Blockquotes (styled with border-left)
- Tables (responsive with styled headers)
- Images (full-width, rounded)
- Horizontal rules (styled dividers)

### Adding Custom Components

You can use React components directly in MDX:

**In your MDX file:**
```mdx
---
title: "My Post"
---

import { CustomComponent } from '@/components/custom-component'

## Regular Markdown

<CustomComponent>
  Custom React components work inline!
</CustomComponent>

More markdown here...
```

**Example Use Cases:**
- Embedded videos
- Interactive demos
- Image galleries
- Charts/visualizations
- Call-to-action sections

## Dynamic Routes

### List Page Pattern

**File:** `app/meditations/page.tsx`

**Modern Pattern (Current):**

Using the `MeditationsList` component for better separation of concerns:

```typescript
import { MeditationsList } from '@/components/meditations-list'
import { PageContainer } from '@/components/page-container'
import { getPosts, type MeditationFrontmatter } from '@/lib/mdx'

export default function MeditationsPage() {
  const meditations = getPosts<MeditationFrontmatter>('meditations')

  return (
    <PageContainer maxWidth="7xl" padding="px-8 md:px-12 lg:px-16">
      <MeditationsList meditations={meditations} />
    </PageContainer>
  )
}
```

**Legacy Pattern (Still Valid):**

Direct mapping approach for simpler use cases:

```typescript
import { getPosts } from '@/lib/mdx'
import { MeditationFrontmatter } from '@/lib/mdx'
import MeditationCard from '@/components/meditation-card'

export default function MeditationsPage() {
  const meditations = getPosts<MeditationFrontmatter>('meditations')

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meditations.map((post) => (
        <MeditationCard
          key={post.slug}
          slug={post.slug}
          title={post.frontmatter.title}
          excerpt={post.frontmatter.excerpt}
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
        />
      ))}
    </div>
  )
}
```

### Detail Page Pattern

**File:** `app/meditations/[slug]/page.tsx`

```typescript
import { getPostBySlug, getAllSlugs } from '@/lib/mdx'
import { MeditationFrontmatter } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { CommentsSection } from '@/components/comments-section'
import { notFound } from 'next/navigation'

// Generate static pages at build time
export async function generateStaticParams() {
  const slugs = await getAllSlugs('meditations')
  return slugs.map((slug) => ({ slug }))
}

export default async function MeditationPost({
  params
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug<MeditationFrontmatter>('meditations', params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article>
      <header>
        <h1>{post.frontmatter.title}</h1>
        <time>{post.frontmatter.date}</time>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>

      {/* Interactive comment system */}
      <CommentsSection postSlug={params.slug} postTitle={post.frontmatter.title} />
    </article>
  )
}
```

**Comment System Integration:**
- Meditation posts include threaded comment discussions
- Comments stored in Neon PostgreSQL database
- See [architecture.md](architecture.md#comment-system) for architecture details

## Extending the Content System

### Adding a New Content Type

Example: Adding a "Notes" section

1. **Create directory:**
   ```bash
   mkdir content/notes
   ```

2. **Define frontmatter interface:** ([lib/mdx.ts](../lib/mdx.ts))
   ```typescript
   export interface NoteFrontmatter {
     title: string
     date: string
     topic: string
   }
   ```

3. **Create list page:** `app/notes/page.tsx`
   ```typescript
   const notes = await getPosts<NoteFrontmatter>('notes')
   ```

4. **Create detail page:** `app/notes/[slug]/page.tsx`
   ```typescript
   const note = await getPostBySlug<NoteFrontmatter>('notes', params.slug)
   ```

5. **Add to navigation**

### Adding Metadata Fields

To add a new field to existing content:

1. **Update interface in [lib/mdx.ts](../lib/mdx.ts):**
   ```typescript
   export interface MeditationFrontmatter {
     title: string
     date: string
     excerpt: string
     tags: string[]
     readingTime?: number  // New field
   }
   ```

2. **Add to frontmatter:**
   ```mdx
   ---
   title: "Post Title"
   readingTime: 5
   ---
   ```

3. **Display in components:**
   ```tsx
   <p>{post.frontmatter.readingTime} min read</p>
   ```
