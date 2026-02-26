# Styling Guide

This document is the single reference for colors, typography, animations, responsive patterns, and accessibility in this project.

## Tailwind CSS Usage

**Approach:** Utility classes directly in JSX. Avoid custom CSS unless necessary.

```tsx
<div className="flex flex-col gap-6 p-8 bg-card rounded-lg">
  <h2 className="text-2xl font-semibold">Title</h2>
</div>
```

## Theme-Aware Colors

Always use CSS variable-based colors for dark/light mode support:

```tsx
// Theme-aware (adapts to dark/light mode)
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">

// Never hard-code colors
<div className="bg-white text-black">  // breaks in dark mode
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

**Mobile-first approach:** Base styles are mobile, add breakpoints for larger screens.

**Breakpoints:** `sm: 640px` | `md: 768px` | `lg: 1024px` | `xl: 1280px` | `2xl: 1536px`

```tsx
// Layout: stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4 md:gap-8">

// Grid columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Responsive spacing (standard site pattern)
<section className="px-8 md:px-12 lg:px-16">

// Responsive text
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
```

### Critical Pattern: Image Containers

When using Next.js `Image` with `fill` and `aspectRatio`, the container **must** have a width at every breakpoint:

```tsx
// Correct - w-full ensures width on mobile
<div className="w-full md:w-[45%]" style={{ aspectRatio: "3/4" }}>
  <Image src="..." fill />
</div>

// Broken - no mobile width, container collapses to 0 height
<div className="md:w-[45%]" style={{ aspectRatio: "3/4" }}>
  <Image src="..." fill />
</div>
```

**Why:** `aspectRatio` needs a defined width to calculate height. Without `w-full` on mobile, the container has no intrinsic width, resulting in 0 height and invisible images.

## Animation Patterns

### Fade-In (CSS)

Defined in `app/globals.css`:

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Staggered fade-in usage:**
```tsx
<div
  className="animate-fade-in opacity-0 [animation-fill-mode:forwards]"
  style={{ animationDelay: `${index * 100}ms` }}
/>
```

### Slide-In/Out (CSS)

Defined in `app/globals.css`. Used for mobile navigation menu.

```tsx
<div style={{
  animation: isMenuClosing
    ? 'slide-out-right 0.3s ease-out'
    : 'slide-in-right 0.3s ease-out'
}}>
```

### Framer Motion

```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
/>
```

### Hover States

Use subtle, smooth transitions with Tailwind's default 150ms timing:

```tsx
<button className="transition-colors hover:bg-primary/90">
<div className="transition-all hover:shadow-lg hover:scale-[1.02]">
<Link className="transition-colors hover:text-primary">
```

### Mobile vs Desktop Hover

Mobile devices cannot hover, so interactive controls must differ by breakpoint.

```tsx
// Always visible on mobile, hover-revealed on desktop
<button className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">

// Never hover-only (inaccessible on mobile)
<button className="opacity-0 group-hover:opacity-100">  // broken on touch
```

**Underline affordance for links:**
```tsx
// Underline on mobile (touch cue), remove on desktop (hover suffices)
<h3 className="underline decoration-1 underline-offset-4 decoration-muted-foreground/40 md:no-underline">
  {title}
</h3>
```

## Typography System

### Base Font Sizes

Two tiers defined in `app/globals.css`:

- `body { font-size: 0.875rem; }` (14px) - UI elements: nav, footer, contact
- `.article-content { font-size: 1rem; }` (16px) - Long-form reading: about, meditations, portfolio

```tsx
// UI text inherits body size (14px)
<p className="text-muted-foreground">Navigation label</p>

// Long-form content uses article-content (16px)
<div className="article-content">
  <p>Article paragraphs inherit 16px</p>
</div>

// Avoid explicit text sizes for body paragraphs
<p className="text-lg">Don't do this</p>
```

### Heading Hierarchy

Headings use explicit sizes with responsive scaling:

```tsx
// h1 - Page titles
<h1 className="font-serif text-5xl md:text-6xl font-bold">

// h2 - Section headings
<h2 className="font-serif text-3xl font-bold">

// h3 - Card titles
<h3 className="font-serif font-semibold text-[1.5rem] md:text-[1.70rem]">

// Card excerpts/subtitles
<p className="text-muted-foreground text-[0.875rem] md:text-[0.9375rem]">
```

### Font Weights

- `font-normal` (400) - body text
- `font-medium` (500) - labels, dates
- `font-semibold` (600) - card titles
- `font-bold` (700) - page headings

## Accessibility Patterns

### Semantic HTML

Use semantic elements (`nav`, `main`, `article`, `section`) instead of generic `div` containers.

```tsx
<nav>
  <ul><li><Link href="/about">About</Link></li></ul>
</nav>
<main>
  <article>
    <h1>Post Title</h1>
    <p>Content...</p>
  </article>
</main>
```

### Interactive Elements

```tsx
// Keyboard accessible with ARIA label
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
// Icon-only buttons need labels
<button aria-label="Toggle theme">
  <Sun className="h-5 w-5" />
</button>

// External links should indicate new tab
<a href="..." target="_blank" rel="noopener noreferrer"
   aria-label="Visit example.com (opens in new tab)">
```
