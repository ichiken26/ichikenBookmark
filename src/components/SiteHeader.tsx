type Props = { menuOpen: boolean; onMenuOpen: () => void };

export default function SiteHeader({ menuOpen, onMenuOpen }: Props) {
  return (
    <header className="site-header">
      <a className="site-brand" href="#top" aria-label="Bookmark Library ページ先頭へ">
        <img className="site-brand__mark" src="/favicon.ico" alt="" width={32} height={32} aria-hidden="true" />
        <span>Bookmark Library</span>
      </a>
      <button className="menu-button" type="button" onClick={onMenuOpen} aria-label="カテゴリメニューを開く" aria-expanded={menuOpen} aria-controls="category-side-menu">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </header>
  );
}
