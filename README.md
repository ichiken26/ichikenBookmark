# Bookmark Library

Public React/Vite frontend for `https://bookmark.kokage-studio.com/`. It intentionally contains no link to the CMS.

The first request loads only `GET /api/v1/categories`. Bookmark rows are loaded and cached per category from `GET /api/v1/categories/:categoryId/bookmarks` when a category is opened or selected from the table of contents.

## Development and validation

```sh
npm ci
npm run type-check
npm run design:lint
npm run build
npm run deploy
```

Development proxies `/api/v1` to `https://bookmark.kokage-studio.com`. Set `VITE_API_ROOT` only when the API uses a different origin; production normally uses the same origin and leaves it empty.

Deploy the assets with Wrangler. The route `bookmark.kokage-studio.com/*` is intentionally broad; Cloudflare selects the more specific `/api/v1/*` and `/admin/*` routes configured by the API and CMS Workers.
