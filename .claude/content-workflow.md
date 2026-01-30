# Content Workflow

This guide covers how to add and manage content on the site.

## Adding a New Meditation

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

Same workflow as meditations, but:
- Create in `content/portfolio/`
- Use `PortfolioFrontmatter` schema
- Include: `role`, `company`, `technologies`, `featured`

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

**Note:** The `image` field is optional and used for portfolio card thumbnails. If not provided, a default placeholder image is used.

## Content Best Practices

### Writing Frontmatter

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
- Use lowercase, kebab-case
- 2-5 tags per post
- Examples: `web-development`, `typescript`, `design-systems`

**Featured (Portfolio only):**
- Set `featured: true` for your best work
- Featured projects can be displayed prominently
- Use sparingly (3-5 featured projects max)

**Popularity (Meditations only):**
- Optional numeric field for manual curation
- Higher numbers = more popular (e.g., 95, 80, 65)
- Used by sorting feature when enabled
- Posts without popularity default to 0
- Use to highlight your best or most important posts
- No strict scale - use relative values that make sense to you

### Writing Content

**Structure:**
```mdx
## Introduction
Brief overview

## Background / Challenge
Context and problem

## Approach / Solution
How you tackled it

## Results / Reflection
What happened / what you learned

## Conclusion
Wrap up key takeaways
```

**Markdown Tips:**
- Use `##` for main sections (not `#` - that's the title)
- Break up long paragraphs (3-4 sentences max)
- Use lists for scannability
- Add images with alt text: `![Description](path/to/image.jpg)`
- Link to related content: `[See my other post](/meditations/other-post)`

### Images in Content

**Store in:** `/public/images/`

**Reference in MDX:**
```mdx
![A descriptive alt text](/images/project-screenshot.png)
```

**For Next.js Image component:**
```mdx
import Image from 'next/image'

<Image
  src="/images/project-screenshot.png"
  alt="Description"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

## Troubleshooting

### Post not appearing in list

- Check filename ends in `.mdx`
- Verify frontmatter is valid YAML
- Ensure `date` field exists and is properly formatted
- Restart dev server (`npm run dev`)

### MDX syntax errors

- Check frontmatter has opening/closing `---`
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
