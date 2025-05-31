import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/auth': 'http://localhost:5000',
      '/generate-task': 'http://localhost:5000',
      '/update-task': 'http://localhost:5000',
      '/tasks': 'http://localhost:5000'
    }
  },
});
