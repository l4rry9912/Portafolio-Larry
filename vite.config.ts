import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  assetsInclude: ['**/*.glb'],
  // Rapier carga WASM vía @dimforge/rapier3d-compat; pre-bundlar en deps rompe el init y lanza
  // "Cannot read properties of undefined (reading 'raweventqueue_new')" en <Physics>.
  optimizeDeps: {
    include: ['swiper/react', 'swiper'],
    exclude: ['@react-three/rapier', '@dimforge/rapier3d-compat'],
  },
})
