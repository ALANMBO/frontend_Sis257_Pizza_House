import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), // Habilita soporte para Vue SFCs
    vueJsx(), // Habilita soporte para JSX en Vue
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Alias para rutas más limpias
    },
  },
  build: {
    sourcemap: false, // Desactiva los mapas de fuente en producción
    target: 'esnext', // Estándar JS más reciente
    minify: 'esbuild', // Minificación rápida y eficiente
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Redirige las solicitudes API al backend
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: ['dependency1', 'dependency2'], // Reemplaza con dependencias importantes para optimización
  },
});
