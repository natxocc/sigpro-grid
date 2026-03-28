import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      // Asumiendo que tu archivo con los registros se llama main.js o index.js
      entry: resolve(__dirname, 'main.js'),
      name: 'AgGridCustom',
      // Nombre del archivo final
      fileName: () => `grid.js`,
      formats: ['es']
    },
    rollupOptions: {
      // Mantenemos 'sigpro' afuera para que el bundle no falle 
      // y asuma que ya existe en el entorno donde se importe.
      external: ['sigpro'],
      output: {
        globals: {
          sigpro: 'sigpro'
        },
        // Esto evita que se generen archivos CSS separados
        // y que todo el JS se mantenga en un solo bloque.
        manualChunks: undefined,
      }
    },
    // Es vital para AG Grid Enterprise porque es una librería muy pesada.
    // Esto reducirá el tamaño del archivo final significativamente.
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,       // Elimina console.logs
        drop_debugger: true,      // Elimina debuggers
        pure_funcs: ['console.info', 'console.debug'], // Elimina funciones específicas
        passes: 2,                // Ejecuta la compresión 2 veces para optimizar más
      },
      format: {
        comments: false,          // Borra TODOS los comentarios (incluso licencias)
      },
      mangle: {
        toplevel: true,           // Ofusca variables en el scope global del bundle
      }
    },
    emptyOutDir: true
  }
});
