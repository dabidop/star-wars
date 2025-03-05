import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',  // Permite que la app sea accesible desde fuera
    port: process.env.PORT || 5173, // Usa el puerto asignado por Render
  }
});