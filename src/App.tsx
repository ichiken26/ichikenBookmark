import { useEffect, useMemo, useState } from "react";
import BookmarkList, { type BookmarkItem } from "./ListComponent/BookmarkList";

type BookmarkTreeCategory = {
  id: string;
  name: string;
  sortOrder: number;
  bookmarks: BookmarkItem[];
};

type BookmarkTreeResponse = {
  data: BookmarkTreeCategory[];
};

function App() {
  const [categories, setCategories] = useState<BookmarkTreeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiRoot = useMemo(() => {
    const raw = import.meta.env.VITE_ROOT_URL;
    if (raw === undefined || raw === null) return "";
    return String(raw).replace(/\/$/, "");
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${apiRoot}/api/bookmark-tree`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`APIエラー: ${response.status}`);
        }

        const json = (await response.json()) as BookmarkTreeResponse;
        setCategories(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("ブックマークの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => controller.abort();
  }, [apiRoot]);

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">便利サイト一覧</p>
        <h1>bookMarkSite</h1>
        <p className="lead">以下ブックマーク一覧（API取得）</p>
        {loading && <p className="status-text">読み込み中...</p>}
        {error && <p className="status-text status-text--error">{error}</p>}
        {!loading &&
          !error &&
          categories.map((category) => (
            <section key={category.id}>
              <h2>{category.name}</h2>
              <BookmarkList items={category.bookmarks} />
            </section>
          ))}
      </section>
    </main>
  );
}

export default App;
