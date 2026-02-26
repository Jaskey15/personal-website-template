# Content Workflow

How to add and manage blog posts and portfolio projects.

For the full frontmatter schema reference, see [content-system.md](content-system.md#frontmatter-schemas).

## Adding a New Blog Post

1. **Create the file:**
   ```bash
   touch content/meditations/my-new-post.mdx
   ```

2. **Add frontmatter:**
   ```mdx
   ---
   title: "My New Post"
   date: "2024-03-15"
   excerpt: "A brief description of what this post is about."
   tags: ["reflection", "tech"]
   ---
   ```

3. **Write content in Markdown:**
   ```mdx
   ## Introduction

   Your content here...

   ## Key Points

   - Point 1
   - Point 2
   ```

4. **Preview locally:**
   - Visit `http://localhost:3000/meditations` (should appear in list)
   - Visit `http://localhost:3000/meditations/my-new-post` (detail page)

5. **Commit and push:**
   ```bash
   git add content/meditations/my-new-post.mdx
   git commit -m "Add meditation: My New Post"
   git push
   ```

## Adding a New Portfolio Project

The workflow is the same as blog posts. Create the file in `content/portfolio/` and include portfolio-specific frontmatter fields like `role`, `company`, `technologies`, and `featured`.

**Example:**
```mdx
---
title: "Personal Website"
date: "2024-03-01"
excerpt: "A clean, minimal personal website with interactive landing page."
tags: ["nextjs", "react", "tailwind"]
role: "Full Stack Developer"
company: "Personal Project"
technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"]
featured: true
image: "/images/portfolio/personal-website.png"
---

## Project Overview
...
```

The `image` field is optional and used for portfolio card thumbnails. A default placeholder is used when omitted.

## Frontmatter Best Practices

**Dates:**
- Use ISO format: `YYYY-MM-DD`
- Don't include time (just date)
- Used for sorting (newest first)

**Excerpts:**
- 1-2 sentences max
- Summarize the key idea
- Used in card previews and SEO

**Tags:**
- Keep tags consistent across posts
- Use lowercase, kebab-case (e.g., `web-development`, `design-systems`)
- 2-5 tags per post

**Featured (Portfolio only):**
- Set `featured: true` for your best work
- Featured projects can be displayed prominently
- Use sparingly (3-5 featured projects max)

**Popularity (Blog posts only):**
- Optional numeric field for manual curation
- Higher numbers = more popular (e.g., 95, 80, 65)
- Posts without popularity default to 0
- No strict scale -- use relative values that make sense to you

## Writing Content

**Recommended structure:**
```mdx
## Introduction
Brief overview

## Background / Challenge
Context and problem

## Approach / Solution
How you tackled it

## Results / Reflection
What happened / what you learned
```

**Markdown tips:**
- Use `##` for main sections (not `#` -- that's the title)
- Break up long paragraphs (3-4 sentences max)
- Use lists for scannability
- Link to related content: `[See my other post](/meditations/other-post)`

### Images

Store images in `/public/images/` and reference them in MDX:

```mdx
![A descriptive alt text](/images/project-screenshot.png)
```

## Troubleshooting

### Post not appearing in list

- Check filename ends in `.mdx`
- Verify frontmatter is valid YAML
- Ensure `date` field exists and is properly formatted
- Restart dev server (`npm run dev`)

### MDX syntax errors

- Check frontmatter has opening and closing `---`
- Verify no unescaped special characters in frontmatter strings
- Use quotes for strings with colons: `title: "Post: Subtitle"`

### Custom components not working

- Ensure component is imported in MDX file
- Check component is exported from source file
- Verify component accepts `children` prop if wrapping content

### Build errors with MDX

- Check all `.mdx` files have valid frontmatter
- Ensure all imported components exist
- Run `npm run build` to catch build-time errors
