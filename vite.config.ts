import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    base: '/Al-Rahma/', // Crucial for GitHub Pages to load assets correctly
    define: {
      // Safely replace process.env.API_KEY with the actual key string during build
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      // Prevent "process is not defined" errors in browser for other libraries
      'process.env': JSON.stringify({}),
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    }
  };
});