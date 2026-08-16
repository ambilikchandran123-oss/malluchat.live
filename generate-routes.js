import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define metadata for all sub-routes to optimize SEO and prevent duplicate canonical penalties
const routeMetadata = {
  'strangers-mallu-chat': {
    title: 'Strangers Mallu Chat Online - Free Video Call & Stranger Chat | MalluChat',
    description: 'Join strangers mallu chat online for free anonymous video calling & live Malayalam chat rooms. Connect instantly with strangers in Kerala without registration.'
  },
  'mallu-free-video-call': {
    title: 'Mallu Free Video Call Online - Live Mallu Random Video Calling | MalluChat',
    description: 'Free Mallu video call website with zero registration. Connect with Mallus worldwide for 1-on-1 random video chat, live Malayalam calls & strangers chat.'
  },
  'mallu-random-video-call': {
    title: 'Mallu Random Video Call & Roundam Calling Online | MalluChat',
    description: 'Instant 1-on-1 Mallu random video call website. Connect live with Malayalam speakers and Kerala strangers for encrypted free video calls.'
  },
  'mallu-chatting-website': {
    title: 'Mallu Chatting Website - Free Malayalam Live Chat Rooms Online | MalluChat',
    description: 'The #1 Mallu chatting website for live Malayalam chat rooms, strangers mallu chat, and free online video calling for Kerala boys, girls & NRIs.'
  },
  'malayalam-chat-online': {
    title: 'Malayalam Chat Online - Kerala Chat Room & Strangers Chat | MalluChat',
    description: 'Free Malayalam chat online platform. Meet Malayalam speakers, join Kerala chat rooms, and enjoy anonymous video calling with strangers.'
  },
  'mallu-chatting-app': {
    title: 'Mallu Chatting App - Free Mallu Video Call & Stranger Chat App | MalluChat',
    description: 'Download or use Mallu Chatting App online for free random video calls, stranger Malayalam chat, and instant P2P calling on Android & iPhone.'
  },
  'mallu-telegram-chatting': {
    title: 'Mallu Telegram Chatting & Group Alternatives Online | MalluChat',
    description: 'Looking for Mallu Telegram chatting groups? Join MalluChat for instant live strangers chat, group rooms & free video call without phone numbers.'
  },
  'telegram-alternative-group-chat': {
    title: 'Telegram Alternative Group Chat - Free Malayalam Live Chat | MalluChat',
    description: 'Best Telegram alternative group chat for Malayalam speakers. Enjoy safe, anonymous, free Mallu chat rooms and random video calls.'
  },
  'privacy': {
    title: 'Privacy Policy | MalluChat Online',
    description: 'Privacy Policy for MalluChat online strangers chat and free video calling website.'
  },
  'terms': {
    title: 'Terms of Service | MalluChat Online',
    description: 'Terms of Service for using MalluChat online live video chat and Kerala chat rooms.'
  },
  'aup': {
    title: 'Acceptable Use Policy | MalluChat Online',
    description: 'Acceptable Use Policy for MalluChat online strangers video calling and group chat.'
  },
  'disclaimer': {
    title: 'Disclaimer | MalluChat Online',
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
