import { defineConfig } from 'vite';
import path from 'path';
import chokidar from 'chokidar';
import fs from 'fs';

function autoImportPlugin(config) {
  const moduleUrl = new URL(import.meta.url);
  const watchDir = path.resolve(__dirname, '../src'); // Replace with your target directory

  chokidar.watch(watchDir).on('add', (filePath) => {
    const relativePath = path.relative(config.root, filePath);
    // Dynamically import the file using relativePath
    console.log(`Importing new file: ${relativePath}`);

    // Update the import statement in your main entry file (e.g., main.js or index.js)
    const entryFile = path.resolve(config.root, 'src/main.js'); // Replace with your main entry file
    const fileContent = fs.readFileSync(entryFile, 'utf-8');
    const newFileContent = fileContent + `\nimport '${relativePath}';`;
    fs.writeFileSync(entryFile, newFileContent, 'utf-8');
  });

  return {
    name: 'auto-import-plugin',
    apply: 'serve', // Apply only in dev mode
    configResolved(config) {
      // Perform additional configuration if needed
    },
  };
}

export default defineConfig({
  plugins: [autoImportPlugin()],
});
