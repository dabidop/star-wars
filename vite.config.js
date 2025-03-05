import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()], // Asegura que Vite maneje archivos .vue
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173
  }
});