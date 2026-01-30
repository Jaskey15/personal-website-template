import { PortfolioCard } from "@/components/portfolio-card";
import { PageContainer } from "@/components/page-container";
import { getPosts, type PortfolioFrontmatter } from "@/lib/mdx";

export default function PortfolioPage() {
  const projects = getPosts<PortfolioFrontmatter>('portfolio');

  return (
    <PageContainer maxWidth="7xl">
          {/* Portfolio Grid */}
          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="animate-fade-in opacity-0 [animation-fill-mode:forwards]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PortfolioCard
                  title={project.frontmatter.title}
                  image={project.frontmatter.image || "/images/portfolio/default.png"}
                  slug={project.slug}
                />
              </div>
            ))}
          </div>
    </PageContainer>
  );
}
