import { MeditationsList } from "@/components/meditations-list";
import { PageContainer } from "@/components/page-container";
import { getPosts, type MeditationFrontmatter } from "@/lib/mdx";

export default function MeditationsPage() {
  const meditations = getPosts<MeditationFrontmatter>('meditations');

  return (
    <PageContainer maxWidth="7xl" padding="px-8 md:px-12 lg:px-16">
      <MeditationsList meditations={meditations} />
    </PageContainer>
  );
}
