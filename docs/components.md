# Component Library

## Component Organization

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

### Naming Conventions

- **kebab-case** filenames: `landing-question.tsx`
- **PascalCase** component names: `LandingQuestion`
- **Descriptive names** that indicate purpose: `project-card.tsx` not `card.tsx`

### Server vs Client Components

Server Components are the default (no directive needed, can be async, can access data directly). Add `'use client'` at the top of a file when you need hooks, event handlers, or browser APIs. A common pattern is fetching data in a Server Component and passing it as props to a Client Component for interactivity.

---

## Layout Components

### PageContainer

Source: `components/page-container.tsx`

Unified page layout wrapper that includes Navigation and Footer.

```tsx
import { PageContainer } from '@/components/page-container'

<PageContainer maxWidth="2xl" centerContent>
  {/* Your page content */}
</PageContainer>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "7xl"` | `"7xl"` | Container max width |
| `centerContent` | `boolean` | `false` | Vertically center content |
| `className` | `string` | -- | Additional classes |
| `padding` | `string` | `"px-6"` | Custom padding classes |

---

## Page Components

### Slideshow

Source: `components/slideshow.tsx`

Client component for displaying multiple images with arrow/dot navigation.

```tsx
import { Slideshow } from '@/components/slideshow'

<Slideshow
  images={['/images/about/photo1.jpg', '/images/about/photo2.jpg']}
  alt="About photos"
  aspectRatio="3/4"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `string[]` | -- | Array of image paths (required) |
| `alt` | `string` | `"Slideshow image"` | Alt text for images |
| `aspectRatio` | `string` | `"3/4"` | CSS aspect ratio |
| `className` | `string` | -- | Additional image classes |
| `priority` | `boolean` | `false` | Next.js image priority loading |

### SortingBar

Source: `components/sorting-bar.tsx`

Minimal sorting control for content lists. Currently commented out in production.

```tsx
import { SortingBar, type SortOption } from '@/components/sorting-bar'

const [currentSort, setCurrentSort] = useState<SortOption>('newest')

<SortingBar currentSort={currentSort} onSortChange={setCurrentSort} />
```

| Prop | Type | Description |
|------|------|-------------|
| `currentSort` | `'popular' \| 'newest' \| 'oldest'` | Currently selected sort |
| `onSortChange` | `(sort: SortOption) => void` | Callback when sort changes |

### MeditationsList

Source: `components/meditations-list.tsx`

Client component that displays and sorts meditation posts. Sorting and pagination features are currently commented out; the component displays all posts in default order.

```tsx
import { MeditationsList } from '@/components/meditations-list'

const meditations = getPosts<MeditationFrontmatter>('meditations')

<MeditationsList meditations={meditations} />
```

| Prop | Type | Description |
|------|------|-------------|
| `meditations` | `Array` | Meditation posts with frontmatter |

To enable sorting/pagination: uncomment sorting state, SortingBar, and Load More logic in the component, then add `popularity` scores to meditation frontmatter.

### MDXLink

Source: `components/mdx-link.tsx`

Automatically handles internal vs external links. Uses Next.js `Link` for internal paths, `<a target="_blank" rel="noopener noreferrer">` for external URLs. Styled with `--color-link` CSS variable.

```tsx
import { MDXLink } from '@/components/mdx-link'

<MDXLink href="/about">Internal Link</MDXLink>
<MDXLink href="https://example.com">External Link</MDXLink>
```

---

## Comment System Components

Interactive threaded comment system for blog posts.

**Component hierarchy:**
```
CommentsSection (fetches data, manages state)
  ├── CommentForm (top-level new comment)
  └── CommentList (organizes flat array into thread tree)
       └── CommentItem (displays comment + toggle reply)
            └── CommentForm (nested reply)
```

### CommentsSection

Source: `components/comments-section.tsx`

Top-level wrapper that fetches comments and coordinates all comment UI.

```tsx
import { CommentsSection } from '@/components/comments-section'

<CommentsSection postSlug={post.slug} postTitle={post.frontmatter.title} />
```

| Prop | Type | Description |
|------|------|-------------|
| `postSlug` | `string` | Unique post identifier (required) |
| `postTitle` | `string` | Post title (reserved for future use) |

### CommentForm

Source: `components/comment-form.tsx`

Reusable form for top-level comments and threaded replies. Fields: name (required), email (optional), content (required). Posts to `/api/comments`.

```tsx
import { CommentForm } from '@/components/comment-form'

<CommentForm postSlug={postSlug} onCommentAdded={handleRefresh} />
<CommentForm postSlug={postSlug} parentCommentId={parentId} onCancel={handleCancel} onCommentAdded={handleRefresh} />
```

| Prop | Type | Description |
|------|------|-------------|
| `postSlug` | `string` | Post identifier (required) |
| `parentCommentId` | `number \| null` | Parent comment ID for replies |
| `onCommentAdded` | `() => void` | Callback after successful submission |
| `onCancel` | `() => void` | Cancel callback (shows cancel button when provided) |

### CommentItem

Source: `components/comment-item.tsx`

Displays a single comment with author, timestamp, content, and a reply toggle.

```tsx
import { CommentItem } from '@/components/comment-item'

<CommentItem comment={comment} postSlug={postSlug} onCommentAdded={handleRefresh} depth={0} />
```

| Prop | Type | Description |
|------|------|-------------|
| `comment` | `Comment` | Comment object from database |
| `postSlug` | `string` | Post identifier |
| `onCommentAdded` | `() => void` | Callback to refresh comment list |
| `depth` | `number` | Nesting level for indentation (default: 0) |

### CommentList

Source: `components/comment-list.tsx`

Organizes a flat comment array into a hierarchical thread tree and renders it recursively. Shows a friendly empty state when no comments exist.

```tsx
import { CommentList } from '@/components/comment-list'

<CommentList comments={comments} postSlug={postSlug} onCommentAdded={handleRefresh} />
```

| Prop | Type | Description |
|------|------|-------------|
| `comments` | `Comment[]` | Flat array of all comments |
| `postSlug` | `string` | Post identifier |
| `onCommentAdded` | `() => void` | Callback to refresh |

---

## UI Components (shadcn/ui)

Import shadcn/ui components from `@/components/ui/`:

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
```

Button variants: `default`, `secondary`, `outline`, `ghost`, `link`. Sizes: `default`, `sm`, `lg`, `icon`. See [shadcn/ui docs](https://ui.shadcn.com/) for full API reference.
