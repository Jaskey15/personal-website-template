# Project Overview

High-level architecture, technology decisions, and system design for the personal website template.

**Related Documentation:**
- [styling.md](styling.md) - Tailwind patterns, theme colors, animations, typography
- [content-workflow.md](content-workflow.md) - Adding content, best practices, troubleshooting
- [components.md](components.md) - Component patterns and usage
- [content-system.md](content-system.md) - Content system, frontmatter schemas, MDX utilities

## Vision

A personal portfolio and blog that feels authentic, warm, and engaging. The site should reflect thoughtfulness in both content and execution -- simple enough to feel approachable, polished enough to feel professional.

## Technology Decisions

### Next.js 16 (App Router)

**Why App Router over Pages Router:** Server Components by default for better performance, simplified data fetching with async components, built-in loading/error states, nested layouts for consistent navigation, and file-system based routing with better conventions.

### TypeScript

Strict mode enabled. All content types, component props, and API payloads are fully typed. Path alias `@/*` maps to the project root.

### Tailwind CSS v4

**Why v4:** CSS variable-based color system (ideal for theming), improved performance and smaller bundles, and modern CSS features support. Dark mode uses the `class` strategy toggled via next-themes. See [styling.md](styling.md) for color variables, typography, and animation details.

### MDX Content System

**Why MDX over a CMS:** Content is version-controlled alongside code with no external dependencies. Authors write in Markdown with optional React components, frontmatter is type-safe, and pages are statically generated at build time for fast load times. See [content-system.md](content-system.md) for schemas and utilities.

### shadcn/ui

**Why shadcn/ui:** Copy-paste component library where you own the code. Built on Radix UI primitives (accessible by default), styled with Tailwind for design system consistency, and carries no runtime cost for unused components. See [components.md](components.md) for component details.

### framer-motion

**Why framer-motion:** Production-ready declarative animation library with gesture support, optimized for performance, and compatible with Server Component architecture (used in client components only). Powers the landing page animations, staggered fade-ins, and page transitions.

### Neon Database

**Why Neon:** Serverless PostgreSQL with zero-config autoscaling, a generous free tier for personal projects, edge-compatible via HTTP for Next.js Edge Runtime, and instant cold starts with no connection pooling needed.

**Role in the system:** Stores the comment system data -- threaded comments with self-referencing relationships and indexed queries for performance. Configured via the `DATABASE_URL` environment variable.

### Resend

**Why Resend:** Modern transactional email API with simple setup, excellent DX, TypeScript support, and a free tier of 100 emails/day (sufficient for a contact form). Requires domain verification for sender reputation.

**Role in the system:** Delivers contact form submissions as emails. Configured via the `RESEND_API_KEY` environment variable and DNS records (DKIM, SPF, optional DMARC) on a sending subdomain.

## Site Architecture

### Navigation Flow

```
Landing Page (/)
    |
"What brings you here?"
    |
+-------------+--------------+--------------+----------+
| About       | Portfolio    | Meditations  | Contact  |
| /about      | /portfolio   | /meditations | /contact |
+-------------+--------------+--------------+----------+
                     |                |
              /portfolio/[slug]  /meditations/[slug]
```

### Page Responsibilities

| Page | Purpose | Data Source |
|------|---------|-------------|
| `/` | Landing with interactive question | Static |
| `/about` | Bio and background with image slideshow | `content/about.md` |
| `/portfolio` | Project grid | `content/portfolio/*.mdx` |
| `/portfolio/[slug]` | Project detail | Individual MDX file |
| `/meditations` | Blog post list with sorting and pagination | `content/meditations/*.mdx` |
| `/meditations/[slug]` | Blog post with threaded comment system | MDX file + Neon database |
| `/contact` | Contact form with email delivery | Resend API via Next.js API route |

## Theme System

The site uses next-themes with the `class` strategy, defaulting to the user's OS preference. A theme provider wraps the app at the root layout level, and a toggle component lets users switch between light and dark modes. All theme colors are defined as CSS variables so every component is automatically theme-aware. See [styling.md](styling.md) for color values and typography details.

## Comment System

A full-stack threaded comment system for meditation (blog) posts.

**How it works:** Comments are stored in Neon PostgreSQL with a self-referencing foreign key for threading. The API layer provides routes for fetching comments by post slug, creating new comments or replies, deleting comments, and initializing the database schema. On the client side, a four-component architecture (container, list, item, form) fetches flat comment data from the API and builds the thread tree client-side with recursive rendering and visual indentation.

**Data flow:** Page load fetches comments by slug from the API. New comment submissions POST to the API, persist to Neon, and trigger a client-side refresh. Deleting a parent cascades to all replies at the database level.

See [components.md](components.md) for component-level details.

## Contact Form System

An email-based contact form using Resend for transactional delivery.

**How it works:** The contact page is a client component with controlled form inputs, client-side validation, and loading/success/error states. On submission, it POSTs name, email, and message to a Next.js API route. The API route validates the payload, sends a formatted email via Resend to the site owner (with reply-to set to the sender), and returns success or an error.

**DNS requirement:** A sending subdomain must be verified with Resend via DKIM and SPF DNS records.

## Content Processing

The MDX utility layer in `lib/mdx.ts` handles reading content files from disk, parsing frontmatter with gray-matter, and returning typed post data. It provides functions for listing all posts (sorted by date), fetching a single post by slug, and generating static params for build-time page generation. Custom MDX component overrides in `mdx-components.tsx` handle theme-aware rendering of headings, links, code blocks, tables, and other Markdown elements. See [content-system.md](content-system.md) for frontmatter schemas and utility signatures.

## Design Principles

**Visual:** Warm tones (no pure black or white), generous whitespace, clear size-based hierarchy, subtle smooth animations, and a mobile-first responsive approach.

**Code:** Prefer composition with small focused components, use Server Components unless interactivity is needed, type everything (no implicit `any`), use Tailwind utilities over custom CSS, and write semantic accessible HTML.

## File Organization

The project follows Next.js App Router conventions:

- **`/app`** -- Pages, layouts, global styles, and API routes
- **`/components`** -- All React components (page-level, shared, comment system, and shadcn/ui primitives in `/ui`)
- **`/content`** -- MDX and Markdown source files for meditations, portfolio, and about
- **`/lib`** -- Utilities for content processing (`mdx.ts`), database access (`db.ts`), and shared helpers (`utils.ts`)
- **`/public`** -- Static assets and images organized by section

## Future Considerations

- Search and tag/category filtering for meditations
- RSS feed for the blog
- Privacy-focused analytics
- OpenGraph images for social sharing
- Admin authentication for comment moderation
- If scaling past ~100 posts, consider search indexing and pagination enhancements
