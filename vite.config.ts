/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
// import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
//   plugins: [react() , tsconfigPaths()],
plugins: [ tsconfigPaths()],
  test: {
    globals: true,
    coverage: {
      provider: "istanbul", // or 'v8'
    },
  },
});