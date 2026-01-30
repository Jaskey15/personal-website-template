import { Github, Linkedin, Mail, Twitter } from "lucide-react"

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
              <span className="text-primary">
                Fork it
              </span>{" "}
              and add your own spin!
            </p>
          </div>

          {/* Social Icons - Right */}
          <div className="flex items-center gap-6">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <span
                  key={social.name}
                  className="text-muted-foreground cursor-default"
                  aria-label={social.name}
                >
                  <Icon className="h-6 w-6" />
                </span>
              )
            })}
          </div>
        </div>
    </footer>
  )
}
