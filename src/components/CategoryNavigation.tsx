import { categoryAnchor } from "../lib/categoryAnchor";
import type { Category } from "../types";

type Props = {
  categories: Category[];
  onSelect: (categoryId: string) => void;
  className?: string;
};

export default function CategoryNavigation({ categories, onSelect, className }: Props) {
  return (
    <nav className={className} aria-label="カテゴリ一覧">
      <ol className="category-navigation">
        {categories.map((category) => (
          <li key={category.id}>
            <a href={`#${categoryAnchor(category.id)}`} onClick={() => onSelect(category.id)}>
              <span>{category.name}</span>
              <span className="category-navigation__count">{category.bookmarkCount}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
