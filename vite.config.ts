import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiTarget = "https://bookmark.kokage-studio.com";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
});
