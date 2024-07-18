import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function generateAliases() {
   const aliases = {
      '@': 'src',
      '@StaticsData': 'src/StaticsData',
      '@pages': 'src/AdminPages/pages',
      '@components': 'src/AdminPages/components',
      '@userPages': 'src/UserPages/pages',
      '@userComponents': 'src/UserPages/components',
      '@redux': 'src/redux',
   };

   const resolvedAliases = {};
   for (const alias in aliases) {
      resolvedAliases[alias] = path.resolve(__dirname, aliases[alias]);
   }

   return resolvedAliases;
}

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   resolve: {
      alias: generateAliases(),
   },
});
