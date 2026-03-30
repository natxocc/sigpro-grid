import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'grid', 
    lib: {
      entry: resolve(__dirname, 'main.js'),
      name: 'AgGrid',
      fileName: () => `grid.js`,
      formats: ['es']
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug'],
        passes: 2,
      },
      format: {
        comments: false,
      },
      mangle: {
        toplevel: true,
      }
    },
    emptyOutDir: true
  }
});
