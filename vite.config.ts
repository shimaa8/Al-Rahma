import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    // Base must be './' for relative paths on GitHub Pages
    base: './', 
    define: {
      // This injects the API Key from GitHub Secrets into the built app
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      // This prevents "process is not defined" crashes in the browser
      'process.env': JSON.stringify({}),
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      // Increase chunk size limit to prevent warnings
      chunkSizeWarningLimit: 1000,
    }
  };
});