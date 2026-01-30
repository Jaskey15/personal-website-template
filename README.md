# Personal Website Template

A modern, clean personal website template built with Next.js 16, TypeScript, and Tailwind CSS. Features an interactive landing page, MDX-powered blog and portfolio, dark/light themes, and optional comment system and contact form.

**[Live Demo](https://jacobaskey.com)** | **[Documentation](.claude/README.md)**

## ✨ Features

- 🎨 **Warm minimal design** - No harsh blacks/whites, generous whitespace, subtle animations
- 🌗 **Dark/light themes** - System-aware with smooth transitions
- 📝 **MDX content system** - Write blog posts and portfolio projects in Markdown
- 🎯 **Interactive landing page** - Engaging entry point with animated navigation options
- 📱 **Fully responsive** - Mobile-first design that works beautifully on all devices
- 💬 **Optional comment system** - Threaded comments powered by Neon PostgreSQL
- 📧 **Optional contact form** - Email integration with Resend
- ⚡ **Fast performance** - Static generation with Next.js App Router
- ♿ **Accessible** - Semantic HTML and ARIA labels throughout

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/Jaskey15/personal-website-template.git my-website
cd my-website
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### 3. Customize Your Content

1. **Replace placeholder content:**
   - Edit `content/about.md` with your bio
   - Replace example posts in `content/meditations/`
   - Replace example projects in `content/portfolio/`

2. **Update personal information:**
   - Edit `components/header.tsx` - change "Your Name" to your name
   - Edit `components/footer.tsx` - social links are currently disabled (placeholders only)
   - Edit `app/layout.tsx` - update site title and description

3. **Replace placeholder images:**
   - Add your photos to `public/images/about/`
   - Update image paths in `app/about/page.tsx`

See the [Customization Guide](#-customization-guide) below for detailed instructions.

## 📚 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Content:** [MDX](https://mdxjs.com/) with frontmatter
- **Themes:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Animations:** [framer-motion](https://www.framer.com/motion/)
- **Database (optional):** [Neon PostgreSQL](https://neon.tech)
- **Email (optional):** [Resend](https://resend.com)

## 🎨 Customization Guide

### Content

#### Adding Blog Posts (Meditations)

Create a new file in `content/meditations/my-post.mdx`:

```mdx
---
title: "My First Post"
date: "2024-01-15"
excerpt: "A brief description of your post"
tags: ["reflection", "growth"]
---

Your content here...
```

See the [example posts](content/meditations/) for more guidance.

#### Adding Portfolio Projects

Create a new file in `content/portfolio/my-project.mdx`:

```mdx
---
title: "My Project"
date: "2024-01-15"
projectLink: "https://project-url.com"  # Note: Links are currently disabled (display only)
githubLink: "https://github.com/you/project"  # Note: Links are currently disabled (display only)
problem: |
  What problem did this project solve?
solution: |
  How did you solve it?
---

Additional details here...
```

See the [example projects](content/portfolio/) for more guidance.

### Styling

#### Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --color-background: 35 25% 92%;  /* Light mode background */
  --color-foreground: 25 15% 20%;  /* Light mode text */
  --color-primary: 18 65% 52%;     /* Accent color */
  /* ... more colors */
}

.dark {
  --color-background: 25 18% 11%;  /* Dark mode background */
  /* ... more colors */
}
```

#### Typography

The template uses:
- **Inter** for body text
- **Crimson Text** for headings

To change fonts, edit `app/layout.tsx` and update the Google Fonts imports.

### Personal Information

1. **Site metadata** - Edit `app/layout.tsx`:
   ```typescript
   export const metadata: Metadata = {
     title: "Your Name",
     description: "Your description",
   };
   ```

2. **Header** - Edit `components/header.tsx` line 54
3. **Footer** - Social links in `components/footer.tsx` are currently disabled (placeholders only)
4. **About page** - Edit `content/about.md` and update images in `app/about/page.tsx`

## 🔧 Optional Features

### Comment System (Neon PostgreSQL)

The comment system is **completely optional**. To enable it:

1. Sign up at [neon.tech](https://neon.tech) (free tier available)
2. Create a new project and copy your connection string
3. Create `.env.local`:
   ```bash
   DATABASE_URL=postgresql://user:password@host/database
   ```
4. Initialize the database:
   ```bash
   curl -X POST http://localhost:3000/api/comments/init
   ```

To disable comments, simply don't set the `DATABASE_URL` and remove the `<CommentsSection>` component from meditation post pages.

### Contact Form (Resend)

The contact form is **completely optional**. To enable it:

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Verify your domain or use their test domain for development
3. Create an API key
4. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_your_key_here
   ```
5. Update email addresses in `app/api/contact/route.ts`:
   - Line 32: `from: 'Contact Form <contact@yourdomain.com>'`
   - Line 33: `to: 'your.email@example.com'`

To disable the contact form, remove the `/contact` page and navigation link.

See [.env.example](.env.example) for detailed setup instructions.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [vercel.com](https://vercel.com)
3. Add environment variables (if using optional features):
   - Go to Project Settings > Environment Variables
   - Add `DATABASE_URL` and/or `RESEND_API_KEY`
4. Deploy!

Your site will be live at `your-project.vercel.app`.

### Other Platforms

This is a standard Next.js app and can be deployed to:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- Any platform that supports Next.js

## 📖 Documentation

Comprehensive documentation is available in the [.claude](.claude/) folder:

- [Documentation Index](.claude/README.md) - Start here
- [Project Overview](.claude/project-overview.md) - Architecture and tech decisions
- [Styling Guide](.claude/styling-guide.md) - Tailwind patterns and conventions
- [Content Workflow](.claude/content-workflow.md) - Adding and managing content
- [Components Documentation](components/README.md) - Component library
- [Content System](content/README.md) - MDX internals

## 🤝 Contributing

This is a template repository. Feel free to:
- Fork it and make it your own
- Submit issues for bugs or suggestions
- Share improvements via pull requests

## 📄 License

MIT License - feel free to use this template for your personal or commercial projects.

## 🙏 Acknowledgments

Built with love using amazing open-source tools. Special thanks to:
- [Vercel](https://vercel.com) for Next.js
- [shadcn](https://twitter.com/shadcn) for the UI component library
- The entire React and TypeScript communities

---

**Questions?** Check the [documentation](.claude/README.md) or [open an issue](https://github.com/Jaskey15/personal-website-template/issues).

**Like this template?** Give it a ⭐ on GitHub!
