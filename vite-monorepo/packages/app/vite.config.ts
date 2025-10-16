import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { jsxToolDevServer } from "@jsx-tool/jsx-tool/vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), jsxToolDevServer({
    additionalDirectories: ['../shared']
  })],
});
