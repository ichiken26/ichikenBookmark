import type { ApiResponse, Bookmark, Category } from "./types";

const configuredRoot = String(import.meta.env.VITE_API_ROOT ?? "").replace(/\/$/, "");
const API_ROOT = `${configuredRoot}/api/v1`;

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_ROOT}${path}`, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  return (await response.json()) as T;
}

export async function fetchCategories(signal?: AbortSignal): Promise<Category[]> {
  const response = await request<ApiResponse<Category[]>>("/categories", signal);
  return response.data ?? [];
}

export async function fetchBookmarks(categoryId: string, signal?: AbortSignal): Promise<Bookmark[]> {
  const response = await request<ApiResponse<Bookmark[]>>(
    `/categories/${encodeURIComponent(categoryId)}/bookmarks`,
    signal,
  );
  return response.data ?? [];
}
