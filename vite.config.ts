import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'NEXACORE | Инжиниринг полного цикла',
        },
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
