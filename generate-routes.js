import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define metadata for all sub-routes to optimize SEO and prevent duplicate canonical penalties
const routeMetadata = {
  'strangers-mallu-chat': {
    title: 'Mallu Stranger Chat Online - Free Anonymous Malayalam Chat | MalluChat',
    description: 'Connect instantly on Mallu Stranger Chat. Enjoy free anonymous Malayalam text chat rooms and encrypted stranger video calls without registration.'
  },
  'mallu-free-video-call': {
    title: 'Mallu Free Video Calling Online - HD Stranger Calls | MalluChat',
    description: 'Top-rated Mallu free video calling platform. High-definition 1-on-1 random video calls for Malayalam speakers in Kerala and worldwide.'
  },
  'mallu-random-video-call': {
    title: 'Mallu Random Video Call Online - Kerala Stranger Match | MalluChat',
    description: 'Instant Mallu random video calling. Connect 1-on-1 with Malayalam strangers for live video calls and encrypted chat.'
  },
  'mallu-chatting-website': {
    title: 'Mallu Chat Online - Free Kerala Chat Rooms & Video Calls | MalluChat',
    description: 'Best Mallu chat online website for Malayalis. Enjoy anonymous chat rooms, voice calling, and stranger video chat with zero logins.'
  },
  'malayalam-chat-online': {
    title: 'Malayalam Chat Online - Meet Kerala Strangers & Chat Rooms | MalluChat',
    description: 'Join Malayalam Chat Online to connect with Malayalees in Kochi, Trivandrum, Kozhikode, and Gulf NRIs. 100% free text & video chat.'
  },
  'mallu-chatting-app': {
    title: 'Mallu Chat App - Malayalam Stranger Video Call Online | MalluChat',
    description: 'Use Mallu Chat App online for instant stranger video calling, anonymous group chat rooms, and web P2P calls on mobile and desktop.'
  },
  'mallu-telegram-chatting': {
    title: 'Mallu Telegram Chat Alternative - Malayalam Stranger Chat | MalluChat',
    description: 'Looking for Mallu Telegram chat groups? Join MalluChat for instant live Malayalam stranger chat rooms, P2P video calls, and voice chat.'
  },
  'telegram-alternative-group-chat': {
    title: 'Telegram Alternative Group Chat for Malayalam Speakers | MalluChat',
    description: 'Best Telegram alternative for anonymous Malayalam group chats, stranger video calls, and Kerala online chat rooms.'
  },
  'privacy': {
    title: 'Privacy Policy | Mallu Chat Online',
    description: 'Privacy Policy for MalluChat online strangers chat and free video calling website.'
  },
  'terms': {
    title: 'Terms of Service | Mallu Chat Online',
    description: 'Terms of Service for using MalluChat online live video chat and Kerala chat rooms.'
  },
  'aup': {
    title: 'Acceptable Use Policy | Mallu Chat Online',
    description: 'Acceptable Use Policy for MalluChat online strangers video calling and group chat.'
  },
  'disclaimer': {
    title: 'Disclaimer | Mallu Chat Online',
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
