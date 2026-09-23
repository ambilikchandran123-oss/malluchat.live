import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define metadata for all sub-routes to optimize SEO and prevent duplicate canonical penalties
const routeMetadata = {
  'mallu-stranger-chat-website': {
    title: 'Mallu Stranger Chat Website - #1 Free Malayalam Strangers Chat & Video | MalluChat',
    description: 'Join the #1 Mallu stranger chat website on MalluChat.live. Instant anonymous Malayalam strangers chatting, live Kerala chat rooms, & 1-on-1 random video calls with zero registration.',
    h1: 'Mallu Stranger Chat Website - Anonymous Malayalam Chat with Strangers',
    intro: 'Welcome to MalluChat.live, Kerala&apos;s leading <strong>Mallu stranger chat website</strong> and top destination for <strong>Malayalam strangers chatting</strong>. Connect with friendly Malayalis across Kerala (Kochi, Trivandrum, Kozhikode, Thrissur) and Gulf NRIs in seconds with zero registration or logins.'
  },
  'mallu-strangers-chatting-website': {
    title: 'Mallu Strangers Chatting Website - Free Malayalam Stranger Chat Online | MalluChat',
    description: 'Best Mallu strangers chatting website for free anonymous Malayalam chat, stranger text matching, and private 1-on-1 WebRTC video calls with zero signup.',
    h1: 'Mallu Strangers Chatting Website - Free Malayalam Stranger Chat Online',
    intro: 'Looking for a reliable <strong>Mallu strangers chatting website</strong>? MalluChat offers instant anonymous connections with Malayalam-speaking strangers worldwide for text chats and encrypted video calls.'
  },
  'mallu-strangers-chat': {
    title: 'Mallu Strangers Chat - Chat with Strangers in Malayalam Online | MalluChat',
    description: 'Join Mallu Strangers Chat on MalluChat.live. Talk and video call with random strangers in Kerala and worldwide. 100% free anonymous chat, zero registration.',
    h1: 'Mallu Strangers Chat - Chat with Strangers in Malayalam Online',
    intro: 'Connect with thousands of active Malayalam speakers on <strong>Mallu Strangers Chat</strong>. Enjoy anonymous 1-on-1 chats and high-definition WebRTC video calls with zero registration.'
  },
  'mallu-stranger-chat': {
    title: 'Mallu Stranger Chat Online - Free Anonymous Malayalam Chat Rooms | MalluChat',
    description: 'Connect instantly on Mallu Stranger Chat. Enjoy free anonymous Malayalam text chat rooms and encrypted stranger video calls without registration.',
    h1: 'Mallu Stranger Chat Online - Free Anonymous Malayalam Chat Rooms',
    intro: 'Experience Kerala&apos;s favorite <strong>Mallu stranger chat</strong> online. Talk to random strangers in Malayalam without sharing personal info, phone numbers, or passwords.'
  },
  'strangers-mallu-chat': {
    title: 'Mallu Strangers Chat Online - Free Anonymous Malayalam Chat | MalluChat',
    description: 'Connect instantly on Mallu Strangers Chat. Enjoy free anonymous Malayalam text chat rooms and encrypted stranger video calls without registration.',
    h1: 'Mallu Strangers Chat Online - Free Anonymous Malayalam Chat',
    intro: 'Looking to meet Malayali strangers? <strong>Strangers Mallu Chat</strong> on MalluChat.live connects you with verified active users across Kerala and the Gulf for text and video chats.'
  },
  'chat-with-strangers-in-mallu': {
    title: 'Chat with Strangers in Mallu - Malayalam Strangers Chat & Video | MalluChat',
    description: 'Looking to chat with strangers in Mallu? Join MalluChat for instant live Malayalam stranger chat rooms, P2P video calls, and anonymous messaging.',
    h1: 'Chat with Strangers in Mallu - Live Malayalam Chat & Video Calls',
    intro: 'Easily <strong>chat with strangers in Mallu</strong>! Jump straight into Malayalam conversations with friendly people from all districts of Kerala with zero signup fees.'
  },
  'mallu-random-chatting-website': {
    title: 'Mallu Random Chatting Website - Anonymous Kerala Stranger Chat & Video | MalluChat',
    description: 'Top-ranked Mallu random chatting website for instant Malayalam stranger chat, live Kerala random matching, and 1-on-1 WebRTC video calls without signup.',
    h1: 'Mallu Random Chatting Website - Kerala Stranger Match & Free Chat',
    intro: 'Welcome to the premier <strong>Mallu random chatting website</strong> (<a href="https://malluchat.live/">MalluChat.live</a>). If you are looking for <strong>Mallu random chat</strong> or <strong>Mallu roundam chatting website</strong>, connect with online Malayali strangers in one tap with zero registration.'
  },
  'mallu-random-chat': {
    title: 'Mallu Random Chat - Free Malayalam Online Stranger Chatting | MalluChat',
    description: 'Connect on Mallu Random Chat for instant anonymous Malayalam conversations, stranger matches, and free 1-on-1 video calling with zero signups.',
    h1: 'Mallu Random Chat - Instant Malayalam Stranger Matching',
    intro: 'Experience fast, anonymous <strong>Mallu random chat</strong> on MalluChat.live. Meet random Kerala boys and girls online for fun conversations and HD video calls.'
  },
  'mallu-chatting-website': {
    title: 'Mallu Chatting Website - #1 Free Malayalam & Mallu Chat Rooms Online | MalluChat',
    description: 'Looking for the best Mallu chatting website? MalluChat.live is Kerala\'s #1 Malayalam chatting website for anonymous live rooms, Mallu video calls, and stranger chat with zero registration.',
    h1: 'Mallu Chatting Website - #1 Free Malayalam Online Chat Rooms',
    intro: 'Welcome to Kerala&apos;s #1 <strong>Mallu chatting website</strong> (<a href="https://malluchat.live/">MalluChat.live</a>). Whether you are searching for a <strong>Mallu chatting website</strong>, <strong>Mallu chating website</strong>, or <strong>Malayalam chatting website</strong>, MalluChat connects thousands of Malayalees worldwide for instant anonymous text chat, group rooms, and encrypted WebRTC video calls with zero registration.'
  },
  'mallu-chat-website': {
    title: 'Mallu Chat Website - Live Malayalam Community Chat & Video Call | MalluChat',
    description: 'Top Mallu chat website for instant live Malayalam chat, Kerala stranger messaging, and 1-on-1 WebRTC video calls with zero signup.',
    h1: 'Mallu Chat Website - Live Malayalam Community Chat',
    intro: 'Welcome to the #1 <strong>Mallu Chat Website</strong> online! Connect with Malayalees across Kerala and the GCC for free live chat, voice notes, and 1-on-1 video calls.'
  },
  'malayalam-chatting-website': {
    title: 'Malayalam Chatting Website - Free Kerala Online Chat & Video Call | MalluChat',
    description: 'Top-rated Malayalam chatting website for free Kerala chat rooms, stranger video calling, and live online Malayalam chat without logins.',
    h1: 'Malayalam Chatting Website - Free Kerala Online Chat Rooms',
    intro: 'Discover the top <strong>Malayalam chatting website</strong> for Malayalees worldwide. Chat anonymously, make new Kerala friends, and start free 1-on-1 video calls.'
  },
  'mallu-chat-rooms': {
    title: 'Mallu Chat Room - #1 Malayalam Chat Rooms & Kerala Live Chat | MalluChat',
    description: 'Join the #1 Mallu Chat Room on MalluChat.live. Real-time Malayalam chat rooms, Kerala chatroom discussions, stranger video calls, & zero registration.',
    h1: 'Mallu Chat Room - Free Malayalam Chat Rooms Online',
    intro: 'Welcome to active <strong>Mallu Chat Rooms</strong>! Join ongoing Kerala discussions, meet friends from Kochi, Trivandrum, Kozhikode, Thrissur, and Gulf NRIs.'
  },
  'mallu-chat-room': {
    title: 'Mallu Chat Room - #1 Malayalam Chat Rooms & Kerala Live Chat | MalluChat',
    description: 'Best Mallu chat room online. Connect with Malayalees across Kerala and Gulf NRIs in instant free chat rooms with zero signup.',
    h1: 'Mallu Chat Room Online - Free Kerala Chat & Video Calls',
    intro: 'Enter the top <strong>Mallu chat room online</strong>. Connect with fellow Malayalis for text, voice notes, and 1-on-1 random video calls.'
  },
  'mallu-chatroom': {
    title: 'Mallu Chatroom - Free Malayalam Chat Rooms Online | MalluChat',
    description: 'Enter the live Mallu chatroom on MalluChat. Meet new Malayalam friends, join public Kerala lobbies, or start private video calls instantly.',
    h1: 'Mallu Chatroom - Free Malayalam Chat Rooms Online',
    intro: 'Step into the live <strong>Mallu chatroom</strong> on MalluChat. Enjoy real-time interactions with Malayalam speakers in a secure, anonymous environment.'
  },
  'mallu-video-call': {
    title: 'Mallu Video Call - Free 1-on-1 Malayalam Video Call & Random Chat | MalluChat',
    description: 'Connect instantly for Mallu Video Call on MalluChat.live. Free 1-on-1 Malayalam video call online, Mallu random call matching, and live stranger chat with zero registration.',
    h1: 'Mallu Video Call Online - Free 1-on-1 Malayalam Video Chat',
    intro: 'Start a high-definition <strong>Mallu video call</strong> online. Enjoy encrypted peer-to-peer WebRTC video chats with Malayali strangers with zero coins or fees.'
  },
  'mallu-random-call': {
    title: 'Mallu Random Call - Free Malayalam Video Call & Stranger Chat | MalluChat',
    description: 'Connect on Mallu Random Call for instant 1-on-1 Malayalam video calls and stranger voice chat with zero coins or downloads.',
    h1: 'Mallu Random Call - Instant Malayalam Video Matching',
    intro: 'Enjoy instant <strong>Mallu random call</strong> matching! Connect face-to-face with friendly Malayalam speakers in high-definition WebRTC video calls.'
  },
  'malayalam-video-call': {
    title: 'Malayalam Video Call - Free 1-on-1 Mallu Video Chat Online | MalluChat',
    description: 'Best Malayalam video call platform online. Connect with Kerala strangers for free live video calls and audio chats without registration.',
    h1: 'Malayalam Video Call Online - Free Kerala Video Chat',
    intro: 'Join <strong>Malayalam Video Call</strong> on MalluChat. Connect 1-on-1 with Malayalam speakers across Kerala and the Gulf with zero paywalls.'
  },
  'mallu-open-chat': {
    title: 'Mallu Open Chat - Free Malayalam Live Chat Online | MalluChat',
    description: 'Experience Mallu Open Chat on MalluChat.live. Fast, open Malayalam chat rooms, stranger connections, and instant video calling with zero signups.',
    h1: 'Mallu Open Chat - Free Malayalam Live Chat Online',
    intro: 'Join <strong>Mallu Open Chat</strong> for completely open, free-access Malayalam conversations. No registration or passwords required.'
  },
  'mallu-chat-live': {
    title: 'Mallu Chat Live - Live Mallu Chat & Instant Kerala Chat Rooms | MalluChat',
    description: 'Join Live Mallu Chat on MalluChat.live! Enjoy real-time live Malayalam chat rooms, instant 1-on-1 stranger video calls, and zero registration.',
    h1: 'Mallu Chat Live - Real-Time Live Mallu Chat & Video Calls',
    intro: 'Welcome to <strong>Mallu Chat Live</strong> and <strong>Live Mallu Chat</strong>. Experience instant live Malayalam messaging, Kerala public lobbies, and stranger video matching in real time.'
  },
  'live-mallu-chat': {
    title: 'Live Mallu Chat - Real-Time Malayalam Chat Rooms & Video Call | MalluChat',
    description: 'Experience Live Mallu Chat on MalluChat.live. Real-time live Malayalam chat rooms, instant stranger video calls, and zero registration.',
    h1: 'Live Mallu Chat - Real-Time Kerala Chat Rooms',
    intro: 'Connect on <strong>Live Mallu Chat</strong> to talk with active Malayalees worldwide with zero signups or phone numbers.'
  },
  'mallu-free-video-call': {
    title: 'Mallu Video Call Free - Malayalam Free Video Calling Website | MalluChat',
    description: 'Start a Mallu video call free on MalluChat. High-definition 1-on-1 random Malayalam video calls with zero coins, downloads, or registration.',
    h1: 'Mallu Video Call Free - Free Malayalam Video Calling Website',
    intro: 'Enjoy unlimited <strong>Mallu video call free</strong>! Connect 1-on-1 with Malayalam-speaking strangers with crystal-clear audio and video without paying coins.'
  },
  'mallu-random-video-call': {
    title: 'Mallu Random Video Call Online - Kerala Stranger Match | MalluChat',
    description: 'Instant Mallu random video calling. Connect 1-on-1 with Malayalam strangers for live video calls and encrypted chat.',
    h1: 'Mallu Random Video Call Online - Kerala Stranger Match',
    intro: 'Single-click <strong>Mallu random video call</strong> matching! Connect with live Malayali strangers across Kerala and worldwide in seconds.'
  },
  'malayalam-chat-online': {
    title: 'Malayalam Chat Online - Meet Kerala Strangers & Chat Rooms | MalluChat',
    description: 'Join Malayalam Chat Online to connect with Malayalees in Kochi, Trivandrum, Kozhikode, and Gulf NRIs. 100% free text & video chat.',
    h1: 'Malayalam Chat Online - Meet Kerala Strangers & Friends',
    intro: 'Connect on <strong>Malayalam Chat Online</strong>. Talk with Malayalees across Kerala and abroad in safe, moderated Malayalam text and video lobbies.'
  },
  'mallu-chatting-app': {
    title: 'Mallu Chat App - Malayalam Stranger Video Call Online | MalluChat',
    description: 'Use Mallu Chat App online for instant stranger video calling, anonymous group chat rooms, and web P2P calls on mobile and desktop.',
    h1: 'Mallu Chat App - Malayalam Stranger Chat & Video Call',
    intro: 'Use the <strong>Mallu Chat App</strong> directly in your mobile browser or install the Android APK for fast stranger chat and WebRTC video calling.'
  },
  'mallu-telegram-chatting': {
    title: 'Mallu Telegram Chat Alternative - Malayalam Stranger Chat | MalluChat',
    description: 'Looking for Mallu Telegram chat groups? Join MalluChat for instant live Malayalam stranger chat rooms, P2P video calls, and voice chat.',
    h1: 'Mallu Telegram Chat Alternative - Live Stranger Chat Rooms',
    intro: 'The ultimate <strong>Mallu Telegram chat</strong> alternative with instant live chat rooms, zero phone number sharing, and direct WebRTC video calls.'
  },
  'telegram-alternative-group-chat': {
    title: 'Telegram Alternative Group Chat for Malayalam Speakers | MalluChat',
    description: 'Best Telegram alternative for anonymous Malayalam group chats, stranger video calls, and Kerala online chat rooms.',
    h1: 'Telegram Alternative Group Chat for Malayalam Speakers',
    intro: 'Join the best <strong>Telegram alternative group chat</strong> tailored for Malayalam speakers. Free anonymous text and video chat with zero installation.'
  },
  'privacy': {
    title: 'Privacy Policy | Mallu Chat Online',
    description: 'Privacy Policy for MalluChat online strangers chat and free video calling website.',
    h1: 'Privacy Policy - MalluChat',
    intro: 'Learn how MalluChat protects your privacy with zero data tracking, anonymous handles, and encrypted peer-to-peer communication.'
  },
  'terms': {
    title: 'Terms of Service | Mallu Chat Online',
    description: 'Terms of Service for using MalluChat online live video chat and Kerala chat rooms.',
    h1: 'Terms of Service - MalluChat',
    intro: 'Please review the Terms of Service for using MalluChat.live Malayalam chat rooms and video calling services.'
  },
  'aup': {
    title: 'Acceptable Use Policy | Mallu Chat Online',
    description: 'Acceptable Use Policy for MalluChat online strangers video calling and group chat.',
    h1: 'Acceptable Use Policy - MalluChat',
    intro: 'Guidelines and acceptable conduct for maintaining a safe, respectful, and friendly Malayalam chat community.'
  },
  'disclaimer': {
    title: 'Disclaimer | Mallu Chat Online',
    description: 'Disclaimer for MalluChat free online video call and strangers chat platform.',
    h1: 'Disclaimer - MalluChat',
    intro: 'Service disclaimer regarding user-generated content and third-party interactions on MalluChat.live.'
  },
  'payment-help': {
    title: 'Payment Help & Customer Support | MalluChat',
    description: 'MalluChat Payment Help & Customer Support. Resolve transaction issues, get manual UPI verification, and redeem calling tokens.',
    h1: 'Payment Help & Customer Support - MalluChat',
    intro: 'Resolve payment issues, transaction timeouts, manual UPI verification, and redeem calling tokens with our customer care team.'
  }
};

const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Please run vite build first.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

console.log('Generating static folders and index.html files with route-specific SEO tags and body content...');

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

  if (meta.h1) {
    customizedHtml = customizedHtml.replace(
      /<h1 style="color: #4ade80; font-size: 1.8rem; margin-bottom: 1rem;">.*?<\/h1>/,
      `<h1 style="color: #4ade80; font-size: 1.8rem; margin-bottom: 1rem;">${meta.h1}</h1>`
    );
  }

  if (meta.intro) {
    customizedHtml = customizedHtml.replace(
      /<p style="font-size: 1.05rem; margin-bottom: 1.5rem;">.*?<\/p>/s,
      `<p style="font-size: 1.05rem; margin-bottom: 1.5rem;">${meta.intro}</p>`
    );
  }

  fs.writeFileSync(path.join(routeDir, 'index.html'), customizedHtml, 'utf8');
  console.log(`✅ Generated: dist/${route}/index.html (H1: "${meta.h1 || meta.title}")`);
});

console.log('🎉 All static SEO routes generated successfully with unique metadata and body content!');
