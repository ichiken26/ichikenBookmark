import { useEffect, useRef } from "react";
import type { Category } from "../types";
import CategoryNavigation from "./CategoryNavigation";

type Props = {
  open: boolean;
  categories: Category[];
  onClose: () => void;
  onSelect: (categoryId: string) => void;
};

export default function SideMenu({ open, categories, onClose, onSelect }: Props) {
  const panelRef = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>("button, a[href]"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="side-menu-layer" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <aside id="category-side-menu" ref={panelRef} className="side-menu" role="dialog" aria-modal="true" aria-labelledby="side-menu-title">
        <div className="side-menu__header">
          <h2 id="side-menu-title">カテゴリ</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="メニューを閉じる">×</button>
        </div>
        <CategoryNavigation categories={categories} onSelect={(id) => { onSelect(id); onClose(); }} />
      </aside>
    </div>
  );
}
