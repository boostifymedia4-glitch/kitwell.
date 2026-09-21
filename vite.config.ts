import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  define: { __SITE_URL__: JSON.stringify((process.env.SITE_URL ?? 'https://www.example.com').replace(/\/+$/, '')) },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { target: 'es2022', sourcemap: false, cssCodeSplit: true },
  test: { environment: 'node', include: ['tests/**/*.test.ts'] },
});
