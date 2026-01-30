import fs from "fs";
import path from "path";
import { PageContainer } from "@/components/page-container";
import { Slideshow } from "@/components/slideshow";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXLink } from "@/components/mdx-link";

const mdxComponents = {
  p: ({ children }: any) => (
    <p className="text-muted-foreground tracking-wide">
      {children}
    </p>
  ),
  a: MDXLink,
};

export default function AboutPage() {
  // Read the markdown content
  const filePath = path.join(process.cwd(), "content", "about.md");
  const content = fs.readFileSync(filePath, "utf8");

  // Split content into paragraphs (split by double newline)
  const paragraphs = content.trim().split("\n\n").filter(p => p.trim());

  return (
    <PageContainer maxWidth="7xl" className="flex items-center">
      <div className="w-full px-4 md:px-16 lg:px-32">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full items-start">
          {/* Image Section - 45% */}
          <div className="w-full md:w-[45%] animate-fade-in">
            <Slideshow
              images={[
                "/images/about/placeholder-1.jpg",
                "/images/about/placeholder-2.jpg",
                "/images/about/placeholder-3.jpg",
                "/images/about/placeholder-4.jpg",
                "/images/about/placeholder-5.jpg",
              ]}
              alt="Your Name"
              aspectRatio="3/4"
              priority
            />
          </div>

          {/* Text Section - 55% */}
          <div
            className="md:w-[55%] flex flex-col animate-fade-in opacity-0 [animation-fill-mode:forwards] about-content"
            style={{ animationDelay: '300ms' }}
          >

          {/* Biography paragraphs */}
            <div className="space-y-4 md:space-y-5">
              {paragraphs.map((paragraph, index) => (
                <div
                  key={index}
                  className="opacity-0 animate-fade-in [animation-fill-mode:forwards]"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <MDXRemote source={paragraph} components={mdxComponents} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
