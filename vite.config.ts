import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// User site: https://zolocke.github.io/  → base must be "/"
export default defineConfig({
  base: "/",
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
    // Avoid "assets" — macOS case-insensitive FS collides with legacy Assets/
    assetsDir: "build",
    emptyOutDir: true,
    sourcemap: false,
  },
  publicDir: "public",
});
