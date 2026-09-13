import React, { useEffect } from 'react';
import { MalluLogo } from './MalluLogo';

const useMeta = (title: string, description: string, canonicalPath: string) => {
    useEffect(() => {
        document.title = title;

        const updateMeta = (selector: string, content: string) => {
            let tag = document.querySelector(selector);
            if (tag) {
                tag.setAttribute('content', content);
            }
        };

        updateMeta('meta[name="description"]', description);
        updateMeta('meta[name="title"]', title);
        updateMeta('meta[property="og:title"]', title);
        updateMeta('meta[property="og:description"]', description);
        updateMeta('meta[property="twitter:title"]', title);
        updateMeta('meta[property="twitter:description"]', description);

        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', `https://malluchat.live${canonicalPath}`);
        }
    }, [title, description, canonicalPath]);
};

const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    color: 'var(--text-main)',
    lineHeight: '1.6',
    fontFamily: 'var(--font-family, sans-serif)',
};

const Header = ({ title }: { title: string }) => (
    <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
            <h1 style={{ color: 'var(--primary)', marginBottom: '0.2rem', fontSize: '1.8rem' }}>{title}</h1>
            <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                ← Back to Home
            </a>
        </div>
        <a href="/" style={{
            background: 'var(--primary)',
            color: '#000',
            padding: '0.8rem 1.5rem',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(74, 222, 128, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '1rem'
        }}>
            Start Chatting Now →
        </a>
    </div>
);

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.2rem' }}>{title}</h3>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{children}</div>
    </div>
);

const CallToAction = () => (
    <div style={{
        background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(6, 95, 70, 0.2) 100%)',
        padding: '2.5rem 2rem',
        borderRadius: '24px',
        marginBottom: '3rem',
        textAlign: 'center',
        border: '1px solid rgba(74, 222, 128, 0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
    }}>
        <div style={{ marginBottom: '1.5rem' }}><MalluLogo size={80} /></div>
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.8rem', fontSize: '2.2rem', fontWeight: '800' }}>Enter MalluChat Online</h2>
        <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            No Registration. No Logins. 100% Anonymous &amp; Secure Public &amp; Private Chats.
        </p>
        <a href="/" style={{
            background: 'var(--primary)',
            color: '#000',
            padding: '1rem 3rem',
            borderRadius: '16px',
            textDecoration: 'none',
            fontWeight: '900',
            display: 'inline-block',
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 4px 20px rgba(74, 222, 128, 0.4)'
        }}>Start Chatting Now →</a>
    </div>
);

// 1. Mallu Chatting App Page
export const MalluChattingAppPage = () => {
    useMeta(
        'Mallu Chat App - Mallu Free Video Calling Website & Mallu Video Calling Website | MalluChat',
        'Looking for the best Mallu chat app? MalluChat is the top Mallu free video calling website and Mallu chatting website for anonymous Mallu video calling without registration.',
        '/mallu-chatting-app'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Chat App - Mallu Free Video Calling Website" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Looking for a dedicated <strong>Mallu Chat</strong> app and <strong>Mallu Video Calling Website</strong> to connect with Malayalam-speaking people worldwide? MalluChat is the ultimate <strong>Mallu Chatting Website</strong> designed specifically for Malayalees to converse, video call, and make friends with <strong>Mallu Free Chat</strong> and <strong>Mallu Free Calling</strong>.
            </p>

            <Section title="Why Choose MalluChat for Mallu Free Video Calling Website & Chat?">
                <p>Unlike standard chatting applications that require phone number verification or email registrations, MalluChat focuses entirely on your convenience and privacy. Here's what makes it unique:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>No Registration Required:</strong> Enjoy <strong>Mallu Free Chat</strong> and instant <strong>Mallu Free Calling</strong> without sharing personal details.</li>
                    <li><strong>Mallu Video Calling Website &amp; Mallu Random Video Calling Website:</strong> Hop into public chat or connect via 1-on-1 <strong>Mallu Video Calling</strong>.</li>
                    <li><strong>Mallu Free Video Calling Website:</strong> Enjoy free voice and video calls using advanced WebRTC technology directly in your browser.</li>
                    <li><strong>Mobile Friendly:</strong> Access the top <strong>Mallu Free Calling Website</strong> on any mobile browser or Android device.</li>
                </ul>
            </Section>

            <Section title="Perfect for Mallu Chat Online & Malayalees Worldwide">
                <p>Whether you are in Kerala, the Gulf (GCC), Europe, or the Americas, MalluChat bridges the distance. Meet other people who share your language, talk about local movies, and enjoy <strong>Mallu Chat Online</strong> in a clean, modern interface.</p>
            </Section>
        </div>
    );
};

// 2. Mallu Telegram Chatting Page
export const MalluTelegramChattingPage = () => {
    useMeta(
        'Mallu Telegram Chatting Alternative - Mallu Stranger Chat Website | MalluChat',
        'Best Mallu Telegram chatting alternative. Connect on the #1 Mallu stranger chat website for anonymous Mallu stranger chat and free calling without revealing your phone number.',
        '/mallu-telegram-chatting'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Telegram Chatting & Mallu Stranger Chat Website" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Searching for <strong>Mallu Telegram chatting</strong> groups? While Telegram has many group chats, finding active Malayalam groups without revealing your phone number is hard. MalluChat is the premier <strong>Mallu Stranger Chat Website</strong> and top alternative for <strong>Mallu Stranger Chat</strong>.
            </p>

            <Section title="Why MalluChat is the Ultimate Mallu Stranger Chat Website">
                <p>MalluChat offers safe, instant <strong>Mallu Free Calling Website</strong> features and anonymous room access:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>No Phone Number Required:</strong> Telegram requires a registered phone number. MalluChat is 100% anonymous for <strong>Mallu Stranger Chat</strong>.</li>
                    <li><strong>Mallu Free Calling &amp; Mallu Free Video Calling:</strong> Enjoy encrypted P2P audio/video calls without sharing personal details.</li>
                    <li><strong>Zero Logs &amp; Spam Protection:</strong> Private rooms are direct P2P connections to keep your <strong>Mallu Chat Online</strong> safe.</li>
                    <li><strong>Instant Mallu Video Calling:</strong> No waiting for channel approvals—jump straight into live video calling.</li>
                </ul>
            </Section>

            <Section title="Safe Space for Kerala Stranger Chat Online">
                <p>Enjoy a respectful, clean environment for <strong>Mallu Chat</strong>, voice calls, and video chat with Malayalam speakers everywhere.</p>
            </Section>
        </div>
    );
};

// 3. Telegram Alternative Group Chat Page
export const TelegramAlternativeGroupChatPage = () => {
    useMeta(
        'Telegram Alternative Group Chat - Mallu Free Chat & Mallu Free Calling | MalluChat',
        'Lightweight web-based Telegram alternative group chat. Enjoy Mallu free chat, Mallu free calling website features, and Mallu video calling online.',
        '/telegram-alternative-group-chat'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Telegram Alternative Group Chat & Mallu Free Calling" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                If you are looking for a reliable <strong>Telegram alternative group chat</strong> with <strong>Mallu Free Chat</strong>, <strong>Mallu Free Calling</strong>, and <strong>Mallu Video Calling Website</strong> features, MalluChat is the perfect solution.
            </p>

            <Section title="A Modern Alternative for Mallu Free Video Calling & Chat">
                <p>MalluChat serves as the perfect lightweight web alternative to messaging apps:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>Zero Installation:</strong> Works directly in any mobile or desktop browser for <strong>Mallu Chat Online</strong>.</li>
                    <li><strong>Mallu Free Video Calling Website:</strong> High performance video calling without installing native software.</li>
                    <li><strong>Direct Peer-to-Peer Calls:</strong> Initiate 1-on-1 <strong>Mallu Video Calling</strong> or voice calls directly through a simple link.</li>
                    <li><strong>Privacy First:</strong> Built with state-of-the-art security for complete <strong>Mallu Stranger Chat</strong> anonymity.</li>
                </ul>
            </Section>
        </div>
    );
};

// 4. Malayalam Chat Online Page
export const MalayalamChatOnlinePage = () => {
    useMeta(
        'Malayalam Chat Online - Mallu Chat Online & Mallu Chatting Website | MalluChat',
        'Connect with Kerala communities via Malayalam chat online & Mallu Chat online. Top Mallu chatting website for free video calling and anonymous chat.',
        '/malayalam-chat-online'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Malayalam Chat Online & Mallu Chatting Website" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Connect with your roots through <strong>Malayalam chat online</strong> and <strong>Mallu Chat Online</strong>. Meet new friends on Kerala&apos;s leading <strong>Mallu Chatting Website</strong> for <strong>Mallu Free Chat</strong>, <strong>Mallu Free Calling</strong>, and <strong>Mallu Video Calling</strong>.
            </p>

            <Section title="Features of Our Mallu Chatting Website">
                <p>Our online <strong>Mallu Chat Online</strong> platform brings together Malayalees from Kerala and around the globe:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>Interactive Mallu Chat Online:</strong> Public lobbies for live Malayalam/Manglish discussions.</li>
                    <li><strong>Mallu Free Video Calling Website:</strong> P2P video chat with zero coin charges or subscriptions.</li>
                    <li><strong>Mallu Stranger Chat Website:</strong> Meet strangers safely with clean moderation and instant room links.</li>
                </ul>
            </Section>
        </div>
    );
};

// 5. Mallu Free Video Call Page
export const MalluFreeVideoCallPage = () => {
    useMeta(
        'Mallu Free Video Calling Website - Mallu Free Calling & Video Calling | MalluChat',
        'Enjoy 100% Mallu free video calling website features & Mallu free calling online. Connect instantly for Mallu free video calling & Mallu video calling.',
        '/mallu-free-video-call'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Free Video Calling Website & Mallu Free Calling" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Looking for a 100% <strong>Mallu Free Video Calling Website</strong> to talk face-to-face with fellow Malayalees? MalluChat offers high-speed <strong>Mallu Free Video Calling</strong>, <strong>Mallu Free Calling</strong>, and <strong>Mallu Video Calling</strong> with HD video and clear audio—no credit card or login needed.
            </p>

            <Section title="Why Choose MalluChat for Mallu Free Calling Website & Video Chat?">
                <p>Unlike traditional dating platforms that charge coins, MalluChat provides completely free, unlimited <strong>Mallu Video Calling Website</strong> services:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>100% Mallu Free Video Calling:</strong> Enjoy unlimited HD <strong>Mallu Free Video Calling</strong> with zero paywalls.</li>
                    <li><strong>Mallu Free Calling Website:</strong> Connect via voice or video calls in seconds without registration.</li>
                    <li><strong>Direct P2P Encrypted Stream:</strong> Peer-to-peer WebRTC connections ensure your calls stay private.</li>
                    <li><strong>Mallu Stranger Chat Website Integration:</strong> Seamlessly switch between text chat and instant <strong>Mallu Video Calling</strong>.</li>
                </ul>
            </Section>

            <Section title="How to Start Mallu Free Video Calling Online">
                <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li>Click <strong>Start Chatting Now</strong> to enter the live chat room.</li>
                    <li>Enter any custom anonymous nickname to enter.</li>
                    <li>Initiate instant <strong>Mallu Free Video Calling</strong> or 1-on-1 random video calls directly.</li>
                </ol>
            </Section>
        </div>
    );
};

// 6. Strangers Mallu Chat Page
export const StrangersMalluChatPage = () => {
    const currentPath = typeof window !== 'undefined' && window.location.pathname.includes('strangers-mallu-chat')
        ? '/strangers-mallu-chat'
        : '/mallu-strangers-chat';

    useMeta(
        'Mallu Strangers Chat - Chat with Strangers in Malayalam Online | MalluChat',
        'Join Mallu Strangers Chat on MalluChat.live. Talk and video call with random strangers in Kerala and worldwide. 100% free anonymous chat, zero registration.',
        currentPath
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Strangers Chat & Malayalam Chat Online" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Looking to <strong>chat with strangers in Mallu</strong>? Welcome to <strong>Mallu Strangers Chat</strong> on MalluChat.live — Kerala's top destination for anonymous <strong>Malayalam stranger chat</strong>, Kerala live chat rooms, and 1-on-1 random stranger video calls. Connect with Malayalam speakers across Kerala and Gulf NRIs in seconds with zero registration or logins.
            </p>

            <Section title="Why MalluChat is the #1 Mallu Strangers Chat Platform">
                <p>Chatting with strangers safely and privately is our top commitment:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>100% Anonymous Mallu Strangers Chat:</strong> No phone numbers, emails, or personal details required. Pick any nickname and start talking instantly.</li>
                    <li><strong>Chat with Strangers in Mallu:</strong> Instant live matching with friendly Malayalis across Kochi, Trivandrum, Kozhikode, Thrissur, Dubai, and worldwide.</li>
                    <li><strong>Free Stranger Video Calling:</strong> High-definition WebRTC peer-to-peer 1-on-1 random video calls directly in your browser or Android app with zero delay.</li>
                    <li><strong>Group Chat Rooms & Nearby Users:</strong> Join active public community lobbies or discover users active in your area.</li>
                    <li><strong>No Coins or Paywalls:</strong> Unlimited text chat, photo sharing, voice messages, and video calling completely free forever.</li>
                </ul>
            </Section>

            <Section title="How to Start Chatting with Strangers on MalluChat">
                <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li>Tap <strong>Start Chatting Now</strong> to enter the main lobby.</li>
                    <li>Type any anonymous display name (e.g. <em>MalluStranger</em>).</li>
                    <li>Select <strong>World Chat</strong> or browse the active users list to send instant private chat requests or start a 1-on-1 random video call!</li>
                </ol>
            </Section>
            <SeoNavFooter />
        </div>
    );
};

// 7. Mallu Chatting Website Page
export const MalluChattingWebsitePage = () => {
    useMeta(
        'Mallu Chatting Website - Mallu Video Calling Website & Free Chat | MalluChat',
        'Looking for the top Mallu chatting website? MalluChat is the #1 Mallu video calling website for Mallu chat online, Mallu free calling, and stranger chat.',
        '/mallu-chatting-website'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Chatting Website & Mallu Video Calling Website" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Searching for a reliable <strong>Mallu Chatting Website</strong> and <strong>Mallu Video Calling Website</strong>? MalluChat.live is Kerala&apos;s leading web-based platform offering real-time public rooms, <strong>Mallu Free Chat</strong>, <strong>Mallu Free Calling</strong>, and <strong>Mallu Free Video Calling</strong>.
            </p>

            <Section title="Features of Our Mallu Chatting Website">
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>Mallu Video Calling Website:</strong> High quality P2P video streaming with zero paywalls.</li>
                    <li><strong>Mallu Free Calling Website:</strong> Crystal-clear audio calling directly inside mobile and desktop web browsers.</li>
                    <li><strong>Mallu Chat Online Community:</strong> Connect with thousands of active Malayalees worldwide.</li>
                </ul>
            </Section>
        </div>
    );
};

// 8. Mallu Random Video Call Page
export const MalluRandomVideoCallPage = () => {
    useMeta(
        'Mallu Random Video Calling Website - Mallu Video Calling & Free Chat | MalluChat',
        'Experience the top Mallu random video calling website! Connect for instant Mallu video calling, Mallu free video calling, and random Malayalam chat.',
        '/mallu-random-video-call'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Random Video Calling Website & Mallu Video Calling" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Welcome to the #1 <strong>Mallu Random Video Calling Website</strong> for live <strong>Mallu Video Calling</strong> and <strong>Mallu Free Video Calling Website</strong> features! Connect face-to-face with random Malayalam-speaking friends instantly.
            </p>

            <Section title="Best Mallu Random Video Calling Website Features">
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>One-Click Random Match:</strong> Instant pairing on our <strong>Mallu Random Video Calling Website</strong>.</li>
                    <li><strong>Mallu Free Video Calling:</strong> Unlimited WebRTC video calls with zero fees or coin paywalls.</li>
                    <li><strong>Mallu Stranger Chat &amp; Mallu Free Calling:</strong> High quality voice, video, and text matching for Kerala users.</li>
                </ul>
            </Section>
            <SeoNavFooter />
        </div>
    );
};

// 9. Mallu Chat Live Page (Targeting exact keyword: "mallu chat live")
export const MalluChatLivePage = () => {
    useMeta(
        'Mallu Chat Live - Instant Anonymous Kerala Chat Rooms & Video Call | MalluChat',
        'Experience Mallu Chat Live on MalluChat.live! Enjoy real-time live Malayalam chat rooms, instant 1-on-1 stranger video calls, and zero registration.',
        '/mallu-chat-live'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Chat Live - Instant Anonymous Kerala Chat & Video Call" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Welcome to <strong>Mallu Chat Live</strong>, Kerala&apos;s fastest real-time <strong>Mallu Chat Online</strong> platform. Connect instantly with Malayalam speakers in Kochi, Trivandrum, Kozhikode, Thrissur, Dubai, Abu Dhabi, Qatar, and across the globe with zero sign-up required.
            </p>

            <Section title="Why Mallu Chat Live is Kerala's #1 Live Chatting Platform">
                <p>Mallu Chat Live offers real-time instant messaging and high-definition 1-on-1 video calls with complete privacy:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>Real-Time Live Lobbies:</strong> Chat instantly with active Malayalees worldwide on <strong>Mallu Chat Live</strong>.</li>
                    <li><strong>100% Free Video Calls:</strong> Direct peer-to-peer WebRTC random video matching without credit cards or coin fees.</li>
                    <li><strong>Zero Registration Anonymity:</strong> Choose any display nickname and jump into live Malayalam conversations safely.</li>
                    <li><strong>Mobile &amp; Web Compatible:</strong> Works seamlessly on iOS, Android, and desktop browsers.</li>
                </ul>
            </Section>

            <Section title="Frequently Asked Questions about Mallu Chat Live">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
                        <h4 style={{ color: '#fff', marginBottom: '0.3rem' }}>How do I start using Mallu Chat Live?</h4>
                        <p style={{ margin: 0 }}>Simply click &quot;Start Chatting Now&quot;, enter any display name, and join World Chat or random video calling immediately.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
                        <h4 style={{ color: '#fff', marginBottom: '0.3rem' }}>Is Mallu Chat Live safe and anonymous?</h4>
                        <p style={{ margin: 0 }}>Yes! We never collect phone numbers, emails, or personal credentials. Calls are encrypted P2P WebRTC streams.</p>
                    </div>
                </div>
            </Section>
            <SeoNavFooter />
        </div>
    );
};

// 10. Malayalam Chatting Website Page (Targeting exact keywords: "malayalam chatting website", "malayalam chating website")
export const MalayalamChattingWebsitePage = () => {
    useMeta(
        'Malayalam Chatting Website - Free Kerala Online Chat & Video Call | MalluChat',
        'Top-rated Malayalam chatting website for free Kerala chat rooms, Mallu stranger video calling, and live online Malayalam conversation without logins.',
        '/malayalam-chatting-website'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Malayalam Chatting Website - Free Kerala Chat & Video Calling" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                If you are looking for an authentic <strong>Malayalam chatting website</strong> (or <strong>malayalam chating website</strong>), MalluChat is the premier destination. Designed specifically for the global Malayali community, MalluChat brings together Malayalam speakers for free text chat, voice notes, and stranger video calls.
            </p>

            <Section title="Features of Our Malayalam Chatting Website">
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>Active Kerala Online Lobbies:</strong> Dedicated room for Malayalam and Manglish conversations.</li>
                    <li><strong>Free Mallu Video Call:</strong> Connect 1-on-1 face-to-face with random Malayalam-speaking strangers.</li>
                    <li><strong>Privacy First:</strong> Built with state-of-the-art WebRTC technology for zero data harvesting.</li>
                    <li><strong>No App Download Needed:</strong> Access the full <strong>Malayalam chatting website</strong> directly in your mobile browser.</li>
                </ul>
            </Section>

            <Section title="Why Choose MalluChat over Other Malayalam Chatting Sites?">
                <p>
                    Many traditional chatting websites require phone verification or fill the screen with aggressive popups. MalluChat provides a sleek, modern glassmorphism design that loads instantly with zero ads blocking your chat experience.
                </p>
            </Section>
            <SeoNavFooter />
        </div>
    );
};

// 11. Mallu Chat Rooms Page (Targeting exact keywords: "mallu chat room", "mallu chat rooms", "mallu chatroom", "kerala chat rooms")
export const MalluChatRoomsPage = () => {
    const currentPath = typeof window !== 'undefined' && window.location.pathname.includes('mallu-chat-room')
        ? window.location.pathname
        : '/mallu-chat-rooms';

    useMeta(
        'Mallu Chat Rooms - Free Malayalam Online Chat Room & Kerala Chat | MalluChat',
        'Join Mallu Chat Rooms on MalluChat.live. Real-time Malayalam online chat rooms, Kerala group discussions, stranger video calls, and zero registration.',
        currentPath
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Chat Rooms - Free Malayalam Online Chat Room & Kerala Chat" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Welcome to <strong>Mallu Chat Rooms</strong> on MalluChat.live, Kerala&apos;s most active <strong>Malayalam chat room</strong> network. Connect with thousands of Malayalees across Kerala, Bangalore, Chennai, Mumbai, Dubai, Qatar, Saudi Arabia, and across the globe. Jump into public lobbies or start private 1-on-1 conversations with zero registration.
            </p>

            <Section title="Explore Active Malayalam Chat Rooms">
                <p>Choose from our diverse live chat rooms designed for every Malayali interest:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>Kerala Regional Lobbies:</strong> Chat rooms for Kochi, Thiruvananthapuram, Kozhikode, Thrissur, Kannur, and Malappuram.</li>
                    <li><strong>Gulf Malayali Chat Rooms:</strong> Meet NRIs living in Dubai, Abu Dhabi, Sharjah, Doha, Riyadh, Kuwait, and Muscat.</li>
                    <li><strong>Friendship &amp; Dating:</strong> Respectful, safe rooms to make new friends and connect with like-minded individuals.</li>
                    <li><strong>Cinema &amp; Trends:</strong> Discuss the latest Mollywood movies, music, Malayalam memes, and current news.</li>
                </ul>
            </Section>

            <Section title="Why MalluChat Offers the Best Mallu Chat Room Experience">
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>No Signups or Logins:</strong> Simply enter a nickname and start chatting in any <strong>Mallu chat room</strong> immediately.</li>
                    <li><strong>100% Free Forever:</strong> No coins, subscription packages, or paywalled features.</li>
                    <li><strong>Integrated Mallu Video Call:</strong> Seamlessly switch from group chat rooms to private 1-on-1 HD video calling.</li>
                    <li><strong>Strict Anti-Spam &amp; Moderation:</strong> Enjoy a clean, safe, and respectful environment.</li>
                </ul>
            </Section>

            <Section title="Frequently Asked Questions about Mallu Chat Rooms">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
                        <h4 style={{ color: '#fff', marginBottom: '0.3rem' }}>How do I join a Mallu chat room?</h4>
                        <p style={{ margin: 0 }}>Click &quot;Start Chatting Now&quot;, type an anonymous handle, and select World Chat or any active room to start conversing immediately.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
                        <h4 style={{ color: '#fff', marginBottom: '0.3rem' }}>Do I need to download an app to enter Mallu chat rooms?</h4>
                        <p style={{ margin: 0 }}>No! Our Mallu chat rooms work directly inside any modern web browser on Android, iPhone, tablet, or desktop.</p>
                    </div>
                </div>
            </Section>
            <SeoNavFooter />
        </div>
    );
};

// 12. Mallu Video Call Page (Targeting exact keywords: "mallu video call", "malayalam video call", "mallu video calls", "mallu videocall")
export const MalluVideoCallPage = () => {
    useMeta(
        'Mallu Video Call Online - Free 1-on-1 Malayalam Video Chat | MalluChat',
        'Connect instantly for Mallu Video Call on MalluChat.live. Free 1-on-1 random video calls and voice chat for Malayalam speakers with zero registration.',
        '/mallu-video-call'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Video Call - Free 1-on-1 Malayalam Video Chat Online" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Looking for an instant <strong>Mallu Video Call</strong>? MalluChat connects you face-to-face with friendly Malayalam speakers across Kerala and worldwide. Enjoy peer-to-peer 1-on-1 random video calls, voice calling, and encrypted text messaging with zero download or login requirements.
            </p>

            <Section title="Why MalluChat is the Top Mallu Video Call Platform">
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>Instant Video Pairing:</strong> One-tap connect for 1-on-1 <strong>Mallu video call</strong> and stranger matching.</li>
                    <li><strong>Direct WebRTC P2P Technology:</strong> Video streams are encrypted directly between devices for ultra-low latency and maximum privacy.</li>
                    <li><strong>100% Free with Zero Coins:</strong> No paywalls, daily call limits, or credit card requirements.</li>
                    <li><strong>Cross-Platform Compatibility:</strong> Works seamlessly on Chrome, Safari, Firefox, iOS, and Android.</li>
                </ul>
            </Section>

            <Section title="How to Start a Mallu Video Call">
                <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li>Click <strong>Start Chatting Now</strong> to enter the live platform.</li>
                    <li>Enter any custom anonymous handle.</li>
                    <li>Allow camera/microphone permissions and tap &quot;Start Video Call&quot; to match with fellow Malayalees!</li>
                </ol>
            </Section>
            <SeoNavFooter />
        </div>
    );
};

// 13. Mallu Open Chat Page (Targeting exact keywords: "mallu open chat", "open chat mallu", "mallu openchat")
export const MalluOpenChatPage = () => {
    useMeta(
        'Mallu Open Chat - Free Malayalam Live Chat Online | MalluChat',
        'Experience Mallu Open Chat on MalluChat.live. Fast, open Malayalam chat rooms, stranger connections, and instant video calling with zero signups.',
        '/mallu-open-chat'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Open Chat - Free Malayalam Live Chat Online" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Welcome to <strong>Mallu Open Chat</strong> (<a href="https://malluchat.live/" style={{ color: 'var(--primary)' }}>MalluChat.live</a>), the completely open, free-access Malayalam live chat platform. Jump into ongoing open discussions, meet new Malayali friends, and share voice notes or video calls without registration hurdles.
            </p>

            <Section title="Highlights of Mallu Open Chat">
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>Open Access:</strong> No passwords, emails, or phone numbers required. Instant entry for everyone.</li>
                    <li><strong>Live Open Conversations:</strong> Meet Malayalees discussing daily topics, cinema, jobs, music, and friendship.</li>
                    <li><strong>Switch to Private Video:</strong> Request 1-on-1 video calls with any user in the open room.</li>
                </ul>
            </Section>
            <SeoNavFooter />
        </div>
    );
};

// Internal Linking Navigation Footer for SEO Pages
const SeoNavFooter = () => (
    <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--panel-border)', textAlign: 'center' }}>
        <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Explore Popular Mallu Chat Lobbies</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center', fontSize: '0.88rem' }}>
            <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px' }}>Mallu Chat Live</a>
            <a href="/mallu-chat-rooms" style={{ color: 'var(--text-muted)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px' }}>Mallu Chat Rooms</a>
            <a href="/mallu-video-call" style={{ color: 'var(--text-muted)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px' }}>Mallu Video Call</a>
            <a href="/mallu-open-chat" style={{ color: 'var(--text-muted)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px' }}>Mallu Open Chat</a>
            <a href="/malayalam-chatting-website" style={{ color: 'var(--text-muted)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px' }}>Malayalam Chatting Website</a>
            <a href="/mallu-strangers-chat" style={{ color: 'var(--text-muted)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px' }}>Mallu Strangers Chat</a>
            <a href="/mallu-free-video-call" style={{ color: 'var(--text-muted)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px' }}>Mallu Free Video Call</a>
            <a href="/mallu-random-video-call" style={{ color: 'var(--text-muted)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px' }}>Mallu Random Video Call</a>
            <a href="/malayalam-chat-online" style={{ color: 'var(--text-muted)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px' }}>Malayalam Chat Online</a>
            <a href="/mallu-chatting-app" style={{ color: 'var(--text-muted)', textDecoration: 'none', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '8px' }}>Mallu Chat App</a>
        </div>
    </div>
);




