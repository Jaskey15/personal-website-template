# Project Overview

High-level architecture, technology decisions, and system design for the personal website.

**Related Documentation:**
- [styling-guide.md](styling-guide.md) - Tailwind patterns, theme colors, animations, typography
- [content-workflow.md](content-workflow.md) - Adding content, best practices, troubleshooting
- [../components/README.md](../components/README.md) - Component patterns and usage
- [../content/README.md](../content/README.md) - Content system, frontmatter schemas, MDX utilities

## Vision

A personal portfolio and blog that feels authentic, warm, and engaging. The site should reflect thoughtfulness in both content and execution—simple enough to feel approachable, polished enough to feel professional.

## Technology Decisions

### Next.js 16 (App Router)

**Why App Router over Pages Router:**
- Server Components by default for better performance
- Simplified data fetching with async components
- Built-in loading and error states
- Nested layouts for consistent navigation
- File-system based routing with better conventions

**Key App Router Patterns Used:**
- `app/page.tsx` - Landing page (client component for interactivity)
- `app/layout.tsx` - Root layout with theme provider
- `app/[section]/page.tsx` - Section pages (about, portfolio, meditations, contact)
- `app/[section]/[slug]/page.tsx` - Dynamic content pages (portfolio projects, meditation posts)

### TypeScript

**Configuration:** Strict mode enabled in `tsconfig.json`

**Key Type Definitions:**
- `MeditationFrontmatter` - Blog post metadata (lib/mdx.ts:4-9)
- `PortfolioFrontmatter` - Project metadata (lib/mdx.ts:11-21)
- Component prop types throughout

**Path Aliases:**
```typescript
"@/*" -> "./*"  // Import from project root
```

### Tailwind CSS v4

**Why v4:**
- New CSS variable-based color system (perfect for theming)
- Improved performance and smaller bundle size
- Modern CSS features support

**Custom Configuration:**
- Dark mode: `class` strategy (toggled via next-themes)
- Colors: All defined as CSS variables in `globals.css`
- Animations: Custom fade-in animation with configurable delays
- Plugins: tailwindcss-animate for UI interactions

### MDX Content System

**Why MDX over CMS:**
- Version controlled with code
- No database or external dependencies
- Write in Markdown with React components
- Type-safe frontmatter parsing
- Fast build times with static generation

**Content Structure:**
```
/content
  /meditations      - Blog posts about thoughts, reflections
    [slug].mdx
  /portfolio        - Project case studies
    [slug].mdx
  about.md          - About page content
```

### shadcn/ui

**Why shadcn/ui:**
- Copy-paste component library (you own the code)
- Built on Radix UI primitives (accessible by default)
- Tailwind-based styling (consistent with design system)
- Easily customizable
- No runtime dependencies for unused components

**Components Used:**
- Button, Card, Dropdown Menu
- All components in `components/ui/`

### framer-motion

**Why framer-motion:**
- Production-ready animation library
- Declarative animation syntax
- Gesture and interaction support
- Optimized for performance
- Works seamlessly with React Server Components (client components only)

**Usage:**
- Landing page interactive animations
- Staggered fade-in effects
- Smooth page transitions

### Neon Database

**Why Neon:**
- Serverless PostgreSQL with modern architecture
- Zero-config autoscaling and branching
- Generous free tier for personal projects
- Edge-compatible via HTTP (works with Next.js Edge Runtime)
- Instant cold starts with no connection pooling needed

**Database Client:**
- `@neondatabase/serverless` package
- Provides SQL template tag for type-safe queries
- Environment variable: `DATABASE_URL`

**Usage:**
- Comment system storage
- Threaded comment relationships (self-referencing foreign key)
- Indexed queries for performance

**Schema:**
```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_slug VARCHAR(255) NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255),
  content TEXT NOT NULL,
  parent_comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for query performance
CREATE INDEX idx_post_slug ON comments(post_slug);
CREATE INDEX idx_parent_comment ON comments(parent_comment_id);
```

### Resend

**Why Resend:**
- Modern transactional email API built for developers
- Simple setup with excellent developer experience
- Free tier: 100 emails/day, 3,000/month (perfect for contact forms)
- Domain verification for professional sender reputation
- Clean API with TypeScript support

**Configuration:**
- Domain: `contact.yourdomain.com` (subdomain for email sending)
- Environment variable: `RESEND_API_KEY`
- Package: `resend` v6.9.1

**Usage:**
- Contact form email submissions
- Sends to: your.email@example.com
- Reply-to set to sender's email for easy responses
- Server-side validation and error handling

## Site Architecture

### Navigation Flow

```
Landing Page (/)
    ↓
"What brings you here?"
    ↓
┌─────────────┬──────────────┬──────────────┬──────────┐
│ About       │ Portfolio    │ Meditations  │ Contact  │
│ /about      │ /portfolio   │ /meditations │ /contact │
└─────────────┴──────────────┴──────────────┴──────────┘
                     ↓                ↓
              /portfolio/[slug]  /meditations/[slug]
```

### Page Responsibilities

| Page | Purpose | Data Source |
|------|---------|-------------|
| `/` | Landing with interactive question | Static |
| `/about` | Bio and background with image slideshow | `content/about.md` |
| `/portfolio` | Project grid | `content/portfolio/*.mdx` |
| `/portfolio/[slug]` | Project detail | Individual MDX file |
| `/meditations` | Blog post list with MeditationsList component | `content/meditations/*.mdx` |
| `/meditations/[slug]` | Blog post detail with comment system | MDX file + Neon database |
| `/contact` | Contact form with email submission | Resend API via Next.js API route |

## Theme System

### next-themes Integration

**Provider:** `components/theme-provider.tsx` wraps app in `layout.tsx`

**Settings:**
- `attribute="class"` - Adds `dark` class to `<html>`
- `defaultTheme="system"` - Respects OS preference
- `enableSystem` - Auto-detects system theme
- `disableTransitionOnChange` - Prevents flash on theme switch

### Color Variables

All colors defined as HSL CSS variables in `app/globals.css`:

**Light Mode - Warm Paper Aesthetic:**
```css
:root {
  --color-background: 35 25% 92%;      /* Creamy off-white paper */
  --color-foreground: 25 15% 20%;      /* Warm brown-black */
  --color-primary: 18 65% 52%;         /* Terracotta/burnt orange */
  --color-card: 38 28% 88%;            /* Warm beige */
  --color-border: 38 18% 78%;          /* Soft warm borders */
  /* + subtle paper texture overlay */
}
```

**Dark Mode - Warm Midnight Aesthetic:**
```css
.dark {
  --color-background: 25 18% 11%;      /* Rich brown-black */
  --color-foreground: 40 15% 88%;      /* Warm cream */
  --color-primary: 22 75% 58%;         /* Glowing terracotta */
  --color-card: 28 16% 14%;            /* Warm charcoal */
  --color-border: 28 10% 24%;          /* Subtle warm borders */
  --color-link: <link-color-hsl>;      /* Consistent link color */
  /* + atmospheric gradient overlays + noise texture */
}
```

**Typography:**
- Primary font: Inter (body) and Crimson Text (serif headings)
- Body text: 14px (0.875rem) - compact, clean UI
- Article content: 16px (1rem) - comfortable reading for long-form content
- Configured via `body { font-size }` and `.article-content` class in globals.css
- Headings use explicit sizes for proper hierarchy

**Usage in Components:**
```tsx
<div className="bg-background text-foreground">
  {/* Automatically theme-aware */}
</div>
```

## Comment System

### Architecture

**Full-stack interactive comment system** for meditation posts with threaded replies.

**Technology Stack:**
- **Database:** Neon serverless PostgreSQL
- **API:** Next.js API routes
- **UI:** React client components with optimistic updates

### Database Layer (lib/db.ts)

**Comment Interface:**
```typescript
interface Comment {
  id: number;
  post_slug: string;
  author_name: string;
  author_email: string | null;
  content: string;
  parent_comment_id: number | null;
  created_at: Date;
}
```

**Key Functions:**
1. `initializeDatabase()` - Creates table and indexes
2. `getCommentsBySlug(slug)` - Fetches all comments for a post
3. `createComment(...)` - Inserts new comment or reply
4. `deleteComment(id)` - Removes comment (admin only)

### API Routes

**GET /api/comments**
- Query param: `slug` (post identifier)
- Returns: Array of all comments for the post
- Used by: CommentsSection component on mount

**POST /api/comments**
- Body: `{ postSlug, authorName, authorEmail?, content, parentCommentId? }`
- Returns: Newly created comment
- Validation: Required fields, max lengths
- Used by: CommentForm submissions

**DELETE /api/comments/[id]**
- Deletes comment by ID
- Currently no public UI (admin-only via direct API call)
- Future: Add admin authentication

**POST /api/comments/init**
- Initializes database schema
- Safe to call multiple times (uses IF NOT EXISTS)
- Run once on deployment or manually

### Component Architecture

**4-component system:**

1. **CommentsSection** - Container component
   - Fetches comments via API
   - Manages refresh after new submissions
   - Displays comment count
   - Handles loading/error states

2. **CommentList** - Threading logic
   - Converts flat array to tree structure
   - Separates root comments from replies
   - Recursive rendering of nested threads

3. **CommentItem** - Individual comment display
   - Shows author, timestamp, content
   - Reply button with inline form toggle
   - Visual hierarchy via indentation and borders

4. **CommentForm** - Submission form
   - Reusable for both comments and replies
   - Client-side validation
   - Character counters
   - Error handling

### Threading Implementation

**Database approach:**
- Self-referencing foreign key: `parent_comment_id REFERENCES comments(id)`
- Cascading deletes (deleting parent removes all children)
- Flat storage, tree structure built client-side

**UI approach:**
- Recursive component rendering
- Progressive indentation (8px per level)
- No depth limit (though UX degrades after ~5 levels)
- Chronological order within each level

### Future Enhancements

**Potential additions:**
- Admin authentication for DELETE endpoint
- Email notifications for replies
- Markdown support in comments
- Edit functionality (with edit history)
- Upvoting/downvoting
- Comment moderation queue
- Spam protection (rate limiting, captcha)
- Gravatar integration (email already collected)

## Contact Form System

### Architecture

**Email-based contact form** using Resend for transactional email delivery.

**Technology Stack:**
- **Email Service:** Resend (transactional email API)
- **API:** Next.js API route (`/app/api/contact/route.ts`)
- **UI:** React client component with form validation

### API Route

**POST /api/contact**
- Body: `{ name, email, message }`
- Validation:
  - All fields required
  - Email format validation (regex)
  - No max length on message field
- Returns: `{ success: true, messageId }` or `{ error: string }`
- Sends email via Resend to: your.email@example.com
- Sets reply-to to sender's email for easy responses

**Email Format:**
```html
From: Contact Form <contact@contact.yourdomain.com>
To: your.email@example.com
Reply-To: [sender's email]
Subject: New Contact Form Submission from [Name]

<h2>New Contact Form Submission</h2>
<p><strong>From:</strong> [name]</p>
<p><strong>Email:</strong> [email]</p>
<p><strong>Message:</strong></p>
<p>[message with line breaks converted to <br>]</p>
```

### Component Implementation

**Contact Page** (`/app/contact/page.tsx`):
- Client component (`'use client'`)
- State management:
  - `formData`: Object with name, email, message
  - `isSubmitting`: Boolean for loading state
  - `submitStatus`: Object with success/error type and message
- Features:
  - Controlled form inputs
  - Client-side validation
  - Loading state during submission
  - Success/error message display below submit button
  - Form clears on successful submission
  - Disabled inputs during submission
- Responsive layout:
  - Name and email fields: Half width on all screens
  - Message field: Full width
  - Vertical stacking (3 rows)

### Environment Variables

**Required:**
- `RESEND_API_KEY` - API key from Resend dashboard
  - Get from: https://resend.com/api-keys
  - Permission: Sending access (not full access)

### DNS Configuration

**Domain verification required:**
- Subdomain: `contact.yourdomain.com`
- DNS records added to Namecheap:
  - DKIM (TXT) for domain verification
  - SPF (MX + TXT) for sending authorization
  - DMARC (TXT, optional) for email policy

### Future Enhancements

**Potential additions:**
- Rate limiting to prevent spam
- Honeypot field for bot protection
- reCAPTCHA integration
- Email templates for prettier formatting
- Auto-reply to sender confirming receipt
- Save submissions to database for records
- Admin dashboard to view submissions

## Content Processing

### MDX Utilities (lib/mdx.ts)

**Key Functions:**

1. **`getPosts<T>(type: string)`**
   - Reads all MDX files from `/content/{type}/`
   - Parses frontmatter with gray-matter
   - Sorts by date (newest first)
   - Returns typed array of posts with metadata

2. **`getPostBySlug<T>(type: string, slug: string)`**
   - Reads single MDX file
   - Returns content + frontmatter
   - Used in dynamic `[slug]` pages

3. **`getAllSlugs(type: string)`**
   - Returns array of all slugs
   - Used for `generateStaticParams()` in App Router
   - Enables static generation at build time

### MDX Component Customization

**File:** `mdx-components.tsx`

Customizes rendering of Markdown elements:
- Headings: Responsive sizing, proper hierarchy
- Links: External link detection, theme-aware colors
- Code blocks: Styled for syntax highlighting readiness
- Tables, blockquotes, lists: Full dark mode support

## Development Workflow

### Local Development

```bash
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint checks
```

### Adding Content

**New Meditation Post:**
1. Create `/content/meditations/my-post.mdx`
2. Add frontmatter (title, date, excerpt, tags)
3. Write content in Markdown
4. Automatically appears in `/meditations`

**New Portfolio Project:**
1. Create `/content/portfolio/my-project.mdx`
2. Add frontmatter (title, date, role, company, technologies, featured)
3. Write case study in Markdown
4. Automatically appears in `/portfolio`

## Design Principles

### Visual Design

- **Warm, not clinical:** No pure black (#000) or white (#fff)
- **Breathing room:** Generous padding and margins
- **Hierarchy through size:** Clear heading scales
- **Subtle interactions:** Smooth animations, no jarring transitions
- **Responsive by default:** Mobile-first approach
- **Typography hierarchy:**
  - 14px body: Compact, clean UI (navigation, footer, forms)
  - 16px article content: Comfortable reading for long-form text
  - Explicit heading sizes: Maintain visual hierarchy

### Code Principles

- **Prefer composition:** Small, focused components
- **Server-first:** Use Server Components unless interactivity needed
- **Type everything:** No implicit `any` types
- **Tailwind utilities:** Avoid custom CSS unless necessary
- **Accessible:** Use semantic HTML and ARIA where needed

## Future Considerations

### Potential Additions

- Search functionality for meditations
- Tags/categories filtering
- RSS feed for blog
- Analytics (privacy-focused)
- OpenGraph images for social sharing
- More interactive elements on landing page

### Scaling Content

- Currently file-based MDX (perfect for 10-100 posts)
- If scaling to 1000+ posts, consider:
  - Database-backed content (but loses version control benefits)
  - Search indexing (Algolia, Pagefind)
  - Pagination on list pages
  - Incremental Static Regeneration

## File Organization

```
/app                      # Next.js App Router
  layout.tsx              # Root layout (theme provider)
  page.tsx                # Landing page
  globals.css             # Global styles, theme variables
  /about                  # About page with slideshow
  /portfolio              # Portfolio pages
  /meditations            # Blog pages
  /contact                # Contact form page

/components               # React components
  header.tsx              # Global navigation
  footer.tsx              # Footer with social links
  landing-question.tsx    # Landing page interactive
  navigation.tsx          # Secondary nav bar
  page-container.tsx      # Unified page layout wrapper
  slideshow.tsx           # Image slideshow component
  meditations-list.tsx    # Meditation grid with sorting/pagination
  sorting-bar.tsx         # Content sorting interface
  mdx-link.tsx            # Reusable link component
  theme-provider.tsx      # next-themes wrapper
  theme-toggle.tsx        # Dark/light switcher
  project-card.tsx        # Portfolio cards
  portfolio-card.tsx      # Portfolio card variant
  meditation-card.tsx     # Blog cards
  comments-section.tsx    # Comment system container
  comment-list.tsx        # Threaded comment tree
  comment-item.tsx        # Individual comment display
  comment-form.tsx        # Comment submission form
  /ui                     # shadcn/ui components

/content                  # MDX files
  /meditations            # 9 published blog posts
  /portfolio              # 3 portfolio projects
  about.md

/lib                      # Utilities
  mdx.ts                  # Content processing
  db.ts                   # Database layer (Neon PostgreSQL)
  utils.ts                # Shared utilities

/app/api                  # API routes
  /comments
    route.ts              # GET/POST comments
    /[id]
      route.ts            # DELETE comment by ID
    /init
      route.ts            # Initialize database schema
  /contact
    route.ts              # POST contact form submissions (Resend integration)

/public                   # Static assets
  /images
    /about                # About page images
    /meditations          # Blog post images
```
