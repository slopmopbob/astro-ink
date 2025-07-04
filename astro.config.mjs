import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { defineConfig } from "astro/config";
import staticAdapter from "@astrojs/adapter-static";
import markdoc from "@astrojs/markdoc";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import remarkCodeTitles from 'remark-code-titles';
import decapCmsOauth from "astro-decap-cms-oauth";

// https://astro.build/config
export default defineConfig( /** @type {import('astro').AstroUserConfig} */{

  adapter: staticAdapter(),
  output: 'static',
  site: 'https://astro-ink.vercel.app', // You can update this to your Cloudflare site later
  server: {
    // port: 4321,
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'css-variables',
    },
    remarkPlugins: [
      remarkCodeTitles
    ]
  },
  integrations: [
    mdx(), 
    markdoc(),
    svelte(), 
    tailwind({
      applyBaseStyles: false,
    }), 
    sitemap(),
    decapCmsOauth()
  ],
  vite: {
    plugins: [],
    resolve: {
      alias: {
        $: path.resolve(__dirname, './src')
      }
    },
    optimizeDeps: {
      allowNodeBuiltins: true
    }
  }
});

