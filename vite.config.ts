import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// SITE_URL wins; on Vercel the production domain is used; otherwise a placeholder (see README).
const siteUrl = (process.env.SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://www.example.com')).replace(/\/+$/, '');

export default defineConfig({
  plugins: [react()],
  define: { __SITE_URL__: JSON.stringify(siteUrl) },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { target: 'es2022', sourcemap: false, cssCodeSplit: true },
  test: { environment: 'node', include: ['tests/**/*.test.ts'] },
});
