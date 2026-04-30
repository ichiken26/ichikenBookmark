import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiTarget = "https://bookmarksiteapi.62ichiken.workers.dev";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
});
