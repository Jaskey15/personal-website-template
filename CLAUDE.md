# Personal Website Template - Claude Context

A clean, minimal personal website template with an interactive landing page and thoughtful design. Fork it and make it your own!

## Quick Reference

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 with warm minimal aesthetic
- **Typography:** Inter (body text) + Crimson Text (serif headings)
- **Content:** MDX with frontmatter (file-based CMS)
- **Theme:** Dark/light mode with `next-themes`
- **Animations:** framer-motion for interactive elements
- **UI:** shadcn/ui component library
- **Database:** Neon PostgreSQL (comment system)
- **Email:** Resend (contact form)

## Design Philosophy

- **Personal but professional** - Authentic voice with polished execution
- **Warm minimal aesthetic** - No pure black/white, generous whitespace
- **Interactive and engaging** - Smooth animations, thoughtful interactions
- **Simple to start, room to expand** - Clean foundation for growth

## Template Features

**What's Included:**
- ✅ Interactive landing page + theme system
- ✅ MDX content system (3 example meditation posts, 3 example portfolio projects)
- ✅ Comment system with threading (PostgreSQL) - **optional**
- ✅ Contact form with email (Resend) - **optional**
- ✅ Responsive navigation + slideshow component
- ✅ Component library (shadcn/ui + custom)
- ✅ Animation system (framer-motion)

**Getting Started:**
1. Replace placeholder content with your own (see example files for guidance)
2. Update personal info (name in header, etc.) - Note: social links are disabled placeholders
3. Optionally set up comment system and/or contact form (see `.env.example`)
4. Customize colors and typography in `app/globals.css` if desired

## Key Conventions

- **Path aliases:** Use `@/` for imports (e.g., `@/components`, `@/lib`)
- **TypeScript:** Strict mode enabled, full typing required
- **File structure:** App Router conventions (page.tsx, layout.tsx)
- **Styling:** Tailwind utility classes, CSS variables for theming
- **Content:** MDX files in `/content` with frontmatter metadata
  - Meditations support optional `popularity` field for manual curation/sorting
  - Posts default to sorting by date (newest first)

## Detailed Documentation

All documentation lives in the `docs/` directory:

- [docs/architecture.md](docs/architecture.md) - Architecture, tech stack, systems
- [docs/styling.md](docs/styling.md) - Tailwind patterns, animations, typography
- [docs/content-workflow.md](docs/content-workflow.md) - Content authoring guide
- [docs/components.md](docs/components.md) - Component patterns and library
- [docs/content-system.md](docs/content-system.md) - Content system internals

## Important Files

**Core Systems:**
- [lib/mdx.ts](lib/mdx.ts) - MDX content processing utilities (getPosts, getPostBySlug)
- [lib/db.ts](lib/db.ts) - Database layer for comment system (Neon PostgreSQL)
- [app/globals.css](app/globals.css) - Theme variables, animations, typography system
- [tailwind.config.ts](tailwind.config.ts) - Design tokens and configuration

**Key Directories:**
- `/components` - All React components (see [docs/components.md](docs/components.md))
- `/content` - MDX content files (see [docs/content-system.md](docs/content-system.md))
- `/app/api` - API routes for comments and contact form
