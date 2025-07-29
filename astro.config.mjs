import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export Astro config
export default defineConfig({
  output: 'server', 
  adapter: cloudflare(),
});
