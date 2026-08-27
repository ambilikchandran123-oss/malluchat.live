import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define metadata for all sub-routes to optimize SEO and prevent duplicate canonical penalties
const routeMetadata = {
  'strangers-mallu-chat': {
    title: 'Mallu Stranger Chat & Mallu Stranger Chat Website | MalluChat',
    description: 'The #1 Mallu stranger chat website for free anonymous Mallu stranger chat, Mallu free chat, and instant Mallu video calling without registration.'
  },
  'mallu-free-video-call': {
    title: 'Mallu Free Video Calling Website & Mallu Free Calling | MalluChat',
    description: 'Top-rated Mallu free video calling website offering unlimited Mallu free calling, Mallu video calling, and instant anonymous chat for Kerala users worldwide.'
  },
  'mallu-random-video-call': {
    title: 'Mallu Random Video Calling Website & Video Calling | MalluChat',
    description: 'Instant Mallu random video calling website for 1-on-1 Mallu video calling, random Mallu matching, and encrypted Mallu chat online with strangers.'
  },
  'mallu-chatting-website': {
    title: 'Mallu Chatting Website & Mallu Video Calling Website | MalluChat',
    description: 'Best Mallu chatting website and Mallu video calling website for Mallu chat online, Mallu free calling website, and live Mallu stranger chat.'
  },
  'malayalam-chat-online': {
    title: 'Mallu Chat Online & Malayalam Chat Online | MalluChat',
    description: 'Free Mallu chat online platform. Meet Malayalam speakers, join Kerala chat rooms, and enjoy Mallu free chat with Mallu video calling.'
  },
  'mallu-chatting-app': {
    title: 'Mallu Chat App - Mallu Video Calling Website | MalluChat',
    description: 'Use Mallu Chat App online for Mallu free video calling website features, Mallu stranger chat, and instant P2P video calling on Android & iPhone.'
  },
  'mallu-telegram-chatting': {
    title: 'Mallu Telegram Chatting Alternative - Mallu Stranger Chat | MalluChat',
    description: 'Looking for Mallu Telegram chatting groups? Join MalluChat for instant live Mallu stranger chat, Mallu free calling website rooms & video calls.'
  },
  'telegram-alternative-group-chat': {
    title: 'Telegram Alternative Group Chat - Mallu Free Chat | MalluChat',
    description: 'Best Telegram alternative group chat for Malayalam speakers. Enjoy safe, anonymous, free Mallu chat rooms, Mallu video calling, and random calls.'
  },
  'privacy': {
    title: 'Privacy Policy | Mallu Chat & Mallu Video Calling Website',
    description: 'Privacy Policy for MalluChat online strangers chat and Mallu free video calling website.'
  },
  'terms': {
    title: 'Terms of Service | Mallu Chat & Mallu Free Calling Website',
    description: 'Terms of Service for using MalluChat online live video chat and Kerala chat rooms.'
  },
  'aup': {
    title: 'Acceptable Use Policy | Mallu Chat & Stranger Chat',
    description: 'Acceptable Use Policy for MalluChat online strangers video calling and group chat.'
  },
  'disclaimer': {
    title: 'Disclaimer | Mallu Chat & Mallu Free Video Calling Website',
    description: 'Disclaimer for MalluChat free online video call and strangers chat platform.'
  }
};

const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Please run vite build first.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

console.log('Generating static folders and index.html files with route-specific SEO tags...');

Object.entries(routeMetadata).forEach(([route, meta]) => {
  const routeDir = path.join(distDir, route);
  const routeUrl = `https://malluchat.live/${route}`;
  
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  let customizedHtml = indexContent
    .replace('<link rel="canonical" href="https://malluchat.live/" />', `<link rel="canonical" href="${routeUrl}" />`)
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${meta.title}" />`)
    .replace(/<meta name="description"\s+content=".*?" \/>/s, `<meta name="description" content="${meta.description}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${routeUrl}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta property="og:description"\s+content=".*?" \/>/s, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta property="twitter:url" content=".*?" \/>/, `<meta property="twitter:url" content="${routeUrl}" />`)
    .replace(/<meta property="twitter:title" content=".*?" \/>/, `<meta property="twitter:title" content="${meta.title}" />`)
    .replace(/<meta property="twitter:description"\s+content=".*?" \/>/s, `<meta property="twitter:description" content="${meta.description}" />`);

  fs.writeFileSync(path.join(routeDir, 'index.html'), customizedHtml, 'utf8');
  console.log(`✅ Generated: dist/${route}/index.html (Canonical: ${routeUrl})`);
});

console.log('🎉 All static SEO routes generated successfully with unique metadata!');
