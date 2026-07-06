import React from 'react';
import { MalluLogo } from './MalluLogo';

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
            No Registration. No Logins. 100% Anonymous & Secure Public & Private Chats.
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
export const MalluChattingAppPage = () => (
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
                <li><strong>Group & Private Chats:</strong> Hop into the Global World Chat or create a secure, private peer-to-peer room.</li>
                <li><strong>Crystal Clear Calling:</strong> Enjoy free voice and video calls using advanced WebRTC technology directly in your browser.</li>
                <li><strong>Mobile Friendly:</strong> Fully optimized for browser access or downloadable as an Android APK.</li>
            </ul>
        </Section>

        <Section title="Perfect for Malayalees Worldwide">
            <p>Whether you are in Kerala, the Gulf (Gcc), Europe, or the Americas, MalluChat bridges the distance. Meet other people who share your language, watch local movies, talk about food, and share memories of back home in a clean, modern chatting interface.</p>
        </Section>
    </div>
);

// 2. Mallu Telegram Chatting Page
export const MalluTelegramChattingPage = () => (
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

// 3. Telegram Alternative Group Chat Page
export const TelegramAlternativeGroupChatPage = () => (
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

// 4. Malayalam Chat Online Page
export const MalayalamChatOnlinePage = () => (
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
