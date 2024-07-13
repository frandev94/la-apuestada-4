import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { loadEnv } from "vite";

const { BASE, SITE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: SITE,
  base: BASE,
});
