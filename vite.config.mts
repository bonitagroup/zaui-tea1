import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import zaloMiniApp from "zmp-vite-plugin";
import path from 'path';

export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [
      tsconfigPaths(),
      react(),
      zaloMiniApp()
    ],
     resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  });
};
