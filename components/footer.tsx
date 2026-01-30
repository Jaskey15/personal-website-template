import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import { MDXLink } from "@/components/mdx-link"

export function Footer() {
  const socials = [
    {
      name: "Email",
      href: "mailto:your.email@example.com", // Update with your email
      icon: Mail,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/yourprofile/", // Update with your LinkedIn
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/yourusername", // Update with your GitHub
      icon: Github,
    },
    {
      name: "X",
      href: "https://x.com/yourhandle", // Update with your X handle
      icon: Twitter,
    },
  ]

  return (
    <footer className="mt-auto bg-card/30 px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-0 max-w-7xl mx-auto">
          {/* Left side - Fork invite + Copyright */}
          <div className="text-muted-foreground">
            <p>
              Like this site's design?{" "}
              <MDXLink href="https://github.com/Jaskey15/personal-website-template">
                Fork it
              </MDXLink>{" "}
              and add your own spin!
            </p>
          </div>

          {/* Social Icons - Right */}
          <div className="flex items-center gap-6">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              )
            })}
          </div>
        </div>
    </footer>
  )
}
