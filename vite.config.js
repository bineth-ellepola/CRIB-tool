import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/fineract-api': {
        target: 'https://sejaya-uat.finflux.io',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/fineract-api/, ''),
      },
    },
  },
});