"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="inline-flex items-center border border-border rounded-full bg-card/50 p-1">
        <button disabled className="p-1.5 rounded-full transition-colors">
          <Moon className="h-[1.1rem] w-[1.1rem] text-muted-foreground" />
        </button>
        <button disabled className="p-1.5 rounded-full transition-colors">
          <Sun className="h-[1.1rem] w-[1.1rem] text-muted-foreground" />
        </button>
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="inline-flex items-center border border-border rounded-full bg-card/50 p-1">
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-colors ${
          isDark
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-[1.1rem] w-[1.1rem]" />
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-colors ${
          !isDark
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-[1.1rem] w-[1.1rem]" />
      </button>
    </div>
  )
}
