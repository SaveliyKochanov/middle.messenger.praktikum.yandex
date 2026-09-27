import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  root: "src/app",
  publicDir: "../../public",
  preview: {
    open: true,
    port: Number(process.env.PORT) || 3000
  },
  resolve: {
    alias: {
      "@": `${import.meta.dirname}/src`,
    }
  },
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
  },
  server: {
    open: true,
    port: Number(process.env.PORT) || 3000
  },
});
