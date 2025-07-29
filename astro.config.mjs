import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import dotenv from 'dotenv';
import astroIcon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite'

// Load environment variables from .env file
dotenv.config();

// Export Astro config
export default defineConfig({
  output: 'server', 
  adapter: cloudflare(),
  site: 'https://thiennh.icu',
  integrations: [astroIcon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
