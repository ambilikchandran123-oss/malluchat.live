import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrivacyPage, TermsPage, AUPPage, DisclaimerPage } from './LegalPages.tsx'
import { MalluChattingAppPage, MalluTelegramChattingPage, TelegramAlternativeGroupChatPage, MalayalamChatOnlinePage } from './SeoPages.tsx'
const path = window.location.pathname;
const isBaseRoute = path === '/' || path.endsWith('/malluchat/') || path.endsWith('/malluchat');
let ComponentToRender = App;

if (path.includes('/privacy')) ComponentToRender = PrivacyPage;
if (path.includes('/terms')) ComponentToRender = TermsPage;
if (path.includes('/aup')) ComponentToRender = AUPPage;
if (path.includes('/disclaimer')) ComponentToRender = DisclaimerPage;
if (path.includes('/mallu-chatting-app')) ComponentToRender = MalluChattingAppPage;
if (path.includes('/mallu-telegram-chatting')) ComponentToRender = MalluTelegramChattingPage;
if (path.includes('/telegram-alternative-group-chat')) ComponentToRender = TelegramAlternativeGroupChatPage;
if (path.includes('/malayalam-chat-online')) ComponentToRender = MalayalamChatOnlinePage;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {!isBaseRoute ? (
      <div style={{ padding: '20px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <ComponentToRender />
      </div>
    ) : (
      <ComponentToRender />
    )}
  </StrictMode>,
)
