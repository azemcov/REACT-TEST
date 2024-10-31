import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/REACT-TEST/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './src/components'),
      '@customTypes': path.resolve(__dirname, './src/customTypes/'),
      '@src': path.resolve(__dirname, './src/'),
    },
  },
});
