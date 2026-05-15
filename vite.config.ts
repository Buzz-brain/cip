import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic'
  })],
  base: "/",
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "src/assets"),
      "@components": resolve(__dirname, "src/components"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Only split React and major UI libraries to avoid circular deps
          if (id.includes('node_modules')) {
            if (id.includes('react') && (id.includes('react-dom') || id.includes('react-router'))) return 'vendor-react';
            if (id.includes('@radix-ui')) return 'vendor-radix';
            if (id.includes('@reown')) return 'vendor-appkit';
          }
        }
      }
    },
    chunkSizeWarningLimit: 2000, // Increase limit, focus on real issues
  },
});
