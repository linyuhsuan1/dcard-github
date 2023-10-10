import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/dcard-github/",
  plugins: [
    react({
      include: "**/*.{jsx,tsx}",
    }),
  ],
  server: {
    proxy: {
      "/access_token": {
        target: "https://github.com/login/oauth/access_token", //实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
