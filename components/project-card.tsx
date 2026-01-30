import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  slug: string;
}

export function ProjectCard({ title, description, slug }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      style={{ viewTransitionName: `project-${slug}` } as React.CSSProperties}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
