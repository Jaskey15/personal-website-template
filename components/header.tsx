"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { text: "About", href: "/about" },
  { text: "Portfolio", href: "/portfolio" },
  { text: "Meditations", href: "/meditations" },
  { text: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuClosing, setIsMenuClosing] = useState(false)

  const handleNavigation = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    setIsMenuClosing(true)

    // Wait for slide-out animation to complete before navigating
    setTimeout(() => {
      router.push(href)
      setIsMenuOpen(false)
      setIsMenuClosing(false)
    }, 400) // Match slide-out-right animation duration
  }

  const handleCloseMenu = () => {
    setIsMenuClosing(true)

    // Wait for slide-out animation to complete before closing
    setTimeout(() => {
      setIsMenuOpen(false)
      setIsMenuClosing(false)
    }, 400) // Match animation duration
  }

  return (
    <>
      <nav className="w-full py-8 px-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo/Name - Left */}
          <Link
            href="/"
            className="font-serif text-[1.70rem] font-semibold tracking-wide hover:text-muted-foreground transition-colors"
          >
            Your Name
          </Link>

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <span key={link.href} className="flex items-center gap-8">
                  <Link
                    href={link.href}
                    className={`text-lg transition-all ${
                      isActive
                        ? "text-foreground font-bold dark:text-primary dark:brightness-125"
                        : "text-muted-foreground font-medium hover:text-foreground"
                    }`}
                    suppressHydrationWarning
                  >
                    {link.text}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="text-muted-foreground">•</span>
                  )}
                </span>
              )
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation - Right */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu - Slide from Right */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          style={{
            backgroundColor: 'hsl(var(--color-background))',
            animation: isMenuClosing
              ? 'slide-out-right 0.4s ease-in-out'
              : 'slide-in-right 0.4s ease-in-out'
          }}
        >
          {/* Close Button */}
          <div className="absolute top-8 right-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseMenu}
              className="opacity-0"
              style={{
                animation: 'fade-in 0.3s ease-out 0.2s forwards'
              }}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center justify-center h-full gap-12 px-8">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavigation(link.href, e)}
                  className={`font-serif text-4xl transition-colors opacity-0 ${
                    isActive
                      ? "text-primary font-bold brightness-125"
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
    </>
  )
}
