# Styling Guide

## Tailwind CSS Usage

**Primary approach:** Utility classes directly in JSX

```tsx
// ✅ Good - Direct utilities
<div className="flex flex-col gap-6 p-8 bg-card rounded-lg">
  <h2 className="text-2xl font-semibold">Title</h2>
</div>

// ❌ Avoid - Custom CSS unless necessary
<div className="custom-card">
  <h2 className="custom-title">Title</h2>
</div>
```

## Theme-Aware Colors

Always use CSS variable-based colors for dark/light mode support:

```tsx
// ✅ Good - Theme-aware
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">
<p className="text-muted-foreground">

// ❌ Bad - Hard-coded colors
<div className="bg-white text-black">
<button className="bg-blue-600 text-white">
<p className="text-gray-500">
```

**Available Color Variables:**
- `background` / `foreground` - Page background and main text
- `card` / `card-foreground` - Card backgrounds
- `primary` / `primary-foreground` - Primary actions
- `secondary` / `secondary-foreground` - Secondary actions
- `muted` / `muted-foreground` - Subtle backgrounds/text
- `accent` / `accent-foreground` - Accent elements
- `border` - Borders and dividers
- `input` - Form inputs
- `ring` - Focus rings

## Responsive Design

**Mobile-first approach:** Base styles are mobile, add breakpoints as needed

```tsx
// ✅ Good - Mobile-first
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
  <div className="w-full md:w-1/2">

// Breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px
```

**Common Patterns:**

```tsx
// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Padding/spacing scaling (standard site pattern)
<section className="px-8 md:px-12 lg:px-16">

// Alternative tighter spacing
<section className="px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">

// Text sizing
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">

// Article padding (tighter on mobile)
<article className="py-6 md:py-12">

// Gap spacing (smaller on mobile, larger on desktop)
<div className="grid gap-8 lg:gap-16 md:grid-cols-2 lg:grid-cols-3">

// Footer layout (stacked on mobile, horizontal on desktop)
<div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-0">

// Width patterns - IMPORTANT for Next.js Image with aspectRatio
<div className="w-full md:w-[45%]">
  {/* Without w-full on mobile, aspectRatio won't calculate height */}
</div>
```

**Critical Pattern - Image Containers:**

When using Next.js `Image` with `fill` and `aspectRatio`:

```tsx
// ✅ Good - Has width on all breakpoints
<div className="w-full md:w-[45%]" style={{ aspectRatio: "3/4" }}>
  <Image src="..." fill />
</div>

// ❌ Bad - No mobile width, container collapses to 0 height
<div className="md:w-[45%]" style={{ aspectRatio: "3/4" }}>
  <Image src="..." fill />
</div>
```

**Why:** The `aspectRatio` CSS property needs a defined width to calculate height. Without `w-full` on mobile, the container has no width, resulting in 0 height and invisible images.

## Animation Patterns

### Fade-In Animation

**Definition:** `app/globals.css`

```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Slide-In/Out Animations

**Definition:** `app/globals.css`

Used for the mobile navigation menu sliding in from and out to the right.

```css
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slide-out-right {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
```

**Usage:**
```tsx
const [isMenuClosing, setIsMenuClosing] = useState(false)

<div
  style={{
    backgroundColor: 'hsl(var(--color-background))',
    animation: isMenuClosing
      ? 'slide-out-right 0.3s ease-out'
      : 'slide-in-right 0.3s ease-out'
  }}
>
  {/* Mobile menu content */}
</div>
```

**Usage with framer-motion:**

```tsx
// Example from landing-question.tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  {/* Content */}
</motion.div>
```

**Usage with Tailwind (for staggered effects):**

```tsx
// Staggered fade-in with inline animation delay
<div
  className="animate-fade-in opacity-0 [animation-fill-mode:forwards]"
  style={{ animationDelay: `${index * 100}ms` }}
>
  {/* Content */}
</div>
```

**Common Pattern:**
```tsx
// Multiple elements appearing in sequence
items.map((item, index) => (
  <div
    key={item.id}
    className="animate-fade-in opacity-0 [animation-fill-mode:forwards]"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Card or content */}
  </div>
))
```

### Hover States

**Subtle, smooth transitions:**

```tsx
// Button hover
<button className="transition-colors hover:bg-primary/90">

// Card hover
<div className="transition-all hover:shadow-lg hover:scale-[1.02]">

// Link hover
<Link className="transition-colors hover:text-primary">
```

**Animation timing:** Use Tailwind's default `transition` (150ms) for quick interactions

### Mobile vs Desktop Hover Patterns

**Standard practice:** Mobile devices don't have hover, so controls should behave differently.

```tsx
// ✅ Good - Always visible on mobile, hover-only on desktop
<button className="opacity-100 md:opacity-0 md:group-hover:opacity-100">

// ✅ Good - Different behavior per breakpoint
<div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">

// ❌ Bad - Hover-only (inaccessible on mobile)
<button className="opacity-0 group-hover:opacity-100">
```

**Example - Slideshow controls:**
```tsx
// Navigation arrows - always visible on mobile, hover on desktop
<button className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
  {/* Arrow icon */}
</button>

// Progress dots - same pattern
<div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
  {/* Dot indicators */}
</div>
```

**Example - Card titles with mobile affordances:**
```tsx
// Underline on mobile (touch affordance), remove on desktop (hover works)
<h3 className="underline decoration-1 underline-offset-4 decoration-muted-foreground/40 md:no-underline">
  {title}
</h3>

// Combined with hover transform on desktop
<article className="transition-all hover:-translate-y-2">
  <h3 className="underline md:no-underline">{title}</h3>
</article>
```

**Why this pattern:**
- Mobile: Touch devices can't hover, so controls must be visible
- Desktop: Hide controls for minimal aesthetic, show on hover
- Maintains clean look on desktop while ensuring mobile accessibility
- **Underline affordance:** On mobile, underlines provide a visual cue that text is clickable (web convention), while desktop users can rely on hover states to discover interactivity

## Typography Scale

### Typography System

**Sustainable, modular approach:** Single source of truth for text sizing.

**Base Sizes:**
- `body { font-size: 0.875rem; }` → 14px - UI elements (nav, footer, contact)
- `.article-content { font-size: 1rem; }` → 16px - Long-form reading (about, meditations, portfolio)

**Implementation:**
```tsx
// ✅ Good - Uses base font-size (14px)
<p className="text-muted-foreground">UI text</p>

// ✅ Good - Uses article-content class (16px)
<div className="article-content">
  <p>Long-form content inherits 16px</p>
</div>

// ❌ Avoid - Explicit text sizes for body text
<p className="text-lg">Don't do this</p>
```

**Applying article-content:**
```tsx
// About page
<div className="article-content">
  {/* All paragraphs automatically 16px */}
</div>

// Meditation articles
<div className="article-content prose">
  <MDXRemote source={content} />
</div>
```

### Heading Hierarchy

Headings use explicit sizes to maintain hierarchy:

```tsx
// h1 - Page titles (responsive: smaller on mobile)
<h1 className="font-serif text-5xl md:text-6xl font-bold">

// h2 - Section headings
<h2 className="font-serif text-3xl font-bold">

// h3 - Card titles (responsive: smaller on mobile)
<h3 className="font-serif font-semibold text-[1.5rem] md:text-[1.70rem]">

// Card excerpts/subtitles (responsive: smaller on mobile)
<p className="text-muted-foreground text-[0.875rem] md:text-[0.9375rem]">
```

**Responsive Typography Pattern:**
- Mobile devices benefit from slightly smaller text due to limited screen space
- Desktop can accommodate larger, more dramatic typography
- Use responsive sizing for headings and card text: smaller base, larger on `md:` breakpoint

### Font Weights

- `font-normal` - 400 (body text)
- `font-medium` - 500 (labels, dates)
- `font-semibold` - 600 (card titles)
- `font-bold` - 700 (page headings)

### Maintaining the Typography System

**To change UI text size (nav, footer, contact):**
```css
/* app/globals.css */
body {
  font-size: 0.875rem; /* Change this value */
}
```

**To change article text size (about, meditations, portfolio):**
```css
/* app/globals.css */
.article-content {
  font-size: 1rem; /* Change this value */
}
```

**Adding new pages:**
```tsx
// For UI-heavy pages (forms, contact, etc.)
<PageContainer>
  <p>Text inherits body size (14px)</p>
</PageContainer>

// For long-form content pages
<PageContainer>
  <div className="article-content">
    <p>Text gets article size (16px)</p>
  </div>
</PageContainer>
```

**When to use explicit sizes:**
- Headings (h1, h2, h3) - need visual hierarchy
- Special UI elements (tiny labels, hero text)
- Card titles, dates, metadata
- Never for body paragraphs in articles

## Accessibility Patterns

### Semantic HTML

```tsx
// ✅ Good - Semantic
<nav>
  <ul>
    <li><Link href="/about">About</Link></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Post Title</h1>
    <p>Content...</p>
  </article>
</main>

// ❌ Bad - Div soup
<div>
  <div>
    <div><a href="/about">About</a></div>
  </div>
</div>
```

### Interactive Elements

```tsx
// Keyboard accessible
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  aria-label="Descriptive label"
>

// Focus visible
<Link className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
```

### ARIA Labels

```tsx
// Icon-only buttons
<button aria-label="Toggle theme">
  <Sun className="h-5 w-5" />
</button>

// External links
<a
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit example.com (opens in new tab)"
>
```
