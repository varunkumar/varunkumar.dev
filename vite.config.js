import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const buildTime = new Date().toISOString();

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'write-version',
      configResolved() {
        const dest = path.resolve(process.cwd(), 'public/version.json');
        fs.writeFileSync(dest, JSON.stringify({ buildTime }));
      },
    },
  ],
  define: {
    'import.meta.env.VITE_BUILD_TIME': JSON.stringify(buildTime),
  },
  build: {
    outDir: 'dist',
  },
});
