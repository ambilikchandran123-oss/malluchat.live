import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all sub-routes that need to be indexable by search engines
const routes = [
  'privacy',
  'terms',
  'aup',
  'disclaimer',
  'mallu-chatting-app',
  'mallu-telegram-chatting',
  'telegram-alternative-group-chat',
  'malayalam-chat-online'
];

const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Please run vite build first.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

console.log('Generating static folders and index.html files for SEO routing...');

routes.forEach(route => {
  const routeDir = path.join(distDir, route);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  // Write index.html copy into the directory
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexContent, 'utf8');
  console.log(`✅ Created: dist/${route}/index.html`);
});

console.log('🎉 All static SEO routes generated successfully!');
