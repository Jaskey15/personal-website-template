# Documentation Index

Welcome to the personal website documentation. This guide is organized into focused documents to make information easy to find.

## Quick Start

**Building a new feature?** Start with [project-overview.md](project-overview.md) to understand the architecture, then check [components/README.md](../components/README.md) for component patterns.

**Adding content?** Jump straight to [content-workflow.md](content-workflow.md) for step-by-step instructions.

**Styling a component?** Reference [styling-guide.md](styling-guide.md) for Tailwind patterns and theme colors.

## Core Documentation

### [project-overview.md](project-overview.md)
**What:** High-level architecture and system design
**Covers:**
- Technology stack decisions (Next.js, TypeScript, Tailwind, MDX, Neon, Resend)
- Site architecture and navigation flow
- Theme system (colors, dark mode)
- Comment system architecture
- Contact form system
- Development workflow
- Design principles

### [styling-guide.md](styling-guide.md)
**What:** Styling patterns and conventions
**Covers:**
- Tailwind CSS usage patterns
- Theme-aware colors
- Responsive design (mobile-first)
- Animation patterns (fade-in, slide-in/out, hover states)
- Typography scale and system
- Accessibility patterns

### [content-workflow.md](content-workflow.md)
**What:** Content authoring guide
**Covers:**
- Adding new meditation posts
- Adding new portfolio projects
- Frontmatter best practices
- Writing tips and structure
- Images in content
- Troubleshooting content issues

## Component & Content System Docs

### [../components/README.md](../components/README.md)
**What:** Component patterns and library
**Covers:**
- Component organization and categories
- Server vs Client component patterns
- shadcn/ui usage
- Layout patterns (PageContainer, grids)
- All component docs (Slideshow, SortingBar, Comments, Navigation, Forms)
- State management
- Performance considerations

### [../content/README.md](../content/README.md)
**What:** Content system internals
**Covers:**
- Directory structure
- File naming conventions
- Frontmatter schemas (Meditation, Portfolio)
- MDX processing utilities (getPosts, getPostBySlug, getAllSlugs)
- Custom MDX components
- Dynamic routes
- Extending the content system

## Documentation Philosophy

This documentation follows a **hybrid approach**:

- **Centralized docs** (`.claude/`) - High-level decisions, cross-cutting patterns, workflows
- **Localized docs** (near code) - Component details, content system internals

This makes it easy to understand the system at a high level while keeping implementation details close to the code they describe.

## Need Help?

- **Component not working?** Check [components/README.md](../components/README.md)
- **Content not appearing?** See [content-workflow.md](content-workflow.md) troubleshooting section
- **Styling question?** Reference [styling-guide.md](styling-guide.md)
- **Architecture question?** Start with [project-overview.md](project-overview.md)
