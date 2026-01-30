'use client';

// import { useState } from "react";
import { MeditationCard } from "@/components/meditation-card";
// import { SortingBar, type SortOption } from "@/components/sorting-bar";
import type { MeditationFrontmatter } from "@/lib/mdx";

interface MeditationsListProps {
  meditations: Array<{
    slug: string;
    frontmatter: MeditationFrontmatter;
    content: string;
  }>;
}

export function MeditationsList({ meditations }: MeditationsListProps) {
  // const [currentSort, setCurrentSort] = useState<SortOption>('newest');
  // const [visibleCount, setVisibleCount] = useState(6);

  // Sort meditations based on selected option (commented out for now)
  // const sortedMeditations = [...meditations].sort((a, b) => {
  //   if (currentSort === 'popular') {
  //     const popA = a.frontmatter.popularity ?? 0;
  //     const popB = b.frontmatter.popularity ?? 0;
  //     if (popA !== popB) {
  //       return popB - popA; // Higher popularity first
  //     }
  //     // Fallback to date if popularity is equal
  //     const dateA = new Date(a.frontmatter.date).getTime();
  //     const dateB = new Date(b.frontmatter.date).getTime();
  //     return dateB - dateA;
  //   } else if (currentSort === 'newest') {
  //     const dateA = new Date(a.frontmatter.date).getTime();
  //     const dateB = new Date(b.frontmatter.date).getTime();
  //     return dateB - dateA;
  //   } else {
  //     // oldest
  //     const dateA = new Date(a.frontmatter.date).getTime();
  //     const dateB = new Date(b.frontmatter.date).getTime();
  //     return dateA - dateB;
  //   }
  // });

  // Load More functionality (commented out for now)
  // const visibleMeditations = sortedMeditations.slice(0, visibleCount);
  // const hasMore = visibleCount < sortedMeditations.length;
  const visibleMeditations = meditations;

  return (
    <>
      {/* Sorting Bar (commented out for now) */}
      {/* <SortingBar currentSort={currentSort} onSortChange={setCurrentSort} /> */}

      {/* Meditations Grid */}
      <div className="grid gap-8 lg:gap-16 md:grid-cols-2 lg:grid-cols-3">
        {visibleMeditations.map((meditation, index) => (
          <div
            key={meditation.slug}
            className="animate-fade-in opacity-0 [animation-fill-mode:forwards]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <MeditationCard
              title={meditation.frontmatter.title}
              image={meditation.frontmatter.image || "/images/meditations/default.png"}
              slug={meditation.slug}
              excerpt={meditation.frontmatter.excerpt}
            />
          </div>
        ))}
      </div>

      {/* Load More Button (commented out for now) */}
      {/* {hasMore && (
        <div className="flex justify-center mt-16">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="px-8 py-3 font-serif text-lg font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            Load More
          </button>
        </div>
      )} */}
    </>
  );
}
