import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({

    base: "/larsen-ultimate-encyclopedia/",

    build: {

        outDir: "docs",

        rollupOptions: {

            input: {

                main: resolve(__dirname, "index.html"),

                explorer: resolve(__dirname, "src/pages/explorer.html"),

                encyclopedia: resolve(__dirname, "src/pages/encyclopedia.html"),

                tree: resolve(__dirname, "src/pages/tree.html")

            }

        }

    }

});