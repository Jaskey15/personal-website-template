export type SortOption = 'popular' | 'newest' | 'oldest';

interface SortingBarProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function SortingBar({ currentSort, onSortChange }: SortingBarProps) {
  const options: { value: SortOption; label: string }[] = [
    { value: 'popular', label: 'Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];

  return (
    <div className="flex justify-center items-center mb-12">
      <div className="flex items-center gap-4 font-serif">
        {options.map((option, index) => (
          <div key={option.value} className="flex items-center gap-4">
            <button
              onClick={() => onSortChange(option.value)}
              className={`
                text-lg tracking-wide transition-colors duration-300
                ${
                  currentSort === option.value
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {option.label}
            </button>
            {index < options.length - 1 && (
              <span className="text-border">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
