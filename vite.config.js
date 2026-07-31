import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/larsen-ultimate-encyclopedia/",

  build: {
    outDir: "docs",

    emptyOutDir: true,

    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        explorer: resolve(__dirname, "explorer.html"),
        encyclopedia: resolve(__dirname, "encyclopedia.html"),
        tree: resolve(__dirname, "tree.html"),
      },
    },
  },
});