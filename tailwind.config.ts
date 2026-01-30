import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-crimson)', 'Georgia', 'serif'],
      },
      scale: {
        '103': '1.03',
      },
      transitionDuration: {
        '400': '400ms',
      },
      colors: {
        background: "hsl(var(--color-background) / <alpha-value>)",
        foreground: "hsl(var(--color-foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--color-card) / <alpha-value>)",
          foreground: "hsl(var(--color-card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--color-popover) / <alpha-value>)",
          foreground: "hsl(var(--color-popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--color-primary) / <alpha-value>)",
          foreground: "hsl(var(--color-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary) / <alpha-value>)",
          foreground: "hsl(var(--color-secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted) / <alpha-value>)",
          foreground: "hsl(var(--color-muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent) / <alpha-value>)",
          foreground: "hsl(var(--color-accent-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--color-border) / <alpha-value>)",
        input: "hsl(var(--color-input) / <alpha-value>)",
        ring: "hsl(var(--color-ring) / <alpha-value>)",
        link: "hsl(var(--color-link) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
