import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Comprehensive programmatic SEO metadata dictionary for all routes
const routeMetadata = {
  // 1. Mallu Chat Online (Requested by user)
  'mallu-chat-online': {
    title: 'Mallu Chat Online - #1 Free Malayalam Chat Room & Video Calling | MalluChat',
    description: 'Join Mallu Chat Online on MalluChat.live. Kerala\'s #1 free Malayalam chat room, live stranger chat, and instant 1-on-1 Mallu video calls with zero registration.',
    h1: 'Mallu Chat Online - Free Malayalam Chat Room & Video Calling',
    intro: 'Welcome to <strong>Mallu Chat Online</strong> on <a href="https://malluchat.live/">MalluChat.live</a>. Connect instantly with thousands of friendly Malayalam speakers from Kochi, Trivandrum, Kozhikode, Thrissur, and Gulf NRIs (Dubai, Qatar, Saudi Arabia). Jump into real-time Kerala chat rooms or start private 1-on-1 WebRTC video calls with zero registration, zero phone numbers, and 100% free access.',
    faqs: [
      {
        q: 'What is Mallu Chat Online?',
        a: 'Mallu Chat Online on MalluChat.live is a free platform that allows Malayalam speakers worldwide to connect through anonymous text chatrooms, regional Kerala channels, and 1-on-1 WebRTC video calls without registration or phone numbers.'
      },
      {
        q: 'Is Mallu Chat Online free with no coins?',
        a: 'Yes, Mallu Chat Online is 100% free forever. There are zero coin paywalls, zero subscription packages, and no credit card requirements.'
      },
      {
        q: 'Can I chat with Malayali strangers anonymously?',
        a: 'Yes. MalluChat never asks for your real name, phone number, or email. You pick any display nickname and start chatting immediately.'
      }
    ]
  },

  // 2. Mallu Stargres Chat & Strangers (Requested by user: "mallu stargres chat")
  'mallu-stargres-chat': {
    title: 'Mallu Stargres Chat - #1 Malayalam Strangers Chat & Video Call | MalluChat',
    description: 'Connect on Mallu Stargres Chat (Mallu Strangers Chat) on MalluChat.live. Talk to random Malayalam strangers, live Kerala chatrooms, and 1-on-1 video calling with zero signup.',
    h1: 'Mallu Stargres Chat - Anonymous Malayalam Stranger Chat & Video Call',
    intro: 'Looking for <strong>Mallu Stargres Chat</strong> or <strong>Mallu Strangers Chat</strong>? MalluChat.live is Kerala\'s top platform for connecting with unknown Malayali strangers online. Meet new friends from all 14 districts of Kerala and abroad in safe, anonymous text chat and private WebRTC video calling rooms with zero registration.',
    faqs: [
      {
        q: 'What is Mallu Stargres Chat?',
        a: 'Mallu Stargres Chat (Mallu Strangers Chat) is an anonymous Malayalam stranger chat portal on MalluChat.live where users can talk, share voice notes, and video call random Malayalis without registering.'
      },
      {
        q: 'Is Mallu Stargres Chat safe?',
        a: 'Yes. We employ active automated anti-spam and moderation filtering, end-to-end peer-to-peer WebRTC encryption, and zero collection of personal identity data.'
      }
    ]
  },
  'mallu-stargers-chat': {
    title: 'Mallu Stargers Chat - Free Malayalam Stranger Chat & Video | MalluChat',
    description: 'Join Mallu Stargers Chat on MalluChat.live. Instant anonymous Malayalam strangers chatting, live Kerala chat rooms, & 1-on-1 random video calls with zero registration.',
    h1: 'Mallu Stargers Chat - Free Malayalam Stranger Chat Online',
    intro: 'Welcome to <strong>Mallu Stargers Chat</strong> on MalluChat.live. Connect with friendly Malayalam-speaking strangers across Kerala and the GCC in seconds with zero registration or logins.',
    faqs: [
      {
        q: 'How do I start chatting on Mallu Stargers Chat?',
        a: 'Simply tap Start Chatting Now, type any nickname, and connect instantly with online Malayalam strangers.'
      }
    ]
  },

  // 3. Mallu Video Calling (Requested by user: "mallu video calling")
  'mallu-video-calling': {
    title: 'Mallu Video Calling - Free 1-on-1 Malayalam Video Call Online | MalluChat',
    description: 'Experience high-speed Mallu Video Calling on MalluChat.live. Free 1-on-1 Malayalam video calls, random stranger video match, and live chat with zero coins or downloads.',
    h1: 'Mallu Video Calling - Free 1-on-1 Malayalam Video Call Online',
    intro: 'Experience next-generation <strong>Mallu Video Calling</strong> on <a href="https://malluchat.live/">MalluChat.live</a>. Enjoy high-definition, crystal-clear 1-on-1 Malayalam video calls with random Kerala strangers and friends. Connect directly in your browser with zero coin paywalls, zero ads blocking your screen, and zero registration.',
    faqs: [
      {
        q: 'How does Mallu Video Calling work?',
        a: 'Mallu Video Calling connects users through direct peer-to-peer WebRTC video streams. No middle server records or stores your video feed, giving you maximum privacy and low latency.'
      },
      {
        q: 'Are there coin fees or daily limits for Mallu Video Calling?',
        a: 'None! Mallu Video Calling is 100% free with unlimited calling minutes and zero coin purchases.'
      }
    ]
  },

  // 4. Mallu Chat Room (Requested by user: "mallu chat room")
  'mallu-chat-room': {
    title: 'Mallu Chat Room - #1 Malayalam Chat Rooms & Kerala Live Chat | MalluChat',
    description: 'Enter the #1 Mallu Chat Room on MalluChat.live. Real-time Malayalam chat rooms, Kerala chatroom discussions, stranger video calls, & zero registration.',
    h1: 'Mallu Chat Room Online - Free Kerala Chat & Video Calls',
    intro: 'Enter the top <strong>Mallu chat room online</strong>. Connect with fellow Malayalis for text, voice notes, and 1-on-1 random video calls across Kochi, Trivandrum, Kozhikode, Thrissur, and Gulf NRIs.',
    faqs: [
      {
        q: 'How do I enter a Mallu Chat Room?',
        a: 'Visit MalluChat.live/mallu-chat-room, choose any handle, and click Start Chatting to join active Malayalam lobbies immediately.'
      },
      {
        q: 'Can I create private rooms in Mallu Chat Room?',
        a: 'Yes, you can invite any user from public lobbies into a private 1-on-1 encrypted chat or direct WebRTC video call.'
      }
    ]
  },
  'mallu-chat-rooms': {
    title: 'Mallu Chat Rooms - Free Malayalam Chatrooms & Kerala Live Chat | MalluChat',
    description: 'Join the #1 Mallu Chat Rooms on MalluChat.live. Real-time Malayalam chat rooms, Kerala chatroom discussions, stranger video calls, & zero registration.',
    h1: 'Mallu Chat Rooms - Free Malayalam Chat Rooms Online',
    intro: 'Welcome to active <strong>Mallu Chat Rooms</strong>! Join ongoing Kerala discussions, meet friends from Kochi, Trivandrum, Kozhikode, Thrissur, and Gulf NRIs with zero signups.',
    faqs: [
      {
        q: 'Which districts have active Mallu Chat Rooms?',
        a: 'MalluChat has active rooms for Kochi, Thiruvananthapuram, Kozhikode, Thrissur, Malappuram, Kannur, Kollam, Kottayam, and Gulf NRI communities.'
      }
    ]
  },
  'mallu-chatroom': {
    title: 'Mallu Chatroom - Free Malayalam Chat Rooms Online | MalluChat',
    description: 'Enter the live Mallu chatroom on MalluChat. Meet new Malayalam friends, join public Kerala lobbies, or start private video calls instantly.',
    h1: 'Mallu Chatroom - Free Malayalam Chat Rooms Online',
    intro: 'Step into the live <strong>Mallu chatroom</strong> on MalluChat. Enjoy real-time interactions with Malayalam speakers in a secure, anonymous environment.',
    faqs: [
      {
        q: 'Is the Mallu chatroom mobile friendly?',
        a: 'Yes, it works smoothly on any mobile browser (Android & iPhone) without installing an app.'
      }
    ]
  },

  // 5. Mallu Roundam Chat (Requested by user: "mallu roundam chat")
  'mallu-roundam-chat': {
    title: 'Mallu Roundam Chat - Free Malayalam Random Chat & Stranger Match | MalluChat',
    description: 'Connect on Mallu Roundam Chat (Mallu Random Chat) on MalluChat.live. Instant 1-tap random Malayalam stranger pairing, free video calls, and zero registration.',
    h1: 'Mallu Roundam Chat - Malayalam Random Chat & Stranger Match',
    intro: 'Welcome to <strong>Mallu Roundam Chat</strong> (Mallu Random Chat) on MalluChat.live! Looking for spontaneous Malayalam conversations with online strangers? Enjoy one-click random matchmaking, live Kerala text chatrooms, and 1-on-1 WebRTC video calls with zero signups.',
    faqs: [
      {
        q: 'What is Mallu Roundam Chat?',
        a: 'Mallu Roundam Chat is a 1-tap random matchmaking platform for Malayalam speakers. It connects you with online Kerala strangers instantly for text or video chat.'
      },
      {
        q: 'Can I skip to the next person on Mallu Roundam Chat?',
        a: 'Yes, simply click "Next" or "Shuffle" to instantly match with another active stranger.'
      }
    ]
  },
  'mallu-roundam-chatting': {
    title: 'Mallu Roundam Chatting - Instant Malayalam Stranger Matching | MalluChat',
    description: 'Best Mallu roundam chatting platform for instant stranger pairing, free Malayalam video calls, and Kerala chat rooms with zero login.',
    h1: 'Mallu Roundam Chatting - Instant Malayalam Stranger Matching',
    intro: 'Experience seamless <strong>Mallu roundam chatting</strong> on MalluChat.live. Pair instantly with Malayalam speakers worldwide for text and video chats.',
    faqs: [
      {
        q: 'Is Mallu roundam chatting free?',
        a: 'Yes, 100% free with zero registration and zero coin charges.'
      }
    ]
  },

  // 6. Mallu Chating Online (Requested by user: "mallu chating online")
  'mallu-chating-online': {
    title: 'Mallu Chating Online - Free Kerala Malayalam Chat Rooms | MalluChat',
    description: 'Join Mallu Chating Online on MalluChat.live. #1 free Kerala chatting website for instant anonymous Malayalam rooms, stranger messages, and video calls with zero signups.',
    h1: 'Mallu Chating Online - Free Kerala Malayalam Chat Rooms',
    intro: 'Searching for <strong>Mallu Chating Online</strong> or a free <strong>Mallu Chating Website</strong>? MalluChat connects thousands of Malayalees across Kerala and worldwide. Experience live Malayalam chat rooms, photo sharing, voice notes, and stranger video calls without registration or phone numbers.',
    faqs: [
      {
        q: 'Can I chat in Manglish on Mallu Chating Online?',
        a: 'Yes! You can chat using standard Malayalam script or Manglish (Malayalam written in English letters).'
      },
      {
        q: 'Do I need to sign up for Mallu Chating Online?',
        a: 'No signups or phone numbers needed. Just pick any nickname and start chatting.'
      }
    ]
  },
  'mallu-chating-website': {
    title: 'Mallu Chating Website - Free Malayalam Online Chatting Rooms | MalluChat',
    description: 'Looking for a Mallu chating website? Connect on MalluChat.live for instant Kerala stranger chat, free video calling, and live Malayalam lobbies.',
    h1: 'Mallu Chating Website - Free Malayalam Online Chatting Rooms',
    intro: 'Welcome to the premier <strong>Mallu chating website</strong>. Chat with Malayalees across Kerala, Dubai, Qatar, Saudi Arabia, and Europe with zero registration.',
    faqs: [
      {
        q: 'What makes this Mallu chating website the best?',
        a: 'Zero ads blocking your screen, fast WebRTC video calling, and instant anonymous entry without phone numbers.'
      }
    ]
  },

  // 7. Mallu Free Chat Room (Requested by user: "mallu free chat room")
  'mallu-free-chat-room': {
    title: 'Mallu Free Chat Room - #1 Free Kerala Chat Rooms Online | MalluChat',
    description: 'Enter the #1 Mallu Free Chat Room on MalluChat.live. 100% free Malayalam chat rooms, Kerala lobbies, stranger video calling, and zero coins or registration.',
    h1: 'Mallu Free Chat Room - 100% Free Kerala Chat Rooms Online',
    intro: 'Step into the <strong>Mallu Free Chat Room</strong> on MalluChat.live! Unlike other chatting portals that charge for coins, premium subscriptions, or contact unlocks, MalluChat is 100% completely free forever. Meet Malayalees from Kochi, Trivandrum, Kozhikode, Thrissur, and Gulf NRIs in vibrant real-time chatrooms.',
    faqs: [
      {
        q: 'Why is Mallu Free Chat Room 100% free?',
        a: 'MalluChat is built on modern peer-to-peer WebRTC technology, allowing us to offer unlimited high-speed chatting and video calls without asking users for coins or subscriptions.'
      },
      {
        q: 'Are there hidden charges in Mallu Free Chat Room?',
        a: 'None! Unlimited text, photo sharing, voice notes, and video calls are completely free.'
      }
    ]
  },
  'mallu-free-chat-rooms': {
    title: 'Mallu Free Chat Rooms - Malayalam Live Chat Without Coins | MalluChat',
    description: 'Join Mallu Free Chat Rooms on MalluChat.live. Free Kerala group chats, stranger matching, and private video calls with zero subscriptions.',
    h1: 'Mallu Free Chat Rooms - Malayalam Live Chat Without Coins',
    intro: 'Connect on <strong>Mallu Free Chat Rooms</strong> to talk with active Malayalees worldwide with zero signups or coin fees.',
    faqs: [
      {
        q: 'How do I join Mallu Free Chat Rooms?',
        a: 'Just visit https://malluchat.live/mallu-free-chat-rooms and tap Start Chatting Now.'
      }
    ]
  },

  // 8. Mallu Kambi Chat (Requested by user: "mallu kambi chat")
  'mallu-kambi-chat': {
    title: 'Mallu Kambi Chat - #1 Late Night Malayalam Chat Rooms & Stranger Chat | MalluChat',
    description: 'Join Mallu Kambi Chat on MalluChat.live. Anonymous late-night Malayalam chat rooms, private 1-on-1 stranger chats, spicy Kerala banter, and encrypted video calls with zero signup.',
    h1: 'Mallu Kambi Chat - Late Night Malayalam Chat Rooms & Stranger Chat',
    intro: 'Welcome to <strong>Mallu Kambi Chat</strong> on <a href="https://malluchat.live/">MalluChat.live</a>. Looking for anonymous late-night Malayalam chat rooms, open Kerala discussions, or private 1-on-1 conversations? Connect with active Kerala adults, Gulf NRIs, and friendly strangers in a 100% private, anonymous, and encrypted space with zero registration.',
    faqs: [
      {
        q: 'Is Mallu Kambi Chat 100% anonymous?',
        a: 'Yes. MalluChat never requires real names, phone numbers, email addresses, or social accounts. You pick an anonymous handle.'
      },
      {
        q: 'Are messages stored on Mallu Kambi Chat?',
        a: 'No. Private chats and 1-on-1 video streams are direct peer-to-peer encrypted connections and are not saved on servers.'
      },
      {
        q: 'Can I start private 1-on-1 video calls on Mallu Kambi Chat?',
        a: 'Yes, you can initiate encrypted 1-on-1 WebRTC video calls with consenting users with zero coins or fees.'
      }
    ]
  },
  'mallu-kambi-chatting': {
    title: 'Mallu Kambi Chatting - Late Night Kerala Chat Rooms Online | MalluChat',
    description: 'Connect on Mallu Kambi Chatting for private 1-on-1 Malayalam adult stranger chat, spicy banter, and encrypted WebRTC video calls with zero registration.',
    h1: 'Mallu Kambi Chatting - Late Night Kerala Chat Rooms Online',
    intro: 'Experience private, anonymous <strong>Mallu Kambi Chatting</strong> on MalluChat.live. Connect with online Malayalis for late-night chats with zero phone numbers.',
    faqs: [
      {
        q: 'How do I protect my privacy during Mallu Kambi chatting?',
        a: 'Never share passwords, phone numbers, or personal identity details. Use anonymous handles.'
      }
    ]
  },
  'mallu-kambi-talk': {
    title: 'Mallu Kambi Talk - Anonymous Malayalam Late Night Voice & Video | MalluChat',
    description: 'Join Mallu Kambi Talk on MalluChat.live. Safe anonymous late-night Kerala voice chat, stranger talk, and 1-on-1 video calls with zero logins.',
    h1: 'Mallu Kambi Talk - Anonymous Malayalam Late Night Voice & Video',
    intro: 'Connect on <strong>Mallu Kambi Talk</strong> for late-night Malayalam voice messaging and encrypted video calling with online Kerala strangers.',
    faqs: [
      {
        q: 'Is Mallu Kambi Talk free?',
        a: 'Yes, 100% free with zero coin paywalls.'
      }
    ]
  },

  // 9. Additional High-Search Mallu Chat Landing Pages
  'mallu-online-chat': {
    title: 'Mallu Online Chat - Kerala Strangers Chatting & Live Video Rooms | MalluChat',
    description: 'Enter Mallu Online Chat on MalluChat.live. Connect with active Malayalees worldwide for free Malayalam stranger chatting, regional rooms, and 1-on-1 video calls.',
    h1: 'Mallu Online Chat - Kerala Strangers Chatting & Live Video Rooms',
    intro: 'Join <strong>Mallu Online Chat</strong> on MalluChat.live. Connect with active Kerala boys, girls, and Gulf NRIs in real time. Enjoy instant stranger chat, group lobbies, voice notes, and encrypted WebRTC video calls without registrations or passwords.',
    faqs: [
      {
        q: 'What is Mallu Online Chat?',
        a: 'Mallu Online Chat connects Malayalam speakers across Kerala and Gulf NRIs for live text, voice, and video chat with zero registration.'
      }
    ]
  },
  'mallu-random-video-calling': {
    title: 'Mallu Random Video Calling - Kerala Stranger Video Chat Online | MalluChat',
    description: 'Experience Mallu Random Video Calling on MalluChat.live. 1-click random video chat with Malayalam strangers across Kerala and Gulf NRIs with zero coins or logins.',
    h1: 'Mallu Random Video Calling - Kerala Stranger Video Chat Online',
    intro: 'Start <strong>Mallu Random Video Calling</strong> on MalluChat.live! Meet online Malayali strangers face-to-face in 1-on-1 random video calls with zero coin paywalls, zero signups, and high-definition WebRTC video streaming.',
    faqs: [
      {
        q: 'How does Mallu Random Video Calling work?',
        a: 'Tap Start Video Call to be paired in real time with an active online Malayalam stranger in high-definition peer-to-peer video.'
      }
    ]
  },

  // Existing Core Routes
  'mallu-stranger-chat-website': {
    title: 'Mallu Stranger Chat Website - #1 Free Malayalam Strangers Chat & Video | MalluChat',
    description: 'Join the #1 Mallu stranger chat website on MalluChat.live. Instant anonymous Malayalam strangers chatting, live Kerala chat rooms, & 1-on-1 random video calls with zero registration.',
    h1: 'Mallu Stranger Chat Website - Anonymous Malayalam Chat with Strangers',
    intro: 'Welcome to MalluChat.live, Kerala&apos;s leading <strong>Mallu stranger chat website</strong> and top destination for <strong>Malayalam strangers chatting</strong>. Connect with friendly Malayalis across Kerala (Kochi, Trivandrum, Kozhikode, Thrissur) and Gulf NRIs in seconds with zero registration or logins.',
    faqs: [
      {
        q: 'Which is the top Mallu stranger chat website?',
        a: 'MalluChat.live is ranked Kerala\'s #1 Mallu stranger chat website with instant WebRTC video calling and zero registration.'
      }
    ]
  },
  'mallu-strangers-chatting-website': {
    title: 'Mallu Strangers Chatting Website - Free Malayalam Stranger Chat Online | MalluChat',
    description: 'Best Mallu strangers chatting website for free anonymous Malayalam chat, stranger text matching, and private 1-on-1 WebRTC video calls with zero signup.',
    h1: 'Mallu Strangers Chatting Website - Free Malayalam Stranger Chat Online',
    intro: 'Looking for a reliable <strong>Mallu strangers chatting website</strong>? MalluChat offers instant anonymous connections with Malayalam-speaking strangers worldwide for text chats and encrypted video calls.',
    faqs: [
      {
        q: 'Can I chat with Malayali strangers online for free?',
        a: 'Yes, MalluChat is 100% free with zero coin fees or subscription plans.'
      }
    ]
  },
  'mallu-strangers-chat': {
    title: 'Mallu Strangers Chat - Chat with Strangers in Malayalam Online | MalluChat',
    description: 'Join Mallu Strangers Chat on MalluChat.live. Talk and video call with random strangers in Kerala and worldwide. 100% free anonymous chat, zero registration.',
    h1: 'Mallu Strangers Chat - Chat with Strangers in Malayalam Online',
    intro: 'Connect with thousands of active Malayalam speakers on <strong>Mallu Strangers Chat</strong>. Enjoy anonymous 1-on-1 chats and high-definition WebRTC video calls with zero registration.',
    faqs: [
      {
        q: 'How do I use Mallu Strangers Chat?',
        a: 'Visit MalluChat.live, pick any nickname, and tap World Chat to meet active strangers.'
      }
    ]
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
    intro: 'Use the <strong>Mallu Chat App</strong> directly in your mobile browser or Android app for fast stranger chat and WebRTC video calling.'
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
    description: 'MalluChat Payment Help & Customer Support. Resolve transaction issues, get manual verification, and redeem calling tokens via teamtwingle@gmail.com.',
    h1: 'Payment Help & Customer Support - MalluChat',
    intro: 'Need help with your payment? Review our strict non-refund policy, contact support at teamtwingle@gmail.com, or submit your unique calling token.'
  }
};

const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html does not exist. Please run vite build first.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Helper function to build programmatic crawlable article HTML for search crawlers & AI bots
function buildCrawlableArticle(route, meta) {
  const h1 = meta.h1 || meta.title;
  const intro = meta.intro;
  const faqs = meta.faqs || [];

  let html = `
    <!-- Crawlable Pre-rendered Programmatic SEO Article for ${route} -->
    <article id="seo-crawler-content" style="max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; color: #94a3b8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6;">
      <h1 style="color: #4ade80; font-size: 1.8rem; margin-bottom: 1rem;">${h1}</h1>
      <p style="font-size: 1.05rem; margin-bottom: 1.5rem;">${intro}</p>
      
      <div style="background: rgba(74, 222, 128, 0.08); border: 1px solid rgba(74, 222, 128, 0.3); border-radius: 12px; padding: 1.2rem; margin-bottom: 2rem; text-align: center;">
        <h2 style="color: #4ade80; font-size: 1.3rem; margin: 0 0 0.5rem;">Active Now: 1,400+ Malayalam Chatters Online</h2>
        <p style="margin: 0 0 1rem; color: #e2e8f0;">Connect with Malayalis from Kochi, Trivandrum, Kozhikode, Thrissur, and Gulf NRIs (Dubai, Qatar, Saudi Arabia).</p>
        <a href="https://malluchat.live/" style="display: inline-block; background: #4ade80; color: #000; font-weight: 700; padding: 0.8rem 1.8rem; border-radius: 8px; text-decoration: none; font-size: 1rem;">Start Chatting Now →</a>
      </div>

      <h2 style="color: #fff; font-size: 1.4rem; margin-top: 2rem; margin-bottom: 0.8rem;">Why MalluChat is Kerala&apos;s #1 Chat Platform</h2>
      <ul>
        <li><strong>Zero Registration or OTP:</strong> No phone numbers, passwords, or emails. Jump into discussions in under 3 seconds.</li>
        <li><strong>Free 1-on-1 WebRTC Video Calls:</strong> Direct peer-to-peer encrypted high-definition video calls with zero coins or subscription paywalls.</li>
        <li><strong>100% Anonymous &amp; Private:</strong> Conversations are encrypted and never permanently saved on servers.</li>
        <li><strong>Kerala Regional Lobbies:</strong> Dedicated discussions for Kochi, Calicut, Trivandrum, Thrissur, Malappuram, and Gulf NRIs.</li>
        <li><strong>Mobile Browser Ready:</strong> Works smoothly directly in any browser on Android, iPhone, tablet, and PC.</li>
      </ul>

      <h2 style="color: #fff; font-size: 1.4rem; margin-top: 2rem; margin-bottom: 0.8rem;">How to Start in 3 Quick Steps</h2>
      <ol>
        <li>Click <strong>Start Chatting Now</strong> to open the live lobby.</li>
        <li>Enter any anonymous nickname.</li>
        <li>Select World Chat, search for random stranger match, or start a 1-on-1 WebRTC video call immediately!</li>
      </ol>
  `;

  if (faqs.length > 0) {
    html += `
      <h2 style="color: #fff; font-size: 1.4rem; margin-top: 2rem; margin-bottom: 0.8rem;">Frequently Asked Questions (FAQ)</h2>
      <section>
    `;
    faqs.forEach(f => {
      html += `
        <h3>${f.q}</h3>
        <p>${f.a}</p>
      `;
    });
    html += `</section>`;
  }

  html += `
      <h2 style="color: #fff; font-size: 1.4rem; margin-top: 2rem; margin-bottom: 0.8rem;">Related Mallu Chat &amp; Video Calling Topics</h2>
      <nav>
        <ul style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.5rem; padding-left: 1rem;">
          <li><a href="https://malluchat.live/">Mallu Chat Home</a></li>
          <li><a href="https://malluchat.live/mallu-chat-online">Mallu Chat Online</a></li>
          <li><a href="https://malluchat.live/mallu-chat-rooms">Mallu Chat Room</a></li>
          <li><a href="https://malluchat.live/mallu-video-calling">Mallu Video Calling</a></li>
          <li><a href="https://malluchat.live/mallu-stargres-chat">Mallu Stargres Chat</a></li>
          <li><a href="https://malluchat.live/mallu-roundam-chat">Mallu Roundam Chat</a></li>
          <li><a href="https://malluchat.live/mallu-chating-online">Mallu Chating Online</a></li>
          <li><a href="https://malluchat.live/mallu-free-chat-room">Mallu Free Chat Room</a></li>
          <li><a href="https://malluchat.live/mallu-kambi-chat">Mallu Kambi Chat</a></li>
          <li><a href="https://malluchat.live/mallu-video-call">Mallu Video Call Online</a></li>
          <li><a href="https://malluchat.live/mallu-random-video-calling">Mallu Random Video Calling</a></li>
          <li><a href="https://malluchat.live/mallu-chat-website">Mallu Chat Website</a></li>
          <li><a href="https://malluchat.live/mallu-stranger-chat-website">Mallu Stranger Chat Website</a></li>
          <li><a href="https://malluchat.live/mallu-random-chatting-website">Mallu Random Chatting Website</a></li>
          <li><a href="https://malluchat.live/mallu-open-chat">Mallu Open Chat</a></li>
          <li><a href="https://malluchat.live/mallu-chat-live">Live Mallu Chat</a></li>
          <li><a href="https://malluchat.live/malayalam-chatting-website">Malayalam Chatting Website</a></li>
          <li><a href="https://malluchat.live/mallu-online-chat">Mallu Online Chat</a></li>
          <li><a href="https://malluchat.live/mallu-strangers-chat">Mallu Strangers Chat</a></li>
          <li><a href="https://malluchat.live/mallu-free-video-call">Mallu Free Video Call</a></li>
          <li><a href="https://malluchat.live/malayalam-chat-online">Malayalam Chat Online</a></li>
          <li><a href="https://malluchat.live/mallu-chatting-app">Mallu Chat App</a></li>
        </ul>
      </nav>
    </article>
  `;

  return html;
}

// Helper to build structured JSON-LD for sub-routes
function buildRouteJsonLd(routeUrl, meta) {
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${routeUrl}#webpage`,
      "url": routeUrl,
      "name": meta.title,
      "description": meta.description,
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://malluchat.live/#website",
        "name": "Mallu Chat - MalluChat Live",
        "url": "https://malluchat.live/"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Mallu Chat",
            "item": "https://malluchat.live/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": meta.h1 || meta.title,
            "item": routeUrl
          }
        ]
      }
    }
  ];

  if (meta.faqs && meta.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${routeUrl}#faq`,
      "mainEntity": meta.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    });
  }

  return `<script type="application/ld+json">\n  ${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)}\n  </script>`;
}

console.log('Generating programmatic SEO static folders and index.html files...');

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

  // Replace Structured Data (JSON-LD) with route-specific schema
  customizedHtml = customizedHtml.replace(
    /<script type="application\/ld\+json">.*?<\/script>/s,
    buildRouteJsonLd(routeUrl, meta)
  );

  // Replace pre-rendered article with unique, keyword-tailored programmatic crawlable article
  customizedHtml = customizedHtml.replace(
    /<article id="seo-crawler-content".*?<\/article>/s,
    buildCrawlableArticle(route, meta)
  );

  fs.writeFileSync(path.join(routeDir, 'index.html'), customizedHtml, 'utf8');
  console.log(`✅ Generated: dist/${route}/index.html (H1: "${meta.h1 || meta.title}")`);
});

console.log('🎉 All static programmatic SEO routes generated successfully with unique metadata, JSON-LD FAQs, and body content!');
