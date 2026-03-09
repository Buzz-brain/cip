import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
