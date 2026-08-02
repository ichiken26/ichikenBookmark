import type { Theme } from "../theme";

type Props = { menuOpen: boolean; onMenuOpen: () => void; theme: Theme; onThemeToggle: () => void };

export default function SiteHeader({ menuOpen, onMenuOpen, theme, onThemeToggle }: Props) {
  return (
    <header className="site-header">
      <a className="site-brand" href="#top" aria-label="Bookmark Library ページ先頭へ">
        <img className="site-brand__mark" src="/favicon.ico" alt="" width={32} height={32} aria-hidden="true" />
        <span>Bookmark Library</span>
      </a>
      <div className="header-actions">
        <button className="theme-toggle" type="button" onClick={onThemeToggle} aria-label={`${theme === "dark" ? "ライト" : "ダーク"}モードに切り替える`} title={`${theme === "dark" ? "ライト" : "ダーク"}モードに切り替える`} aria-pressed={theme === "dark"}>
          <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
        </button>
        <button className="menu-button" type="button" onClick={onMenuOpen} aria-label="カテゴリメニューを開く" aria-expanded={menuOpen} aria-controls="category-side-menu">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
