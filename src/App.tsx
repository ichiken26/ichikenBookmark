import { useCallback, useEffect, useState } from "react";
import CategoryNavigation from "./components/CategoryNavigation";
import CategorySection from "./components/CategorySection";
import SideMenu from "./components/SideMenu";
import SiteHeader from "./components/SiteHeader";
import { useBookmarkCategories } from "./hooks/useBookmarkCategories";
import { categoryAnchor } from "./lib/categoryAnchor";
import { applyTheme, currentTheme, type Theme } from "./theme";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(currentTheme);
  const { categories, categoryStatus, bookmarkStates, expanded, loadCategories, loadBookmarks, openCategory, toggleCategory } = useBookmarkCategories();

  const selectCategory = useCallback((categoryId: string) => {
    openCategory(categoryId);
    requestAnimationFrame(() => document.getElementById(categoryAnchor(categoryId))?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [openCategory]);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleTheme = useCallback(() => {
    setTheme((previous) => {
      const next = previous === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  useEffect(() => {
    if (categoryStatus !== "ready") return;
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      const category = categories.find((item) => categoryAnchor(item.id) === hash);
      if (category) selectCategory(category.id);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [categories, categoryStatus, selectCategory]);

  return (
    <div id="top" className="app-shell">
      <SiteHeader menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} theme={theme} onThemeToggle={toggleTheme} />
      <SideMenu open={menuOpen} categories={categories} onClose={closeMenu} onSelect={selectCategory} />
      <main>
        <section className="hero" aria-labelledby="page-title">
          <h1 id="page-title">bookMarkSite</h1>
          <p className="lead">presented by KOKAGE</p>
        </section>
        {categoryStatus === "loading" && <p className="page-status" role="status">カテゴリを読み込んでいます…</p>}
        {categoryStatus === "error" && <div className="page-status page-status--error" role="alert"><p>カテゴリを取得できませんでした。</p><button type="button" onClick={() => void loadCategories()}>再試行</button></div>}
        {categoryStatus === "ready" && categories.length === 0 && <p className="page-status">カテゴリはまだありません。</p>}
        {categories.length > 0 && (
          <>
            <section className="table-of-contents" aria-labelledby="toc-title">
              <div><p className="section-label">INDEX</p><h2 id="toc-title">目次</h2></div>
              <CategoryNavigation categories={categories} onSelect={selectCategory} />
            </section>
            <div className="category-list">
              {categories.map((category) => <CategorySection key={category.id} category={category} expanded={expanded.has(category.id)} state={bookmarkStates[category.id]} onToggle={() => toggleCategory(category.id)} onRetry={() => void loadBookmarks(category.id, true)} />)}
            </div>
          </>
        )}
      </main>
      <footer><p>Bookmark Library</p><a href="#top">ページ先頭へ</a></footer>
    </div>
  );
}

export default App;
