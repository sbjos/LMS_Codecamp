import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    sourcemap: true, // Enable source maps in production
  },
  server: {
    sourcemap: true, // Enable source maps in development
  },
});
