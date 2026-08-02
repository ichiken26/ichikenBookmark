import { useCallback, useEffect, useRef, useState } from "react";
import { fetchBookmarks, fetchCategories } from "../api";
import type { Bookmark, Category } from "../types";

export type BookmarkLoadState = {
  items: Bookmark[];
  status: "idle" | "loading" | "ready" | "error";
};

const emptyState = (): BookmarkLoadState => ({ items: [], status: "idle" });

export function useBookmarkCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryStatus, setCategoryStatus] = useState<"loading" | "ready" | "error">("loading");
  const [bookmarkStates, setBookmarkStates] = useState<Record<string, BookmarkLoadState>>({});
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const controllers = useRef(new Map<string, AbortController>());
  const loaded = useRef(new Set<string>());
  const categoryController = useRef<AbortController | null>(null);

  const loadCategories = useCallback(async () => {
    categoryController.current?.abort();
    const controller = new AbortController();
    categoryController.current = controller;
    setCategoryStatus("loading");
    try {
      const data = await fetchCategories(controller.signal);
      setCategories(data);
      setCategoryStatus("ready");
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) setCategoryStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadCategories();
    return () => {
      categoryController.current?.abort();
      controllers.current.forEach((controller) => controller.abort());
    };
  }, [loadCategories]);

  const loadBookmarks = useCallback(async (categoryId: string, force = false) => {
    if (!force && (loaded.current.has(categoryId) || controllers.current.has(categoryId))) return;
    setBookmarkStates((current) => {
      const state = current[categoryId] ?? emptyState();
      return { ...current, [categoryId]: { ...state, status: "loading" } };
    });

    controllers.current.get(categoryId)?.abort();
    const controller = new AbortController();
    controllers.current.set(categoryId, controller);
    try {
      const items = await fetchBookmarks(categoryId, controller.signal);
      loaded.current.add(categoryId);
      setBookmarkStates((current) => ({ ...current, [categoryId]: { items, status: "ready" } }));
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setBookmarkStates((current) => ({
          ...current,
          [categoryId]: { items: current[categoryId]?.items ?? [], status: "error" },
        }));
      }
    } finally {
      if (controllers.current.get(categoryId) === controller) controllers.current.delete(categoryId);
    }
  }, []);

  const openCategory = useCallback((categoryId: string) => {
    setExpanded((current) => new Set(current).add(categoryId));
    void loadBookmarks(categoryId);
  }, [loadBookmarks]);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(categoryId)) next.delete(categoryId);
      else {
        next.add(categoryId);
        void loadBookmarks(categoryId);
      }
      return next;
    });
  }, [loadBookmarks]);

  return {
    categories,
    categoryStatus,
    bookmarkStates,
    expanded,
    loadCategories,
    loadBookmarks,
    openCategory,
    toggleCategory,
  };
}
