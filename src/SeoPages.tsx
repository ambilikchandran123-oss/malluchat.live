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
        'Mallu Chatting App - Free Anonymous Malayalam Chat Rooms | Mallu Chat',
        'Looking for the best Mallu chatting app? Join Mallu Chat for free anonymous Malayalam chat rooms, group voice calls, and video chat without registration.',
        '/mallu-chatting-app'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Chatting App" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Looking for a dedicated <strong>Mallu chatting app</strong> to connect with Malayalam-speaking people worldwide? MalluChat is the ultimate platform designed specifically for Malayalees to converse, share, and make friends without the hassle of registration.
            </p>

            <Section title="Why Choose MalluChat as Your Go-To Mallu Chatting App?">
                <p>Unlike standard chatting applications that require phone number verification or email registrations, MalluChat focuses entirely on your convenience and privacy. Here's what makes it unique:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>No Registration Required:</strong> Connect instantly with other Mallus without sharing personal details.</li>
                    <li><strong>Group &amp; Private Chats:</strong> Hop into the Global World Chat or create a secure, private peer-to-peer room.</li>
                    <li><strong>Crystal Clear Calling:</strong> Enjoy free voice and video calls using advanced WebRTC technology directly in your browser.</li>
                    <li><strong>Mobile Friendly:</strong> Fully optimized for browser access or downloadable as an Android APK.</li>
                </ul>
            </Section>

            <Section title="Perfect for Malayalees Worldwide">
                <p>Whether you are in Kerala, the Gulf (GCC), Europe, or the Americas, MalluChat bridges the distance. Meet other people who share your language, watch local movies, talk about food, and share memories of back home in a clean, modern chatting interface.</p>
            </Section>
        </div>
    );
};

// 2. Mallu Telegram Chatting Page
export const MalluTelegramChattingPage = () => {
    useMeta(
        'Mallu Telegram Chatting Alternative - Anonymous Malayalam Groups | Mallu Chat',
        'Best Mallu Telegram chatting alternative. Connect with Malayalees in instant anonymous group chat rooms without revealing your phone number.',
        '/mallu-telegram-chatting'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Telegram Chatting Alternative" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Searching for <strong>Mallu Telegram chatting</strong> groups? While Telegram has many group chats, finding high-quality, active, spam-free Malayalam groups without compromising your phone number or privacy can be incredibly difficult. MalluChat is the best alternative to Telegram group chats.
            </p>

            <Section title="Why MalluChat is Better than Telegram for Anonymous Chatting">
                <p>Telegram is a powerful app, but it falls short when you want quick, casual, and safe conversations:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>No Phone Number Required:</strong> Telegram requires a registered phone number. MalluChat requires absolutely nothing—just launch it and chat.</li>
                    <li><strong>Spam and Bot Protection:</strong> Telegram groups are often flooded with promotional bots. MalluChat features custom spam filtration to keep the chat clean.</li>
                    <li><strong>Zero Logs:</strong> Your private rooms are entirely peer-to-peer (P2P), meaning your messages go directly to your friend without being stored on any server.</li>
                    <li><strong>Instant Connections:</strong> No need to join channels, search for links, or wait for group approval. Join public discussions instantly.</li>
                </ul>
            </Section>

            <Section title="Safe Space for Kerala Communities">
                <p>Telegram groups often have issues with link sharing and privacy leaks. MalluChat is designed to keep our community safe. With strict acceptable use policies and active moderation, you can enjoy a friendly environment to chat in Malayalam.</p>
            </Section>
        </div>
    );
};

// 3. Telegram Alternative Group Chat Page
export const TelegramAlternativeGroupChatPage = () => {
    useMeta(
        'Telegram Alternative Group Chat - Free Malayalam Anonymous Chat | Mallu Chat',
        'Lightweight web-based Telegram alternative group chat for Malayalam speaking communities. No app download or phone number required.',
        '/telegram-alternative-group-chat'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Telegram Alternative Group Chat" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                If you are looking for a reliable <strong>Telegram alternative group chat</strong> that is lightweight, browser-based, and highly secure, MalluChat is the perfect solution. It offers a seamless, registration-free experience that handles public group chats and private rooms beautifully.
            </p>

            <Section title="A Modern Alternative to Messaging Groups">
                <p>Many users are looking to move away from bloated messaging apps like Telegram, Discord, or WhatsApp. MalluChat serves as the perfect lightweight web alternative:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>Zero Installation:</strong> Works directly in any mobile or desktop browser. No need to download hefty apps that drain your battery.</li>
                    <li><strong>Temporary and Volatile:</strong> Chats inside the main lobby are active and live—perfect for instant, real-time conversations without taking up disk storage on your device.</li>
                    <li><strong>Direct Peer-to-Peer Calls:</strong> Initiate high-quality video or voice calls directly through a simple link.</li>
                    <li><strong>Privacy First:</strong> Built with state-of-the-art security practices to ensure you remain fully anonymous.</li>
                </ul>
            </Section>

            <Section title="Instant Group Engagement">
                <p>Create a custom nickname, select a color, and jump straight into discussions. Meet new people, discuss current affairs, ask questions, or just pass the time in a vibrant, growing community.</p>
            </Section>
        </div>
    );
};

// 4. Malayalam Chat Online Page
export const MalayalamChatOnlinePage = () => {
    useMeta(
        'Malayalam Chat Online - Free Kerala Public Chat Rooms | Mallu Chat',
        'Connect with Kerala communities via Malayalam chat online. Free, anonymous, instant messaging and video calling platform for Malayalees worldwide.',
        '/malayalam-chat-online'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Malayalam Chat Online" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Connect with your roots through <strong>Malayalam chat online</strong>. Meet new friends from Kochi, Trivandrum, Kozhikode, and all across Kerala or the diaspora. MalluChat provides the most secure and clean virtual chat rooms for Malayalees to chat, call, and share.
            </p>

            <Section title="Vibrant Kerala Chat Rooms">
                <p>Our online Malayalam chat rooms bring together people from all walks of life. Whether you want to talk in Manglish, share Malayalam memes, or discuss the latest cinema, you'll find an active group of peers online at any hour of the day.</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>Interactive World Chat:</strong> A public square for real-time discussions with other online users.</li>
                    <li><strong>Encrypted Private Rooms:</strong> Take your conversation private with secure, direct P2P connections.</li>
                    <li><strong>Clean Moderation:</strong> A dedicated, friendly space that blocks offensive behavior and keeps the chat safe.</li>
                    <li><strong>Shared Culture:</strong> Meet other users who speak Malayalam and understand the unique culture of Kerala.</li>
                </ul>
            </Section>

            <Section title="How to Start Chatting Online">
                <p>Simply click the "Start Chatting Now" button above, type in an anonymous nickname, and you're good to go! No complex signup processes, no profiles, and no passwords to remember.</p>
            </Section>
        </div>
    );
};

// 5. Mallu Free Video Call Page
export const MalluFreeVideoCallPage = () => {
    useMeta(
        'Mallu Free Video Call - Live Malayalam Random Video Chat & Calling | MalluChat',
        'Enjoy 100% Mallu free video call & live Malayalam video chat online without registration. Connect instantly with random Malayalees worldwide for free video calling.',
        '/mallu-free-video-call'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Free Video Call" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Looking for a 100% <strong>mallu free video call</strong> service to talk face-to-face with fellow Malayalees? MalluChat offers high-speed, peer-to-peer <strong>free video call mallu</strong> features with HD video and crystal-clear audio—no registration, app download, or credit card required.
            </p>

            <Section title="Why Choose MalluChat for Mallu Free Video Calls?">
                <p>Unlike traditional dating or chatting platforms that charge coins or require monthly subscriptions, MalluChat provides completely free, unlimited video calling powered by WebRTC technology:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>100% Free Video Calling:</strong> Enjoy unlimited HD video chat with zero hidden fees or coin paywalls.</li>
                    <li><strong>No Registration Required:</strong> Start a mallu free video chat in seconds without sharing your email or phone number.</li>
                    <li><strong>Direct P2P Encrypted Stream:</strong> Peer-to-peer WebRTC connection ensures your video calls remain strictly private.</li>
                    <li><strong>Cross-Platform Compatibility:</strong> Access free Mallu video calls on Android mobile web, iOS Safari, desktop Chrome, or via our Android APK.</li>
                </ul>
            </Section>

            <Section title="How to Start a Mallu Free Video Call Online">
                <p>Connecting on MalluChat for a free video call takes less than 10 seconds:</p>
                <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li>Click the <strong>Start Chatting Now</strong> button above to open the live platform.</li>
                    <li>Enter any custom anonymous nickname to enter the room.</li>
                    <li>Initiate an instant peer-to-peer <strong>mallu free video call</strong> or random call directly with your online friend.</li>
                </ol>
            </Section>

            <Section title="Safe & Respectful Kerala Video Chat Platform">
                <p>MalluChat is dedicated to creating a fun, safe, and respectful space for Malayalees in Kerala and the global diaspora. Moderate your experience, enjoy anonymous conversations, and connect with people who share your language and culture.</p>
            </Section>
        </div>
    );
};

// 6. Strangers Mallu Chat Page
export const StrangersMalluChatPage = () => {
    useMeta(
        'Strangers Mallu Chat - Chat & Video Call Strangers Online | MalluChat',
        'Connect with strangers on Mallu Chat! Free anonymous strangers Mallu chat, random Mallu video call, and instant Malayalam chat with strangers without registration.',
        '/strangers-mallu-chat'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Strangers Mallu Chat & Video Call" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Want to meet new people through <strong>strangers mallu chat</strong>? MalluChat is the #1 platform designed for Malayalees to chat, voice call, and video call with strangers anonymously across Kerala, GCC, and worldwide.
            </p>

            <Section title="Why MalluChat is the Best Strangers Mallu Chat Platform">
                <p>Chatting with strangers safely is our top priority. Unlike insecure random chat rooms, MalluChat offers:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>100% Anonymous Stranger Chat:</strong> No phone numbers, Facebook logins, or personal details required.</li>
                    <li><strong>Instant Peer-to-Peer Calls:</strong> Start a <strong>strangers mallu video call</strong> directly in your browser with high-quality WebRTC audio and video.</li>
                    <li><strong>Global Malayalee Community:</strong> Connect with Malayalam speakers from Kochi, Trivandrum, Dubai, Riyadh, London, and New York.</li>
                    <li><strong>Safe Moderation &amp; Reporting:</strong> Built-in safety features to ensure a respectful environment for everyone.</li>
                </ul>
            </Section>

            <Section title="How to Start Stranger Chatting in Malayalam">
                <p>Connecting with strangers on MalluChat takes only 3 simple steps:</p>
                <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li>Click <strong>Start Chatting Now</strong> to enter the live chat room.</li>
                    <li>Pick any random nickname of your choice.</li>
                    <li>Jump into the global room or click <strong>Random Match</strong> for a 1-on-1 private video call with a stranger.</li>
                </ol>
            </Section>
        </div>
    );
};

// 7. Mallu Chatting Website Page
export const MalluChattingWebsitePage = () => {
    useMeta(
        'Mallu Chatting Website - #1 Free Malayalam Chat Site & Video Call | MalluChat',
        'Looking for the top Mallu chatting website? MalluChat is the best free Malayalam chat site for live chat, free video calling, and anonymous Malayali connections.',
        '/mallu-chatting-website'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Chatting Website & Chat Site" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Searching for a reliable <strong>mallu chatting website</strong> to meet fellow Malayalees? MalluChat.live is Kerala&apos;s leading web-based chatting site offering real-time public room discussions, private WebRTC chat, and 100% free video calling.
            </p>

            <Section title="Features of Our Mallu Chatting Website">
                <p>What makes MalluChat stand out among all online Malayalam chat sites:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>Zero App Download Required:</strong> Works seamlessly on any mobile or desktop web browser (Chrome, Safari, Firefox, Edge).</li>
                    <li><strong>Free Mallu Video Calling Website:</strong> High quality P2P video stream with no time limits or coin paywalls.</li>
                    <li><strong>Live Public Lobby:</strong> Interactive World Chat to discuss movies, news, food, and daily life in Malayalam/Manglish.</li>
                    <li><strong>Privacy First Architecture:</strong> Direct P2P technology ensures zero chat logs or personal data storage.</li>
                </ul>
            </Section>

            <Section title="Why Malayalees Prefer MalluChat Site">
                <p>Traditional chat sites are often outdated, laggy, or full of ads. MalluChat provides a modern glassmorphism design, fast servers, and instant connectivity for all Kerala users worldwide.</p>
            </Section>
        </div>
    );
};

// 8. Mallu Random Video Call Page
export const MalluRandomVideoCallPage = () => {
    useMeta(
        'Mallu Random Video Call & Roundam Calling - Live Malayalam Video Chat | MalluChat',
        'Experience instant Mallu random video call & roundam chating calling video calling online. Connect live with random Malayalee strangers for free HD video chat.',
        '/mallu-random-video-call'
    );

    return (
        <div style={containerStyle} className="glass">
            <Header title="Mallu Random Video Call & Calling" />
            <CallToAction />
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Enjoy live <strong>mallu random video call</strong> and <strong>mallu roundam chating calling video calling</strong> online! Connect face-to-face with random Malayalam-speaking friends across the globe instantly.
            </p>

            <Section title="Best Mallu Random Calling & Video Chat Features">
                <p>MalluChat offers state-of-the-art random matching for Kerala users:</p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                    <li><strong>One-Click Random Matching:</strong> Tap a single button to connect with an active online Malayali user.</li>
                    <li><strong>HD Video &amp; Low Latency Audio:</strong> Powered by WebRTC technology for ultra-smooth video calling.</li>
                    <li><strong>100% Free Unlimited Video Chat:</strong> No coin purchases, subscriptions, or hidden charges.</li>
                    <li><strong>Instant Skip &amp; Next Match:</strong> Easily switch to the next available online stranger anytime.</li>
                </ul>
            </Section>

            <Section title="Start Your Mallu Random Video Chat Now">
                <p>No waiting rooms or complex setups. Enter the platform, pick a nickname, and tap <strong>Random Video Call</strong> to talk live with random Mallus right now!</p>
            </Section>
        </div>
    );
};



