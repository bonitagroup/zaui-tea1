import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import zaloMiniApp from "zmp-vite-plugin";

export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [
      tsconfigPaths(),
      react(),
      zaloMiniApp()
    ],
  });
};
