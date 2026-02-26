# Content System

Single source of truth for frontmatter schemas, MDX utilities, custom components, and dynamic route conventions.

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

## File Naming Conventions

- **Slugs become URLs:** `my-first-post.mdx` → `/meditations/my-first-post`
- **Use kebab-case:** lowercase with hyphens
- **Be descriptive:** `authentication-system.mdx` not `auth.mdx`
- **Avoid dates in filenames:** Use frontmatter `date` field instead

## Frontmatter Schemas

### Meditation (Blog Post)

**Location:** `content/meditations/[slug].mdx` | **Schema:** [lib/mdx.ts:7-18](../lib/mdx.ts#L7-L18)

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

**Example frontmatter:**

```yaml
---
title: "On Building Personal Websites"
date: "2024-03-15"
excerpt: "Thoughts on crafting a digital home that feels authentic."
image: "/images/meditations/building-websites.jpg"
tags: ["web", "design", "reflection"]
popularity: 95
---
```

### Portfolio Project

**Location:** `content/portfolio/[slug].mdx` | **Schema:** [lib/mdx.ts:11-21](../lib/mdx.ts#L11-L21)

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

### Post Type Interfaces

Defined in [lib/mdx.ts:36-46](../lib/mdx.ts#L36-L46). Complete post objects returned by utility functions:

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

## MDX Processing Utilities

**File:** [lib/mdx.ts](../lib/mdx.ts)

### `getPosts<T>(type: string)`

Retrieves all posts of a given type, sorted by date (newest first). Reads `/content/{type}/`, filters `.mdx` files, parses frontmatter with `gray-matter`, and sorts by `date` descending.

```typescript
import { getPosts, type MeditationFrontmatter } from '@/lib/mdx'

const meditations = await getPosts<MeditationFrontmatter>('meditations')
const projects = await getPosts<PortfolioFrontmatter>('portfolio')
```

### `getPostBySlug<T>(type: string, slug: string)`

Retrieves a single post by slug. Returns `null` if the file doesn't exist.

```typescript
import { getPostBySlug, type MeditationFrontmatter } from '@/lib/mdx'

const post = await getPostBySlug<MeditationFrontmatter>('meditations', params.slug)
if (!post) notFound()
```

### `getAllSlugs(type: string)`

Returns all slugs (filenames without `.mdx`) for static generation.

```typescript
import { getAllSlugs } from '@/lib/mdx'

export async function generateStaticParams() {
  const slugs = await getAllSlugs('meditations')
  return slugs.map((slug) => ({ slug }))
}
```

## Custom MDX Components

**Approach:** MDX components are defined per-page rather than globally. This gives each content type full control over its own rendering.

**Typography system:** Components inherit from the `.article-content` CSS class (defined in `globals.css`) rather than using explicit text sizes. This keeps typography maintainable from a single source of truth.

**Rendering pattern:** Each detail page defines a `components` object and passes it to `MDXRemote`:

```tsx
const components = {
  p: (props: any) => <p className="text-foreground/90" {...props} />,
  ul: (props: any) => <ul className="mb-6 ml-8 space-y-3 list-disc" {...props} />,
  // ... other element overrides
}

<MDXRemote source={content} components={components} />
```

See the actual page files for full component maps:
- **Meditations:** [app/meditations/[slug]/page.tsx](../app/meditations/[slug]/page.tsx)
- **Portfolio:** [app/portfolio/[slug]/page.tsx](../app/portfolio/[slug]/page.tsx)
- **About:** [app/about/page.tsx](../app/about/page.tsx)

### Using React Components in MDX

You can import and use React components directly in `.mdx` files:

```mdx
---
title: "My Post"
---

import { CustomComponent } from '@/components/custom-component'

## Regular Markdown

<CustomComponent>
  Custom React components work inline!
</CustomComponent>
```

Useful for embedded videos, interactive demos, image galleries, or charts.

## Dynamic Routes

Content types follow the standard Next.js App Router pattern:

| Route | Purpose | Key function |
|---|---|---|
| `app/{type}/page.tsx` | List page | `getPosts<T>(type)` |
| `app/{type}/[slug]/page.tsx` | Detail page | `getPostBySlug<T>(type, slug)` |

Detail pages use `generateStaticParams()` with `getAllSlugs()` to pre-render at build time. See the actual page files for implementation details.

## Extending the Content System

### Adding a New Content Type

Example: Adding a "Notes" section.

1. **Create directory:** `mkdir content/notes`

2. **Define frontmatter interface** in [lib/mdx.ts](../lib/mdx.ts):
   ```typescript
   export interface NoteFrontmatter {
     title: string
     date: string
     topic: string
   }
   ```

3. **Create list page** at `app/notes/page.tsx`:
   ```typescript
   const notes = await getPosts<NoteFrontmatter>('notes')
   ```

4. **Create detail page** at `app/notes/[slug]/page.tsx`:
   ```typescript
   const note = await getPostBySlug<NoteFrontmatter>('notes', params.slug)
   ```

5. **Add to navigation**

### Adding Metadata Fields

To add a field to an existing content type:

1. **Update the interface** in [lib/mdx.ts](../lib/mdx.ts):
   ```typescript
   export interface MeditationFrontmatter {
     // ... existing fields
     readingTime?: number  // New field
   }
   ```

2. **Add to frontmatter** in your `.mdx` files:
   ```yaml
   ---
   title: "Post Title"
   readingTime: 5
   ---
   ```

3. **Display in components:**
   ```tsx
   <p>{post.frontmatter.readingTime} min read</p>
   ```
