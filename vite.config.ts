import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
const path = require('path');

export default defineConfig({
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, './src/store'),
      '@common': path.resolve(__dirname, './src/common'),
      '@components': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),
      '@static': path.resolve(__dirname, './src/static'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties']
        }
      }
    }),
    vanillaExtractPlugin()
  ],
  server: {
    host: '127.0.0.1',
    port: 3101
  }
});
