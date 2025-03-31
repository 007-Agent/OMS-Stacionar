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
    port: 5000,
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

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// // Определите пути для алиасов
// const alias = {
//   root: path.resolve(__dirname, 'src'),
// };

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: alias,
//   },
//   build: {
//     outDir: 'docs',
//     rollupOptions: {
//       input: {
//         main: path.resolve(__dirname, 'src/index.html'), // Общий файл
         
//         admin: path.resolve(__dirname, 'src/admin.html'), // Проект admin
//       },
//     },
//   },
//   server: {
//     port: 9000,
//     proxy: {
//       '/api': {
//         target: 'http://10.16.1.28:8080',
//         changeOrigin: true,
//       },
//       '/rest': {
//         target: 'http://10.16.1.28:8080',
//         changeOrigin: true,
//       },
//       '/policy': {
//         target: 'http://10.16.1.28:8080',
//         changeOrigin: true,
//       },
//     },
//   },
// });