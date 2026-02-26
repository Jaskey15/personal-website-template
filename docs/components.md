# Component Library

## Component Organization

### Component Categories

```
/components
  ├── Layout Components
  │   ├── header.tsx              # Global header with desktop nav and mobile full-screen menu
  │   ├── footer.tsx              # Footer with social links and fork invitation
  │   ├── navigation.tsx          # Secondary navigation bar
  │   ├── page-container.tsx      # Unified page layout wrapper
  │   └── theme-provider.tsx      # Theme context wrapper
  │
  ├── Page Components
  │   ├── landing-question.tsx    # Interactive landing page
  │   ├── slideshow.tsx           # Image slideshow component
  │   ├── meditations-list.tsx    # Meditation grid with sorting/pagination
  │   ├── sorting-bar.tsx         # Content sorting interface
  │   ├── project-card.tsx        # Portfolio grid items
  │   ├── portfolio-card.tsx      # Portfolio card variant
  │   └── meditation-card.tsx     # Blog grid items
  │
  ├── Comment System Components
  │   ├── comments-section.tsx    # Main comment wrapper with data fetching
  │   ├── comment-list.tsx        # Threaded comment tree renderer
  │   ├── comment-item.tsx        # Individual comment display
  │   └── comment-form.tsx        # Comment/reply submission form
  │
  ├── UI Components (shadcn/ui)
  │   ├── button.tsx              # Base button component
  │   ├── card.tsx                # Card container
  │   ├── dropdown-menu.tsx       # Dropdown menu component
  │   └── ...                     # Other shadcn/ui components
  │
  └── Utility Components
      ├── theme-toggle.tsx        # Dark/light mode switcher
      └── mdx-link.tsx            # Reusable link component
```

### Component Naming Conventions

- **kebab-case** for filenames: `landing-question.tsx`
- **PascalCase** for component names: `LandingQuestion`
- **Descriptive names** that indicate purpose: `project-card.tsx` not `card.tsx`

## Component Composition Patterns

### Server vs Client Components

**Server Components (default):**
```tsx
// No "use client" directive
// Can be async
// Can directly access file system, databases
export default async function PortfolioPage() {
  const projects = await getPosts<PortfolioFrontmatter>('portfolio')
  return <ProjectGrid projects={projects} />
}
```

**Client Components:**
```tsx
// Add directive when you need:
// - useState, useEffect, other hooks
// - Event handlers (onClick, onChange)
// - Browser APIs
'use client'

export default function LandingQuestion() {
  const [isHovered, setIsHovered] = useState(false)
  return <button onClick={() => setIsHovered(!isHovered)}>
}
```

**Composition Pattern:**
```tsx
// Server Component wrapper
export default async function Page() {
  const data = await fetchData()
  return <ClientComponent data={data} />  // Pass data as props
}

// Client Component for interactivity
'use client'
export function ClientComponent({ data }) {
  const [state, setState] = useState()
  // Interactive logic here
}
```

### shadcn/ui Component Usage

**Importing:**
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
```

**Button Variants:**
```tsx
<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="link">Link Style</Button>

// Sizes
<Button size="default">Normal</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>
```

**Card Pattern:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title Here</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Optional footer */}
  </CardFooter>
</Card>
```

## Layout Patterns

### PageContainer Component

**Unified page layout wrapper:** [page-container.tsx](../components/page-container.tsx)

```tsx
import { PageContainer } from '@/components/page-container'

export default function MyPage() {
  return (
    <PageContainer maxWidth="2xl" centerContent>
      {/* Your page content */}
    </PageContainer>
  )
}
```

**Props:**
- `maxWidth`: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" (default: "7xl")
- `centerContent`: boolean - vertically centers content (default: false)
- `className`: string - additional classes
- `padding`: string - custom padding classes (default: "px-6")

**Responsive Padding Pattern:**
```tsx
// Use responsive padding for consistency across pages
<PageContainer maxWidth="7xl" padding="px-8 md:px-12 lg:px-16">
  {/* Content */}
</PageContainer>
```

**Structure:**
- Includes Navigation component
- Includes Footer component
- Handles responsive padding and max-width
- Provides consistent page structure

### Section Spacing

**Consistent spacing between sections:**
```tsx
<section className="space-y-8">  {/* Vertical spacing */}
  <div>Section 1</div>
  <div>Section 2</div>
</section>

<div className="flex gap-6">  {/* Horizontal spacing */}
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Grid Layouts

**Portfolio/Blog grids:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.slug}>
      {/* Card content */}
    </Card>
  ))}
</div>
```

## Common Component Patterns

### MDXLink Component

**Reusable link component:** [mdx-link.tsx](../components/mdx-link.tsx)

Automatically handles internal vs external links with consistent styling.

```tsx
import { MDXLink } from '@/components/mdx-link'

// Automatically detects if external
<MDXLink href="/about">Internal Link</MDXLink>
<MDXLink href="https://example.com">External Link</MDXLink>
```

**Features:**
- Uses Next.js `Link` for internal navigation
- Uses `<a>` with `target="_blank"` for external links
- Consistent color using `--color-link` CSS variable
- Automatically adds `rel="noopener noreferrer"` for security

**Old pattern (still valid for custom styling):**
```tsx
import Link from 'next/link'

// Internal navigation
<Link href="/about" className="text-primary hover:underline">
  About
</Link>

// External links
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-primary hover:underline inline-flex items-center gap-1"
>
  External Link
  <ExternalLink className="h-4 w-4" />
</a>
```

### Slideshow Component

**Interactive image slideshow:** [slideshow.tsx](../components/slideshow.tsx)

A client component for displaying multiple images with navigation.

```tsx
import { Slideshow } from '@/components/slideshow'

<Slideshow
  images={[
    '/images/about/photo1.jpg',
    '/images/about/photo2.jpg',
    '/images/about/photo3.jpg'
  ]}
  alt="About photos"
  aspectRatio="3/4"
  priority={true}
/>
```

**Props:**
- `images`: string[] - Array of image paths (required)
- `alt`: string - Alt text for images (default: "Slideshow image")
- `aspectRatio`: string - CSS aspect ratio (default: "3/4")
- `className`: string - Additional image classes
- `priority`: boolean - Next.js image priority loading

**Features:**
- Previous/Next arrow navigation (always visible on mobile, hover-only on desktop)
- Dot indicators for direct navigation (same mobile/desktop pattern)
- Smooth transitions between images
- Keyboard accessible
- Vignette effect for photo-like appearance
- Subtle border frame
- Responsive touch-friendly controls

### SortingBar Component

**Content sorting interface:** [sorting-bar.tsx](../components/sorting-bar.tsx)

A minimal sorting component for filtering content lists (meditations, portfolio, etc.).

```tsx
import { SortingBar, type SortOption } from '@/components/sorting-bar'

const [currentSort, setCurrentSort] = useState<SortOption>('newest')

<SortingBar
  currentSort={currentSort}
  onSortChange={setCurrentSort}
/>
```

**Props:**
- `currentSort`: SortOption - Currently selected sort option ('popular' | 'newest' | 'oldest')
- `onSortChange`: (sort: SortOption) => void - Callback when sort changes

**Features:**
- Three sort options: Popular, Newest, Oldest
- Centered layout with vertical dividers
- Active state styled with primary color
- Hover states for inactive options
- Serif typography matching site theme
- Fully keyboard accessible

**Visual Design:**
- Options displayed horizontally: "Popular | Newest | Oldest"
- Active option in primary (terracotta) color with font-semibold
- Inactive options in muted-foreground color
- Smooth color transitions (300ms)
- Vertical divider bars between options

**Status:** Currently commented out in production. Ready to uncomment when needed.

### MeditationsList Component

**Content list with sorting:** [meditations-list.tsx](../components/meditations-list.tsx)

Client component that handles display and sorting of meditation posts.

```tsx
import { MeditationsList } from '@/components/meditations-list'

// In Server Component
const meditations = getPosts<MeditationFrontmatter>('meditations')

<MeditationsList meditations={meditations} />
```

**Props:**
- `meditations`: Array of meditation posts with frontmatter

**Features (when uncommented):**
- **Sorting:** Three sort modes
  - Popular: Sort by `popularity` field (descending), fallback to date
  - Newest: Sort by date (newest first) - default
  - Oldest: Sort by date (oldest first)
- **Load More:** Pagination showing 6 items initially, loading 6 more per click
- **Staggered animations:** Maintains fade-in animation with delays

**Implementation Pattern:**
```tsx
// Sorting logic
const sortedMeditations = [...meditations].sort((a, b) => {
  if (currentSort === 'popular') {
    const popA = a.frontmatter.popularity ?? 0
    const popB = b.frontmatter.popularity ?? 0
    if (popA !== popB) return popB - popA
    // Fallback to date
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  }
  // ... other sort options
})

// Pagination
const visibleMeditations = sortedMeditations.slice(0, visibleCount)
const hasMore = visibleCount < sortedMeditations.length
```

**Status:** Sorting and pagination features currently commented out. The component displays all meditations in default order (newest first from server).

**To Enable:**
1. Uncomment sorting state and logic
2. Uncomment SortingBar component
3. Uncomment Load More button and pagination logic
4. Add `popularity` scores to meditation frontmatter

### Comment System Components

**Interactive comment system with threading:** Comments allow readers to engage with meditation posts through threaded discussions.

#### CommentsSection Component

**Main wrapper component:** [comments-section.tsx](../components/comments-section.tsx)

Top-level component that manages comment state and coordinates all comment UI.

```tsx
import { CommentsSection } from '@/components/comments-section'

// In meditation post page
<CommentsSection postSlug={post.slug} postTitle={post.frontmatter.title} />
```

**Props:**
- `postSlug`: string - Unique identifier for the post
- `postTitle`: string - Title of the post (currently unused, reserved for future features)

**Features:**
- Fetches comments from API on mount
- Displays comment count in header
- Provides comment form for new top-level comments
- Renders threaded comment list
- Handles loading and error states
- Automatically refreshes after new comments are posted

**State Management:**
- `comments`: Array of Comment objects
- `isLoading`: Boolean for initial load
- `error`: Error message string

#### CommentForm Component

**Comment/reply submission form:** [comment-form.tsx](../components/comment-form.tsx)

Reusable form for both top-level comments and threaded replies.

```tsx
import { CommentForm } from '@/components/comment-form'

// Top-level comment
<CommentForm
  postSlug={postSlug}
  onCommentAdded={handleRefresh}
/>

// Threaded reply
<CommentForm
  postSlug={postSlug}
  parentCommentId={parentId}
  onCommentAdded={handleReplyAdded}
  onCancel={() => setShowReplyForm(false)}
/>
```

**Props:**
- `postSlug`: string - Post identifier (required)
- `parentCommentId`: number | null - ID of parent comment for replies (optional)
- `onCommentAdded`: () => void - Callback after successful submission
- `onCancel`: () => void - Callback for cancel button (optional, hides cancel if not provided)

**Features:**
- **Fields:**
  - Name (required, max 100 chars)
  - Email (optional, for gravatar support in future)
  - Comment content (required, max 5000 chars)
- **Validation:**
  - Client-side required field validation
  - Character count display (live counter)
  - Email format validation
- **UX:**
  - Loading state while submitting
  - Error display with styled error messages
  - Form reset after successful submission
  - Different button text for comments vs replies
  - Cancel button (only shown for replies)

**API Integration:**
- POST to `/api/comments`
- Sends: postSlug, authorName, authorEmail, content, parentCommentId
- Handles server errors gracefully

#### CommentItem Component

**Individual comment display:** [comment-item.tsx](../components/comment-item.tsx)

Displays a single comment with reply functionality.

```tsx
import { CommentItem } from '@/components/comment-item'
import { Comment } from '@/lib/db'

<CommentItem
  comment={comment}
  postSlug={postSlug}
  onCommentAdded={handleRefresh}
  depth={0}
/>
```

**Props:**
- `comment`: Comment - Comment object from database
- `postSlug`: string - Post identifier
- `onCommentAdded`: () => void - Callback to refresh comment list
- `depth`: number - Nesting level for indentation (default: 0)

**Features:**
- **Display:**
  - Author name in bold
  - Formatted timestamp (e.g., "January 15, 2024, 03:45 PM")
  - Comment content with preserved line breaks (whitespace-pre-wrap)
  - Reply button
- **Visual hierarchy:**
  - Indented based on depth (8px margin-left per level)
  - Left border accent for visual threading
  - Responsive spacing
- **Interactivity:**
  - Toggle reply form on/off
  - Inline reply form when active
  - Auto-collapses reply form after successful submission

**Date Formatting:**
```tsx
const formattedDate = new Date(comment.created_at).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})
```

#### CommentList Component

**Threaded comment tree renderer:** [comment-list.tsx](../components/comment-list.tsx)

Organizes flat comment array into hierarchical thread structure.

```tsx
import { CommentList } from '@/components/comment-list'

<CommentList
  comments={comments}
  postSlug={postSlug}
  onCommentAdded={handleRefresh}
/>
```

**Props:**
- `comments`: Comment[] - Flat array of all comments
- `postSlug`: string - Post identifier
- `onCommentAdded`: () => void - Callback to refresh

**Features:**
- **Threading algorithm:**
  - Separates root comments (no parent) from replies
  - Recursively renders replies under their parents
  - Maintains chronological order within each level
- **Empty state:**
  - Displays friendly message when no comments exist
  - Encourages first comment
- **Recursive rendering:**
  - Each comment can have unlimited reply depth
  - Automatically handles deeply nested threads

**Implementation pattern:**
```tsx
// Organize comments into tree
const rootComments = comments.filter(c => !c.parent_comment_id)
const getReplies = (parentId) => comments.filter(c => c.parent_comment_id === parentId)

// Recursive render function
const renderComment = (comment, depth = 0) => (
  <>
    <CommentItem comment={comment} depth={depth} />
    {getReplies(comment.id).map(reply => renderComment(reply, depth + 1))}
  </>
)
```

#### Comment System Data Flow

**Database → API → Components:**

1. **Database Layer** ([lib/db.ts](../lib/db.ts)):
   - Neon serverless PostgreSQL
   - `getCommentsBySlug(slug)` - Fetch all comments for a post
   - `createComment(...)` - Insert new comment
   - `deleteComment(id)` - Remove comment (admin only)

2. **API Routes:**
   - `GET /api/comments?slug={slug}` - Returns all comments for post
   - `POST /api/comments` - Creates new comment or reply
   - `DELETE /api/comments/[id]` - Deletes comment (currently no public UI)

3. **Component Flow:**
   ```
   CommentsSection (fetches data)
     ├─ CommentForm (top-level)
     └─ CommentList (organizes threads)
          └─ CommentItem (displays + reply)
               └─ CommentForm (nested reply)
   ```

#### Comment System Styling

**Consistent with site theme:**
- Uses standard form styling (border-border/40, rounded-lg)
- Theme-aware colors (foreground, muted-foreground, background)
- Error states use red-500 with red-50/red-950 backgrounds
- Hover states with opacity transitions
- Character counter in muted-foreground

**Threading visual hierarchy:**
- Left border accent (border-l-2 border-border/20)
- Progressive indentation (ml-8 per depth level)
- Spacing between threads (mt-4, mt-6)

### Image Component

```tsx
import Image from 'next/image'

// Responsive image
<div className="relative aspect-video w-full overflow-hidden rounded-lg">
  <Image
    src="/images/project.jpg"
    alt="Descriptive alt text"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

### Navigation Pattern

**Desktop Navigation:**
```tsx
// Desktop navigation with active state indicators
<nav className="hidden md:flex items-center gap-6">
  <Link href="/about">About</Link>
  <Link href="/portfolio">Portfolio</Link>
</nav>
```

**Mobile Navigation - Full-Screen Slide-In Menu:**

Modern full-screen overlay that slides in from the right with smooth slide-out animation on navigation.

```tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const router = useRouter()
const [isMenuOpen, setIsMenuOpen] = useState(false)
const [isMenuClosing, setIsMenuClosing] = useState(false)

// Navigation handler with slide-out animation
const handleNavigation = (href: string, e: React.MouseEvent) => {
  e.preventDefault()
  setIsMenuClosing(true)

  // Wait for slide-out animation before navigating
  setTimeout(() => {
    router.push(href)
    setIsMenuOpen(false)
    setIsMenuClosing(false)
  }, 400) // Match animation duration
}

// Close menu handler with slide-out animation
const handleCloseMenu = () => {
  setIsMenuClosing(true)

  setTimeout(() => {
    setIsMenuOpen(false)
    setIsMenuClosing(false)
  }, 400)
}

// Hamburger button
<Button
  variant="ghost"
  size="icon"
  onClick={() => setIsMenuOpen(true)}
>
  <Menu className="h-5 w-5" />
</Button>

// Full-screen menu overlay
{isMenuOpen && (
  <div
    className="fixed inset-0 z-50 md:hidden"
    style={{
      backgroundColor: 'hsl(var(--color-background))',
      animation: isMenuClosing
        ? 'slide-out-right 0.4s ease-out'
        : 'slide-in-right 0.4s ease-out'
    }}
  >
    {/* Close Button */}
    <div className="absolute top-8 right-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCloseMenu}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>

    {/* Navigation Links */}
    <div className="flex flex-col items-center justify-center h-full gap-12 px-8">
      {navLinks.map((link, index) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavigation(link.href, e)}
            className={`font-serif text-4xl transition-colors opacity-0 ${
              isActive
                ? "text-primary font-semibold"
                : "text-foreground font-medium hover:text-primary"
            }`}
            style={{
              animation: `fade-in 0.4s ease-out ${0.3 + index * 0.1}s forwards`
            }}
          >
            {link.text}
          </Link>
        )
      })}
    </div>
  </div>
)}
```

**Features:**
- Slides in from right with smooth animation
- Slides out to right when navigating or closing (coordinated with page navigation)
- Full-screen overlay with solid background (inline style for proper CSS variable resolution)
- Large serif typography (text-4xl)
- Staggered fade-in for navigation links
- Active state highlighted in primary color
- Smooth slide-out animation before navigation completes
- Mobile-only (hidden on md breakpoint and up)

## Form Patterns

### Contact Form Pattern

**Controlled form with validation and API submission:**

```tsx
'use client'
import { useState } from 'react'

export function ContactForm() {
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thanks for reaching out! I\'ll get back to you soon.',
        })
        setFormData({ name: '', email: '', message: '' }) // Clear form
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        disabled={isSubmitting}
        required
        className="w-1/2 px-4 py-3 rounded-lg bg-card border border-border"
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-full bg-accent/20 border-2 border-accent disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {/* Success/Error message */}
      {submitStatus.type && (
        <div className={submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}>
          {submitStatus.message}
        </div>
      )}
    </form>
  )
}
```

**Key patterns:**
- Controlled inputs with `value` and `onChange`
- Single change handler using `name` attribute
- Loading state to disable form during submission
- Success/error feedback below submit button
- Form clears on successful submission
- Disabled state on all inputs during submission

### Form Validation Pattern

**Client-side validation:**

```tsx
// HTML5 validation attributes
<input
  type="email"
  required
  className="..."
/>

// Custom validation in submit handler
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    setSubmitStatus({ type: 'error', message: 'Invalid email address' })
    return
  }

  // Proceed with submission...
}
```

**Server-side validation (API route):**

```tsx
// app/api/contact/route.ts
export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  // Validate required fields
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 400 }
    )
  }

  // Process form...
}
```

## State Management

### Component State (useState)

```tsx
'use client'
import { useState } from 'react'

export function InteractiveComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      Toggle
    </button>
  )
}
```

### Theme State (useTheme)

```tsx
'use client'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

## Performance Considerations

### Image Optimization

- Always use Next.js `<Image>` component
- Provide `alt` text for accessibility
- Use `fill` with `object-cover` for responsive containers
- Define `sizes` prop for responsive images

### Code Splitting

- Server Components are automatically code-split
- Dynamic imports for heavy client components:
  ```tsx
  import dynamic from 'next/dynamic'

  const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
    loading: () => <p>Loading...</p>
  })
  ```

### Avoid Re-renders

```tsx
// ✅ Good - Memoized callback
const handleClick = useCallback(() => {
  setCount(c => c + 1)
}, [])

// ❌ Bad - New function every render
const handleClick = () => {
  setCount(count + 1)
}
```
