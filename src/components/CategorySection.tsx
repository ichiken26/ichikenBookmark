import BookmarkList from "../ListComponent/BookmarkList";
import { categoryAnchor } from "../lib/categoryAnchor";
import type { Category } from "../types";
import type { BookmarkLoadState } from "../hooks/useBookmarkCategories";

type Props = {
  category: Category;
  expanded: boolean;
  state?: BookmarkLoadState;
  onToggle: () => void;
  onRetry: () => void;
};

export default function CategorySection({ category, expanded, state, onToggle, onRetry }: Props) {
  const contentId = `${categoryAnchor(category.id)}-content`;
  return (
    <section className="category-section" id={categoryAnchor(category.id)}>
      <h2>
        <button type="button" className="category-toggle" onClick={onToggle} aria-expanded={expanded} aria-controls={contentId}>
          <span>{category.name}</span>
          <span className="category-toggle__meta">{category.bookmarkCount} 件 <span aria-hidden="true">{expanded ? "−" : "+"}</span></span>
        </button>
      </h2>
      {expanded && (
        <div id={contentId} className="category-content">
          {(!state || state.status === "loading" || state.status === "idle") && <p className="status-text" role="status">読み込み中…</p>}
          {state?.status === "error" && <div className="inline-error" role="alert"><p>ブックマークを取得できませんでした。</p><button type="button" onClick={onRetry}>再試行</button></div>}
          {state?.status === "ready" && state.items.length === 0 && <p className="empty-text">このカテゴリにはまだブックマークがありません。</p>}
          {state?.status === "ready" && state.items.length > 0 && <BookmarkList items={state.items} />}
        </div>
      )}
    </section>
  );
}
