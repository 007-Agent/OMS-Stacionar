import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Определите пути для алиасов
const alias = {
  root: path.resolve(__dirname, 'src'),
  
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: alias,
  },
  build: {
    outDir: 'docs',
  },
  server: {
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://10.16.1.28:8080',
        changeOrigin: true,
      },
      '/rest': {
        target: 'http://10.16.1.28:8080',
        changeOrigin: true,
      },
      '/policy': {
        target: 'http://10.16.1.28:8080',
        changeOrigin: true,
      },
    },
  },
});