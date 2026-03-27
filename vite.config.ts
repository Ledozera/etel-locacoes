import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        '/api/veiculos': {
          target: env.BUBBLE_API_URL || 'https://financeiro-etel-89910.bubbleapps.io/version-test/api/1.1/obj/veiculos',
          changeOrigin: true,
          rewrite: (path) => {
            const url = new URL(path, 'http://localhost');
            const bubble_id = url.searchParams.get('bubble_id');
            const constraints = url.searchParams.get('constraints');
            
            if (bubble_id) return `/${bubble_id}`;
            if (constraints) return `?constraints=${encodeURIComponent(constraints)}`;
            return '';
          }
        },
        '/api/email': {
          target: 'https://api.brevo.com/v3/smtp/email',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/email/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader('api-key', env.BREVO_API_KEY || '');
            });
          }
        }
      }
    }
  }
})
