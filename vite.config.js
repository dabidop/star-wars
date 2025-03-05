import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173
  },
  preview: {
    allowedHosts: ['star-wars-7hvc.onrender.com']
  }
});
