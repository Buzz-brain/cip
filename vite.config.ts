import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic'
  })],
  base: "./",
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
          // Split node_modules into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('@iexec')) return 'vendor-iexec';
            if (id.includes('ethers')) return 'vendor-ethers';
            if (id.includes('web3modal')) return 'vendor-web3modal';
            if (id.includes('@radix-ui')) return 'vendor-radix';
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('framer-motion') || id.includes('lucide-react')) return 'vendor-anim';
            return 'vendor-other';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1500, // Suppress warnings until we hit 1.5MB
  },
});
