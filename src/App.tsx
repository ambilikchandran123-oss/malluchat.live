import { useState, useEffect, useRef } from 'react';
import { MalluLogo } from './MalluLogo';
import { PeerEngine } from './utils/peer-engine';
import { isSpam, RateLimiter } from './utils/spam-filter';
import { ringtone } from './utils/ringtone';
import { Send, Phone, Link as LinkIcon, Copy, Mic, CheckCheck, Volume2, MicOff, PhoneOff, X, Reply, Trash2, Video, VideoOff, Users, Lock, Plus, Download, Shuffle, Crown, Upload, AlertTriangle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import './index.css';

// Mock UI sounds
const sentSound = new Audio('/sent.mp3');
const receivedSound = new Audio('/received.mp3');

const isDev = window.location.port === '5173';
const BACKEND_URL = isDev ? 'http://localhost:3000' : 'https://ntfy.sh/malluchat_global_room_v4';
const WS_URL = isDev ? 'ws://localhost:3000/ws' : 'wss://ntfy.sh/malluchat_global_room_v4/ws';
const POST_URL = isDev ? `${BACKEND_URL}/api/messages` : BACKEND_URL;

const GoogleAdMessage = () => {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) { }
  }, []);

  return (
    <div className="google-ad-container" style={{ margin: '5px 0' }}>
      <ins className="adsbygoogle"
        style={{ display: 'block', minWidth: '200px', minHeight: '90px' }}
        data-ad-client="ca-pub-8351044334296545"
        data-ad-slot="8351044334"
        data-ad-format="fluid"
        data-ad-layout-key="-gw-3+1f-3d+2z"></ins>
    </div>
  );
};




const clearOldMessages = () => {
  const now = Date.now();
  const limit = 86400000; // 24 hours in milliseconds

  // 1. Clean public messages
  const publicStored = localStorage.getItem('malluchat_public_messages');
  if (publicStored) {
    try {
      const parsed = JSON.parse(publicStored);
      const filtered = parsed.filter((m: any) => now - m.timestamp < limit);
      localStorage.setItem('malluchat_public_messages', JSON.stringify(filtered));
    } catch (e) {
      localStorage.removeItem('malluchat_public_messages');
    }
  }

  // 2. Clean private messages
  const keysToProcess: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('malluchat_private_messages_')) {
      keysToProcess.push(key);
    }
  }

  keysToProcess.forEach(key => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const filtered = parsed.filter((m: any) => now - m.timestamp < limit);
        if (filtered.length === 0) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(filtered));
        }
      } catch (e) {
        localStorage.removeItem(key);
      }
    }
  });
};

const KOCHI_SUB_LOCS = ['Kakkanad', 'Edappally', 'Kaloor', 'Fort Kochi', 'Kalamassery', 'Palarivattom', 'Vytilla', 'Aluva', 'Cheranallur', 'Tripunithura', 'Panampilly Nagar', 'Kadavanthra', 'Vennala', 'Elamakkara', 'Maradu', 'Thevara'];
const CALICUT_SUB_LOCS = ['Elathur', 'Beypore', 'Nallalam', 'Chevayur', 'Kovoor', 'Pantheerankavu', 'Thondayad', 'Mankave', 'Kallayi', 'Vellimadukunnu', 'Nadakkavu', 'Pottammal', 'Karaparamba', 'Kottooli', 'Chevarambalam'];
const TRIVANDRUM_SUB_LOCS = ['Kazhakoottam', 'Kowdiar', 'Pattom', 'Vellayambalam', 'Varkala', 'Nemom', 'Peroorkada', 'Vizhinjam', 'Sreekaryam', 'Vattiyoorkavu', 'Ambalamukku', 'Sasthamangalam', 'Thirumala', 'Mannanthala', 'Nalanchira', 'Poojappura'];
const THRISSUR_SUB_LOCS = ['Kanattukara', 'Punkunnam', 'Ramavarmapuram', 'Ollur', 'Kuriachira', 'Ayyanthole', 'Kolazhy', 'Mannuthy', 'Koorkanchery', 'Guruvayur', 'Patturaikkal', 'Nadathara', 'Peringavu', 'Cheroor', 'Vilvattom'];
const MALAPPURAM_SUB_LOCS = ['Kottakkal', 'Manjeri', 'Perinthalmanna', 'Tirur', 'Ponnani', 'Nilambur', 'Kondotty', 'Valanchery', 'Edappal', 'Tanur', 'Wandoor', 'Melattur', 'Anakkayam', 'Mongam', 'Down Hill'];

const KOLLAM_SUB_LOCS = ['Chathannoor', 'Kottarakkara', 'Karunagappally', 'Chinnakada', 'Kadavoor', 'Kureepuzha', 'Polayathode', 'Eravipuram', 'Kollam Beach', 'Punalur', 'Pathanapuram', 'Kundara'];
const ALAPPUZHA_SUB_LOCS = ['Cherthala', 'Kayamkulam', 'Haripad', 'Ambalappuzha', 'Mavelikkara', 'Mannar', 'Punnamada', 'Kalavoor', 'Mararikulam', 'Kuttanad', 'Aroor'];
const KOTTAYAM_SUB_LOCS = ['Changanassery', 'Pala', 'Kanjirappally', 'Ettumanoor', 'Vaikom', 'Kumarakom', 'Pampady', 'Ponkunnam', 'Manarcad', 'Chingavanam'];
const PALAKKAD_SUB_LOCS = ['Ottapalam', 'Shoranur', 'Mannarkkad', 'Pattambi', 'Cherpulassery', 'Kallekkad', 'Olappamanna', 'Malampuzha', 'Chittur', 'Alathur'];
const KANNUR_SUB_LOCS = ['Thalassery', 'Payyanur', 'Taliparamba', 'Iritty', 'Mattannur', 'Payyambalam', 'Thottada', 'Chala', 'Valapattanam', 'Edakkad'];
const KASARAGOD_SUB_LOCS = ['Kanhangad', 'Nileshwar', 'Kumbla', 'Uppala', 'Manjeshwar', 'Cheruvathur', 'Bekal', 'Trikaripur'];
const PATHANAMTHITTA_SUB_LOCS = ['Adoor', 'Thiruvalla', 'Pandalam', 'Ranni', 'Konni', 'Mallappally', 'Kozhenchery', 'Pathanamthitta Town'];
const IDUKKI_SUB_LOCS = ['Thodupuzha', 'Munnar', 'Kattappana', 'Adimali', 'Nedumkandam', 'Kumily', 'Vagamon', 'Peermade'];
const WAYANAD_SUB_LOCS = ['Kalpetta', 'Sulthan Bathery', 'Mananthavady', 'Meppadi', 'Vythiri', 'Lakkidi', 'Ambalavayal'];

const GENERIC_SUB_LOCS = [
  'Aluva', 'Cherthala', 'Kayamkulam', 'Changanassery', 'Kottarakkara',
  'Punalur', 'Adoor', 'Thiruvalla', 'Thodupuzha', 'Pala',
  'Ettumanoor', 'Kattappana', 'Chalakudy', 'Irinjalakuda', 'Kodungallur',
  'Kunnamkulam', 'Shoranur', 'Ottapalam', 'Pattambi', 'Mannarkkad',
  'Kottakkal', 'Manjeri', 'Perinthalmanna', 'Tirur', 'Koduvally',
  'Thamarassery', 'Mukkam', 'Mavoor', 'Feroke', 'Thalassery',
  'Payyanur', 'Taliparamba', 'Kanhangad', 'Nileshwar', 'Kalpetta'
];


const getProfileLocation = (index: number, cityName: string, distance: number) => {
  const cleanCity = cityName.split(',')[0].trim();
  const lowerCity = cleanCity.toLowerCase();
  
  // If the user is very close, show them in the same city/sub-location
  if (distance < 2.0) {
    return cleanCity;
  }
  
  let subLocList = GENERIC_SUB_LOCS;
  if (lowerCity.includes('kochi') || lowerCity.includes('cochin') || lowerCity.includes('ernakulam')) {
    subLocList = KOCHI_SUB_LOCS;
  } else if (lowerCity.includes('kozhikode') || lowerCity.includes('calicut')) {
    subLocList = CALICUT_SUB_LOCS;
  } else if (lowerCity.includes('trivandrum') || lowerCity.includes('thiruvananthapuram')) {
    subLocList = TRIVANDRUM_SUB_LOCS;
  } else if (lowerCity.includes('thrissur') || lowerCity.includes('trichur')) {
    subLocList = THRISSUR_SUB_LOCS;
  } else if (lowerCity.includes('malappuram')) {
    subLocList = MALAPPURAM_SUB_LOCS;
  } else if (lowerCity.includes('kollam') || lowerCity.includes('quilon')) {
    subLocList = KOLLAM_SUB_LOCS;
  } else if (lowerCity.includes('alappuzha') || lowerCity.includes('alleppey')) {
    subLocList = ALAPPUZHA_SUB_LOCS;
  } else if (lowerCity.includes('kottayam')) {
    subLocList = KOTTAYAM_SUB_LOCS;
  } else if (lowerCity.includes('palakkad') || lowerCity.includes('palghat')) {
    subLocList = PALAKKAD_SUB_LOCS;
  } else if (lowerCity.includes('kannur') || lowerCity.includes('cannanore')) {
    subLocList = KANNUR_SUB_LOCS;
  } else if (lowerCity.includes('kasaragod') || lowerCity.includes('cassergode')) {
    subLocList = KASARAGOD_SUB_LOCS;
  } else if (lowerCity.includes('pathanamthitta')) {
    subLocList = PATHANAMTHITTA_SUB_LOCS;
  } else if (lowerCity.includes('idukki')) {
    subLocList = IDUKKI_SUB_LOCS;
  } else if (lowerCity.includes('wayanad')) {
    subLocList = WAYANAD_SUB_LOCS;
  }
  
  const subLoc = subLocList[index % subLocList.length];
  return subLoc;
};

const DEMO_PROFILES = [
  { id: 'demo-1', name: 'Aisha', gender: 'female', status: 'online', latOffset: 0.012, lonOffset: -0.008, defaultDist: 1.5, avatar: 'Ai' },
  { id: 'demo-2', name: 'Ananya', gender: 'female', status: 'online', latOffset: -0.005, lonOffset: 0.015, defaultDist: 1.8, avatar: 'An' },
  { id: 'demo-3', name: 'Fathima', gender: 'female', status: 'online', latOffset: 0.022, lonOffset: 0.018, defaultDist: 3.2, avatar: 'Fa' },
  { id: 'demo-4', name: 'Devika', gender: 'female', status: 'offline', latOffset: -0.018, lonOffset: -0.025, defaultDist: 3.8, avatar: 'De' },
  { id: 'demo-5', name: 'Riza', gender: 'female', status: 'online', latOffset: 0.052, lonOffset: -0.012, defaultDist: 5.7, avatar: 'Ri' },
  { id: 'demo-6', name: 'Gopika', gender: 'female', status: 'online', latOffset: 0.008, lonOffset: 0.042, defaultDist: 4.8, avatar: 'Go' },
  { id: 'demo-7', name: 'Jasna', gender: 'female', status: 'offline', latOffset: -0.045, lonOffset: -0.012, defaultDist: 5.1, avatar: 'Ja' },
  { id: 'demo-8', name: 'Malavika', gender: 'female', status: 'online', latOffset: 0.052, lonOffset: 0.028, defaultDist: 6.5, avatar: 'Ma' },
  { id: 'demo-9', name: 'Naadiya', gender: 'female', status: 'online', latOffset: -0.022, lonOffset: 0.058, defaultDist: 6.8, avatar: 'Na' },
  { id: 'demo-10', name: 'Kavya', gender: 'female', status: 'offline', latOffset: 0.062, lonOffset: -0.048, defaultDist: 8.7, avatar: 'Ka' },
  { id: 'demo-11', name: 'Sneha', gender: 'female', status: 'online', latOffset: -0.032, lonOffset: 0.022, defaultDist: 4.1, avatar: 'Sn' },
  { id: 'demo-12', name: 'Maria', gender: 'female', status: 'offline', latOffset: 0.045, lonOffset: -0.035, defaultDist: 6.2, avatar: 'Mr' },
  { id: 'demo-13', name: 'Riya', gender: 'female', status: 'online', latOffset: -0.012, lonOffset: 0.065, defaultDist: 7.1, avatar: 'Ry' },
  { id: 'demo-14', name: 'Sherin', gender: 'female', status: 'offline', latOffset: 0.075, lonOffset: 0.012, defaultDist: 9.3, avatar: 'Sh' },
  { id: 'demo-15', name: 'Sandra', gender: 'female', status: 'online', latOffset: -0.055, lonOffset: 0.045, defaultDist: 8.0, avatar: 'Sa' },
  { id: 'demo-16', name: 'Farhana', gender: 'female', status: 'offline', latOffset: 0.015, lonOffset: -0.062, defaultDist: 6.9, avatar: 'Fa' },
  { id: 'demo-17', name: 'Shilpa', gender: 'female', status: 'online', latOffset: -0.025, lonOffset: -0.055, defaultDist: 7.4, avatar: 'Sp' },
  { id: 'demo-18', name: 'Anjali', gender: 'female', status: 'offline', latOffset: 0.038, lonOffset: 0.052, defaultDist: 5.5, avatar: 'Aj' },
  { id: 'demo-19', name: 'Akhil', gender: 'male', status: 'online', latOffset: -0.015, lonOffset: -0.008, defaultDist: 1.8, avatar: 'Ak' },
  { id: 'demo-20', name: 'Faisal', gender: 'male', status: 'online', latOffset: 0.028, lonOffset: 0.002, defaultDist: 3.1, avatar: 'Fi' },
  { id: 'demo-21', name: 'Rahul', gender: 'male', status: 'offline', latOffset: -0.042, lonOffset: 0.025, defaultDist: 5.3, avatar: 'Ra' },
  { id: 'demo-22', name: 'Shamil', gender: 'male', status: 'online', latOffset: 0.062, lonOffset: -0.022, defaultDist: 7.6, avatar: 'Sm' },
  { id: 'demo-23', name: 'Vishnu', gender: 'male', status: 'offline', latOffset: -0.038, lonOffset: -0.048, defaultDist: 6.4, avatar: 'Vi' },
  { id: 'demo-24', name: 'Anas', gender: 'male', status: 'online', latOffset: 0.018, lonOffset: 0.055, defaultDist: 5.0, avatar: 'An' },
  { id: 'demo-25', name: 'Meera', gender: 'female', status: 'online', latOffset: 0.182, lonOffset: -0.052, defaultDist: 21.0, avatar: 'Me' },
  { id: 'demo-26', name: 'Nafiah', gender: 'female', status: 'online', latOffset: -0.155, lonOffset: 0.122, defaultDist: 21.8, avatar: 'Na' },
  { id: 'demo-27', name: 'Sruthi', gender: 'female', status: 'offline', latOffset: 0.168, lonOffset: -0.095, defaultDist: 21.4, avatar: 'Sr' },
  { id: 'demo-28', name: 'Hadiya', gender: 'female', status: 'online', latOffset: -0.215, lonOffset: 0.142, defaultDist: 28.5, avatar: 'Ha' },
  { id: 'demo-29', name: 'Aswathy', gender: 'female', status: 'online', latOffset: 0.278, lonOffset: -0.082, defaultDist: 32.0, avatar: 'As' },
  { id: 'demo-30', name: 'Shabna', gender: 'female', status: 'offline', latOffset: -0.175, lonOffset: -0.065, defaultDist: 20.8, avatar: 'Sh' },
  { id: 'demo-31', name: 'Karthika', gender: 'female', status: 'online', latOffset: 0.192, lonOffset: 0.045, defaultDist: 21.8, avatar: 'Ka' },
  { id: 'demo-32', name: 'Fida', gender: 'female', status: 'online', latOffset: -0.252, lonOffset: -0.115, defaultDist: 30.7, avatar: 'Fi' },
  { id: 'demo-33', name: 'Parvathy', gender: 'female', status: 'offline', latOffset: 0.312, lonOffset: 0.055, defaultDist: 35.1, avatar: 'Pa' },
  { id: 'demo-34', name: 'Dilsha', gender: 'female', status: 'online', latOffset: -0.162, lonOffset: 0.085, defaultDist: 20.3, avatar: 'Di' },
  { id: 'demo-35', name: 'Jithin', gender: 'male', status: 'online', latOffset: 0.185, lonOffset: -0.045, defaultDist: 21.1, avatar: 'Ji' },
  { id: 'demo-36', name: 'Nabeel', gender: 'male', status: 'online', latOffset: -0.178, lonOffset: 0.082, defaultDist: 21.7, avatar: 'Na' },
  { id: 'demo-37', name: 'Pranav', gender: 'male', status: 'offline', latOffset: 0.222, lonOffset: 0.115, defaultDist: 27.8, avatar: 'Pr' },
  { id: 'demo-38', name: 'Ashique', gender: 'male', status: 'online', latOffset: -0.192, lonOffset: -0.035, defaultDist: 21.6, avatar: 'As' },
  { id: 'demo-39', name: 'Siddharth', gender: 'male', status: 'offline', latOffset: 0.265, lonOffset: -0.092, defaultDist: 31.2, avatar: 'Si' },
  { id: 'demo-40', name: 'Arshad', gender: 'male', status: 'online', latOffset: -0.181, lonOffset: 0.048, defaultDist: 20.8, avatar: 'Ar' }
];

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c).toFixed(1);
};

export default function App() {
  const [viewMode, setViewMode] = useState<'private' | 'public' | 'random'>('public');
  const [username, setUsername] = useState<string>('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Premium paywall states
  const [isPremium, setIsPremium] = useState<boolean>(() => localStorage.getItem('malluchat_premium') === 'true');
  const [paywallTriggerReason, setPaywallTriggerReason] = useState<'calling' | 'filter'>('calling');
  const [isVerifyingPayment, setIsVerifyingPayment] = useState<boolean>(false);

  // Random Calling states
  const [genderFilter, setGenderFilter] = useState<'female' | 'male' | 'all'>('all');
  const [userCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [detectedCity] = useState<string>('Kochi, Kerala');
  const [activeCallingUser, setActiveCallingUser] = useState<any | null>(null);
  const [showPaywall, setShowPaywall] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<{ amount: number; duration: string; label: string } | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');
  const [verificationSubmitted, setVerificationSubmitted] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [targetUpiId, setTargetUpiId] = useState<string>('BHARATPE2J0A0P6U4O28675@unitype');
  const [showPaymentSettings, setShowPaymentSettings] = useState<boolean>(false);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const [currentTxnId, setCurrentTxnId] = useState<string>('');
  const [ringingTimeout, setRingingTimeout] = useState<any | null>(null);
  const [demoUsers, setDemoUsers] = useState<any[]>(DEMO_PROFILES);

  // Video Call States
  const [isCameraOff, setIsCameraOff] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Fake accurate-looking live users count starting at 400
  const [liveUsers, setLiveUsers] = useState<number>(400);

  // Private Chat States
  const [roomId, setRoomId] = useState<string>('');
  const [myId, setMyId] = useState<string>('');
  const [peerEngine] = useState(() => new PeerEngine());
  const [status, setStatus] = useState<string>('disconnected');
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');

  // Public Chat States
  const [publicMessages, setPublicMessages] = useState<any[]>(() => {
    const stored = localStorage.getItem('malluchat_public_messages');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = Date.now();
        return parsed.filter((m: any) => now - m.timestamp < 86400000);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [publicInput, setPublicInput] = useState<string>('');

  // Reply State
  const [replyingTo, setReplyingTo] = useState<any | null>(null);

  // Admin States
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adImageUrl, setAdImageUrl] = useState('');
  const [adLinkUrl, setAdLinkUrl] = useState('');
  const [adText, setAdText] = useState('');
  const [adSponsor, setAdSponsor] = useState('Sponsor');
  const [adType, setAdType] = useState<'custom' | 'google'>('custom');

  // Detect if running inside Native App
  const isApp = typeof navigator !== 'undefined' && navigator.userAgent.includes('MalluChatApp');

  // Incoming personal chat request
  const [incomingChatRequest, setIncomingChatRequest] = useState<{ conn: any, metadata: any } | null>(null);
  const [remoteUsername, setRemoteUsername] = useState<string>('User');

  // Advanced features
  const [remoteTyping, setRemoteTyping] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const typingTimeoutRef = useRef<any>(null);
  const viewModeRef = useRef(viewMode);
  viewModeRef.current = viewMode;
  const usernameRef = useRef(username);
  usernameRef.current = username;
  const isCancelingVoiceRef = useRef<boolean>(false);

  // Call states
  const [inCall, setInCall] = useState<boolean>(false);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const publicMessagesEndRef = useRef<HTMLDivElement>(null);
  const rateLimiter = useRef(new RateLimiter(5, 5000));

  useEffect(() => {
    // Pulse Live Users Count
    const interval = setInterval(() => {
      setLiveUsers(prev => Math.max(375, prev + Math.floor(Math.random() * 5) - 2));
    }, 7000);
    return () => clearInterval(interval);
  }, []);



  // Call simulation duration effect
  useEffect(() => {
    let interval: any;
    if (inCall && activeCallingUser && activeCallingUser.id?.startsWith('demo-')) {
      setCallDuration(0);
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [inCall, activeCallingUser]);

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCallDemoUser = (user: any) => {
    if (!username) {
      setShowLoginModal(true);
      return;
    }
    setActiveCallingUser(user);
    ringtone.start();

    // Free call if user is premium OR genderFilter is 'all' (No gender filter selected)
    const isFreeCall = isPremium || genderFilter === 'all';

    if (isFreeCall) {
      // Connect call after 3 seconds of ringing
      const timeout = setTimeout(() => {
        ringtone.stop();
        setInCall(true);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
            peerEngine.localStream = stream;
          })
          .catch((err) => {
            console.warn("Camera permission declined, proceeding with voice call only", err);
          });
      }, 3000);
      setRingingTimeout(timeout);
    } else {
      // If not premium and using filtered calls, show paywall after 1.8 seconds
      const timeout = setTimeout(() => {
        setPaywallTriggerReason('calling');
        setShowPaywall(true);
        ringtone.stop();
      }, 1800);
      setRingingTimeout(timeout);
    }
  };

  const handleStartRandomCall = () => {
    if (!username) {
      setShowLoginModal(true);
      return;
    }
    
    // Filter active online demo users based on current genderFilter
    const availableUsers = demoUsers.filter(p => {
      const matchesGender = genderFilter === 'all' || p.gender === genderFilter;
      const matchesOnline = p.status === 'online';
      return matchesGender && matchesOnline;
    });
    
    if (availableUsers.length === 0) {
      alert("No active users found matching your filters. Try selecting 'Both'.");
      return;
    }
    
    // Pick a random user
    const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
    
    // Call the user
    handleCallDemoUser(randomUser);
  };

  const handleEndCall = () => {
    peerEngine.endCall();
    setInCall(false);
    setActiveCallingUser(null);
  };

  const handleSelectGenderFilter = (filter: 'female' | 'male' | 'all') => {
    if (filter === 'all') {
      setGenderFilter('all');
      return;
    }
    
    if (isPremium) {
      setGenderFilter(filter);
    } else {
      setPaywallTriggerReason('filter');
      // Set a dummy profile explaining the filter so card doesn't crash on activeCallingUser properties
      setActiveCallingUser({ id: 'dummy-filter', name: filter === 'female' ? 'Females Only' : 'Males Only', avatar: '⭐', gender: filter });
      setShowPaywall(true);
    }
  };

  const handleCancelCall = () => {
    if (ringingTimeout) clearTimeout(ringingTimeout);
    setRingingTimeout(null);
    ringtone.stop();
    setActiveCallingUser(null);
    setShowPaywall(false);
    setSelectedPlan(null);
    setPaymentScreenshot(null);
    setScreenshotFileName('');
    setVerificationSubmitted(false);
    setIsVerifyingPayment(false);
    setCopiedUpi(false);
    setShowPaymentSettings(false);
    setCurrentTxnId('');
    setShowQrCode(false);
  };

  const handleVerifyPayment = () => {
    setVerificationSubmitted(true);
    setIsVerifyingPayment(true);
    
    // Simulate transaction validation
    setTimeout(() => {
      setIsVerifyingPayment(false);
      setIsPremium(true);
      localStorage.setItem('malluchat_premium', 'true');
      setShowPaywall(false);
      
      // Clean up dial / call triggers
      if (ringingTimeout) clearTimeout(ringingTimeout);
      setRingingTimeout(null);
      ringtone.stop();
      
      alert("🎉 Premium access unlocked successfully! Enjoy unlimited random calls & gender filters.");

      if (activeCallingUser && activeCallingUser.id !== 'dummy-filter') {
        // Automatically start the call!
        setInCall(true);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }
            peerEngine.localStream = stream;
          })
          .catch((err) => {
            console.warn("Camera permission declined", err);
          });
      } else {
        setActiveCallingUser(null);
      }
    }, 2500);
  };

  const downloadUpiQrCode = async (amount: number, planLabel: string, txnId: string) => {
    const upiUrl = `upi://pay?pa=${encodeURIComponent(targetUpiId)}&pn=MalluChat&mc=5734&tr=${txnId}&am=${amount}&cu=INR&tn=MalluChat%20Plan%20${encodeURIComponent(planLabel)}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(upiUrl)}`;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `malluchat_payment_qr_${amount}_rupees.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error("Failed to download QR code image", e);
    }
  };

  const handleSelectPlan = (plan: { amount: number; duration: string; label: string }) => {
    setSelectedPlan(plan);
    setPaymentScreenshot(null);
    setScreenshotFileName('');
    setVerificationSubmitted(false);
    
    const newTxnId = 'MC' + Date.now() + Math.floor(Math.random() * 1000);
    setCurrentTxnId(newTxnId);
    
    downloadUpiQrCode(plan.amount, plan.label, newTxnId);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(targetUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoUsers(prev => {
        return prev.map(user => {
          if (Math.random() < 0.15) {
            return {
              ...user,
              status: user.status === 'online' ? 'offline' : 'online'
            };
          }
          return user;
        });
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch cached messages from our hosted backend to load history
    const fetchHistoryUrl = isDev 
      ? `${BACKEND_URL}/api/messages` 
      : 'https://ntfy.sh/malluchat_global_room_v4/json?poll=1';

    fetch(fetchHistoryUrl)
      .then(res => isDev ? res.json() : res.text())
      .then(data => {
        let messages: any[] = [];
        if (isDev) {
          if (Array.isArray(data)) messages = data;
        } else {
          // Parse JSON Lines from ntfy
          messages = (data as string).split('\n')
            .filter(line => line.trim() !== '')
            .map(line => {
              try {
                const parsed = JSON.parse(line);
                if (parsed.event === 'message') {
                  return JSON.parse(parsed.message);
                }
              } catch (e) {}
              return null;
            })
            .filter(m => m !== null);
        }

        if (messages.length > 0) {
          setPublicMessages(prev => {
            const newMsgs = messages.filter(fm => !prev.some(pm => pm.id === fm.id));
            if (newMsgs.length === 0) return prev;
            const updated = [...prev, ...newMsgs].sort((a, b) => a.timestamp - b.timestamp);
            localStorage.setItem('malluchat_public_messages', JSON.stringify(updated));
            return updated;
          });
        }
      })
      .catch(err => console.error("Failed to load message history:", err));

    // Setup Global Public Chat via custom WebSocket with auto-reconnect
    let ws: WebSocket | null = null;
    let isUnmounted = false;
    let reconnectTimeout: any = null;

    const connectWebSocket = () => {
      if (isUnmounted) return;
      
      ws = new WebSocket(WS_URL);
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'user_count') {
            setLiveUsers(400 + (data.count || 0));
            return;
          }
          if (data.event === 'message') {
            try {
              const payload = JSON.parse(data.message);
              setPublicMessages(prev => {
                if (prev.find(m => m.id === payload.id)) return prev;
                const updated = [...prev, payload];
                localStorage.setItem('malluchat_public_messages', JSON.stringify(updated));
                return updated;
              });
            } catch (e) { }
          }
        } catch (err) { }
      };

      ws.onclose = () => {
        if (!isUnmounted) {
          console.log("WebSocket disconnected. Reconnecting in 3 seconds...");
          reconnectTimeout = setTimeout(connectWebSocket, 3000);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        ws?.close();
      };
    };

    connectWebSocket();

    // Setup PeerJS for Private Chat only if not initialized
    if (!peerEngine.peer) {
      peerEngine.initialize(
        (id) => setMyId(id),
        (err) => {
          console.error("PeerJS Error:", err);
          if (err?.type === 'peer-unavailable') {
            alert("Connection Failed: The user has gone offline or refreshed their page.");
            setViewMode('public');
            setStatus('disconnected');
          }
          // Removed server-error/network alerts which lock the user in a failed loop
        }
      );
    }

    peerEngine.onConnected = () => {
      setStatus('connected');
      const remotePeerId = peerEngine.connection?.peer;
      if (remotePeerId) {
        const stored = localStorage.getItem(`malluchat_private_messages_${remotePeerId}`);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            const now = Date.now();
            const filtered = parsed.filter((m: any) => now - m.timestamp < 86400000);
            setMessages(filtered);
            localStorage.setItem(`malluchat_private_messages_${remotePeerId}`, JSON.stringify(filtered));
          } catch (e) {
            setMessages([]);
          }
        } else {
          setMessages([]);
        }
      }
      setTimeout(() => {
        peerEngine.sendMessage({
          id: uuidv4(),
          senderId: peerEngine.id,
          senderName: usernameRef.current || 'User',
          type: 'user_info',
          timestamp: Date.now()
        } as any);
      }, 500);
    };

    peerEngine.onDisconnected = () => {
      setStatus('disconnected');
      setMessages([]);
    };

    peerEngine.onConnectionRequest = (conn, metadata) => {
      // Automatically reject incoming generic connections if already chatting with someone else
      if (peerEngine.connection && peerEngine.connection.open && peerEngine.connection.peer !== conn.peer) {
        conn.close();
        return;
      }

      if (metadata?.type === 'decline') {
        alert(`${metadata.senderName} declined your chat request.`);
        setViewMode('public');
        setStatus('disconnected');
        return;
      }
      setIncomingChatRequest({ conn, metadata });
    };

    peerEngine.onMessage = (msg: any) => {
      if (msg.type === 'user_info') {
        if (msg.senderName) setRemoteUsername(msg.senderName);
        return;
      }
      if (msg.type === 'typing_start') {
        setRemoteTyping(true);
        return;
      }
      if (msg.type === 'typing_stop') {
        setRemoteTyping(false);
        return;
      }
      if (msg.type === 'reaction') {
        setMessages(prev => {
          const updated = prev.map(m => m.id === msg.targetId ? { ...m, reaction: msg.reaction } : m);
          const remotePeerId = peerEngine.connection?.peer;
          if (remotePeerId) {
            localStorage.setItem(`malluchat_private_messages_${remotePeerId}`, JSON.stringify(updated));
          }
          return updated;
        });
        return;
      }
      if (msg.type === 'read') {
        setMessages(prev => {
          const updated = prev.map(m => m.id === msg.targetId ? { ...m, status: 'read' } : m);
          const remotePeerId = peerEngine.connection?.peer;
          if (remotePeerId) {
            localStorage.setItem(`malluchat_private_messages_${remotePeerId}`, JSON.stringify(updated));
          }
          return updated;
        });
        return;
      }

      setRemoteTyping(false); // clear typing on msg receive
      setMessages(prev => {
        const updated = [...prev, msg];
        const remotePeerId = peerEngine.connection?.peer;
        if (remotePeerId) {
          localStorage.setItem(`malluchat_private_messages_${remotePeerId}`, JSON.stringify(updated));
        }
        return updated;
      });
      receivedSound.play().catch(() => { });

      // Send back read receipt automatically
      if (msg.type === 'text' || msg.type === 'voice') {
        peerEngine.sendMessage({
          id: uuidv4(),
          senderId: peerEngine.id,
          senderName: usernameRef.current,
          type: 'read',
          targetId: msg.id,
          timestamp: Date.now()
        });
      }
    };

    peerEngine.onCallReceived = (call) => {
      const callType = call.metadata?.callType;
      const isVideo = callType === 'private-video';

      if (window.confirm(`Incoming ${isVideo ? 'video' : 'voice'} call! Accept?`)) {
        navigator.mediaDevices.getUserMedia({ audio: true, video: isVideo }).then((stream) => {
          call.answer(stream);
          call.on('stream', (rStream) => {
            setRemoteStream(rStream);
          });
          peerEngine.callConnection = call;
          peerEngine.localStream = stream;
          setInCall(true);
        }).catch(() => {
          alert("Permission denied. Could not start media devices.");
        });
      } else {
        call.close();
      }
    };

    peerEngine.onCallEnded = () => {
      setInCall(false);
      setRemoteStream(null);
      setIsMicMuted(false);
    };

    return () => {
      isUnmounted = true;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      peerEngine.destroy();
      if (ws) ws.close();
    };
  }, []);

  useEffect(() => {
    // Run cleanup on mount
    clearOldMessages();

    // Periodic cleanup of state & storage (every 10 seconds)
    const interval = setInterval(() => {
      const now = Date.now();
      const limit = 86400000;

      // Filter publicMessages state
      setPublicMessages(prev => {
        const filtered = prev.filter(m => now - m.timestamp < limit);
        if (filtered.length !== prev.length) {
          localStorage.setItem('malluchat_public_messages', JSON.stringify(filtered));
        }
        return filtered;
      });

      // Filter privateMessages state
      setMessages(prev => {
        const filtered = prev.filter(m => now - m.timestamp < limit);
        const remotePeerId = peerEngine.connection?.peer;
        if (remotePeerId && filtered.length !== prev.length) {
          localStorage.setItem(`malluchat_private_messages_${remotePeerId}`, JSON.stringify(filtered));
        }
        return filtered;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [peerEngine.connection]);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      setRecordingTime(0);
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, remoteTyping]);

  useEffect(() => {
    publicMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [publicMessages]);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        if (!isAdminAuth) {
          setShowAdminLogin(true);
          setShowAdminPanel(false);
        } else {
          setShowAdminLogin(false);
          setShowAdminPanel(true);
        }
      } else {
        setShowAdminLogin(false);
        setShowAdminPanel(false);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isAdminAuth]);

  useEffect(() => {
    // Inject a fake AD message into the public chat exactly 10 seconds after joining
    const adTimer = setTimeout(() => {
      const adMsg = {
        id: uuidv4(),
        senderId: 'system-ad',
        senderName: 'Sponsor',
        type: 'ad',
        text: `<div style="display: flex; flex-direction: column; align-items: stretch; background: var(--panel-bg); border-radius: 12px; overflow: hidden; border: 1px solid var(--panel-border);">
          <div style="background: white; padding: 20px; display: flex; justify-content: center; align-items: center;">
            <img src="https://twingle.online/twingle-logo.png" style="height: 60px;" alt="Twingle Logo" />
          </div>
          <div style="padding: 12px; text-align: center;">
            <div style="font-weight: 700; color: var(--text-main); font-size: 1.1rem; margin-bottom: 4px;">FREE MALLU DATING APP</div>
            <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 12px;">Find love, marriage, and friendship in Kerala.</div>
            <a href="https://twingle.online" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: var(--primary); color: black; font-weight: bold; padding: 8px 16px; border-radius: 20px; text-decoration: none; font-size: 0.9rem;">Visit twingle.online</a>
          </div>
        </div>`,
        timestamp: Date.now()
      };
      setPublicMessages(prev => {
        if (prev.some(m => m.senderId === 'system-ad')) return prev;
        const updated = [...prev, adMsg];
        localStorage.setItem('malluchat_public_messages', JSON.stringify(updated));
        return updated;
      });
      setMessages(prev => {
        if (prev.some(m => m.senderId === 'system-ad')) return prev;
        const updated = [...prev, adMsg];
        const remotePeerId = peerEngine.connection?.peer;
        if (remotePeerId) {
          localStorage.setItem(`malluchat_private_messages_${remotePeerId}`, JSON.stringify(updated));
        }
        return updated;
      });
    }, 10000);

    return () => clearTimeout(adTimer);
  }, []);

  useEffect(() => {
    if (remoteStream && remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
    if (peerEngine.localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = peerEngine.localStream;
    }
  }, [remoteStream, inCall, viewMode]);

  const handleStartTyping = () => {
    if (status !== 'connected') return;
    peerEngine.sendMessage({ id: uuidv4(), senderId: myId, senderName: username, type: 'typing_start', timestamp: Date.now() } as any);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      peerEngine.sendMessage({ id: uuidv4(), senderId: myId, senderName: username, type: 'typing_stop', timestamp: Date.now() } as any);
    }, 2000);
  };

  const startRecording = async () => {
    try {
      if (!username) {
        setShowLoginModal(true);
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      isCancelingVoiceRef.current = false;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        setIsRecording(false);
        setRecordingTime(0);

        if (isCancelingVoiceRef.current) return;
        if (audioChunksRef.current.length === 0) return;

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          const msg = {
            id: uuidv4(),
            senderId: myId,
            senderName: username,
            type: 'voice',
            voiceBlob: base64Audio,
            timestamp: Date.now(),
            status: 'delivered'
          } as any;

          if (viewModeRef.current === 'public') {
            // Public chat voice messages cannot fit in ntfy's 4KB payload limit as base64.
            // Uploading to an anonymous temporary file host.
            const form = new FormData();
            form.append('file', audioBlob, 'voice.webm');
            fetch('https://tmpfiles.org/api/v1/upload', {
              method: 'POST',
              body: form
            })
              .then(res => res.json())
              .then(data => {
                const directUrl = data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
                const publicMsg = { ...msg, voiceBlob: directUrl };
                setPublicMessages(prev => {
                  const updated = [...prev, publicMsg];
                  localStorage.setItem('malluchat_public_messages', JSON.stringify(updated));
                  return updated;
                });

                fetch(POST_URL, {
                  method: 'POST',
                  body: JSON.stringify(publicMsg)
                }).catch(() => { });
                sentSound.play().catch(() => { });
              }).catch(() => {
                alert("Failed to upload public voice message.");
              });
          } else {
            // Private direct connection can handle large data naturally
            peerEngine.sendMessage(msg);
            setMessages(prev => {
              const updated = [...prev, msg];
              const remotePeerId = peerEngine.connection?.peer;
              if (remotePeerId) {
                localStorage.setItem(`malluchat_private_messages_${remotePeerId}`, JSON.stringify(updated));
              }
              return updated;
            });
            sentSound.play().catch(() => { });
          }
        };
      };

      mediaRecorder.start(250);
      setIsRecording(true);
    } catch (e) {
      alert('Microphone access is required for voice messages.');
    }
  };

  const stopRecordingAndSend = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      isCancelingVoiceRef.current = true;
      mediaRecorderRef.current.stop();
    }
  };

  const CustomAudioPlayer = ({ src, isMine }: { src: string, isMine: boolean }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const updateProgress = () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      };
      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', handleEnded);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', handleEnded);
      };
    }, []);

    const togglePlay = () => {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };

    return (
      <div className="audio-player-wrapper" style={{ background: isMine ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: '20px' }}>
        <audio ref={audioRef} src={src} className="hidden-audio" />
        <button className="play-btn" onClick={togglePlay} style={{ background: isMine ? 'var(--primary)' : 'var(--text-main)', color: '#000', width: '36px', height: '36px', minWidth: '36px' }}>
          <div style={{ marginLeft: isPlaying ? '0' : '2px', display: 'flex' }}>
            {isPlaying ? (
              <div style={{ width: '10px', height: '10px', background: '#000', borderRadius: '1px' }}></div>
            ) : (
              <div style={{ width: '0', height: '0', borderStyle: 'solid', borderWidth: '6px 0 6px 10px', borderColor: 'transparent transparent transparent #000' }}></div>
            )}
          </div>
        </button>
        <div className="audio-progress">
          <div className="audio-progress-bar" style={{ width: `${progress}%`, background: isMine ? 'var(--primary)' : 'var(--text-main)' }}></div>
        </div>
      </div>
    );
  };

  const goPrivate = (isHost: boolean) => {
    if (!username) return alert("Please enter a username first");
    setViewMode('private');
    if (!isHost) {
      if (!roomId) return alert("Enter Room ID to join");
      peerEngine.connectToPeer(roomId.toUpperCase(), { senderName: username, type: 'room-join' });
      setStatus('connecting');
    }
  };

  const requestPrivateChat = (remoteId: string, remoteName: string) => {
    if (!username) return alert("Please enter a username first");
    if (!remoteId) return alert("This user has an invalid connection ID.");
    if (remoteId === myId) return alert("You cannot private chat with yourself!");

    peerEngine.connectToPeer(remoteId, { senderName: username, type: 'public-invite' });
    setRemoteUsername(remoteName);
    setViewMode('private');
    setStatus('connecting');
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    if (isSpam(inputText)) {
      alert("Anti-Spam active: Links or phone numbers are not allowed.");
      setInputText('');
      return;
    }

    if (!rateLimiter.current.checkLimit()) {
      alert("Slow down! You are sending messages too fast.");
      return;
    }

    const msg = {
      id: uuidv4(),
      senderId: myId,
      senderName: username,
      type: 'text',
      text: inputText,
      timestamp: Date.now(),
      status: 'delivered',
      replyToId: replyingTo?.id,
      replyText: replyingTo?.text || "Voice/Image"
    } as any;

    peerEngine.sendMessage(msg);
    setMessages(prev => {
      const updated = [...prev, msg];
      const remotePeerId = peerEngine.connection?.peer;
      if (remotePeerId) {
        localStorage.setItem(`malluchat_private_messages_${remotePeerId}`, JSON.stringify(updated));
      }
      return updated;
    });
    setInputText('');
    setReplyingTo(null);
    peerEngine.sendMessage({ id: uuidv4(), senderId: myId, senderName: username, type: 'typing_stop', timestamp: Date.now() } as any);
    sentSound.play().catch(() => { });
  };

  const handleSendPublic = () => {
    if (!publicInput.trim()) return;
    if (isSpam(publicInput)) return alert("Spam blocked.");
    if (!rateLimiter.current.checkLimit()) return alert("Slow down.");

    const msg = {
      id: uuidv4(),
      senderId: myId,
      senderName: username,
      type: 'text',
      text: publicInput,
      timestamp: Date.now(),
      replyToId: replyingTo?.id,
      replyText: replyingTo?.text || "Voice/Image"
    };

    setPublicMessages(prev => {
      const updated = [...prev, msg];
      localStorage.setItem('malluchat_public_messages', JSON.stringify(updated));
      return updated;
    });
    fetch(POST_URL, {
      method: 'POST',
      body: JSON.stringify(msg)
    }).catch(() => { });

    setPublicInput('');
    setReplyingTo(null);
  };

  const handleSendAd = () => {
    if (adType === 'custom' && !adText.trim()) return alert('Ad text is required');

    const adMsg = {
      id: uuidv4(),
      senderId: 'system-ad',
      senderName: adSponsor || 'Sponsor',
      type: adType === 'google' ? 'google-ad' : 'ad',
      text: adType === 'google' ? '' : (adLinkUrl ? `<a href="${adLinkUrl}" target="_blank" style="color: var(--primary); text-decoration: underline;">${adText}</a>` : adText),
      adImageUrl: adType === 'google' ? undefined : (adImageUrl || undefined),
      timestamp: Date.now()
    } as any;

    setPublicMessages(prev => {
      const updated = [...prev, adMsg];
      localStorage.setItem('malluchat_public_messages', JSON.stringify(updated));
      return updated;
    });
    fetch(POST_URL, {
      method: 'POST',
      body: JSON.stringify(adMsg)
    }).catch(() => { });

    alert('Ad Broadcasted successfully!');
    window.location.hash = '';
    setAdText('');
    setAdImageUrl('');
    setAdLinkUrl('');
    setAdSponsor('Sponsor');
  };

  const handleAdminLogin = () => {
    // Basic verification logic
    if (adminEmail === 'admin@malluchat.live' && adminPassword === 'Admin@123') {
      setIsAdminAuth(true);
      setShowAdminLogin(false);
      setShowAdminPanel(true);
    } else {
      alert("Invalid admin credentials");
    }
  };

  const handleReaction = (msgId: string) => {
    const reactionMsg = { id: uuidv4(), senderId: myId, senderName: username, type: 'reaction', targetId: msgId, reaction: '❤️', timestamp: Date.now() } as any;
    peerEngine.sendMessage(reactionMsg);
    setMessages(prev => {
      const updated = prev.map(m => m.id === msgId ? { ...m, reaction: '❤️' } : m);
      const remotePeerId = peerEngine.connection?.peer;
      if (remotePeerId) {
        localStorage.setItem(`malluchat_private_messages_${remotePeerId}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const initiateCall = async (isVideo: boolean = false) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: isVideo });
      // we use the actual connected peer id
      const remoteId = peerEngine.connection?.peer;
      if (!remoteId) return alert('No active peer connected');

      const call = await peerEngine.startCall(remoteId, stream, { metadata: { callType: isVideo ? 'private-video' : 'private-voice' } });

      if (call) {
        call.on('stream', (rStream) => {
          setRemoteStream(rStream);
        });
        setInCall(true);
      }
    } catch (err) {
      alert("Microphone permission required for calls.");
    }
  };

  const toggleMute = () => {
    if (peerEngine.localStream) {
      const track = peerEngine.localStream.getAudioTracks()[0];
      if (track) {
        track.enabled = !track.enabled;
        setIsMicMuted(!track.enabled);
      }
    }
  };


  const toggleCamera = () => {
    if (peerEngine.localStream) {
      const vTrack = peerEngine.localStream.getVideoTracks()[0];
      if (vTrack) {
        vTrack.enabled = !vTrack.enabled;
        setIsCameraOff(!vTrack.enabled);
      }
    }
  };

  const toggleLoudspeaker = () => {
    alert("Loudspeaker mode activated!");
    // Note: setSinkId is not widely supported yet without specialized permissions.
  };

  const scrollToMessage = (msgId: string) => {
    const element = document.getElementById(`msg-${msgId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const bubble = element.querySelector('.message-bubble');
      if (bubble) {
        bubble.classList.remove('highlighted');
        // Trigger reflow to restart animation
        void (bubble as HTMLElement).offsetWidth;
        bubble.classList.add('highlighted');
      }
    }
  };


  // ======== RENDERS ======== 
  return (
    <main className="app-layout">
      {/* Call Connecting Overlay */}
      {activeCallingUser && !showPaywall && (
        <div className="ring-overlay">
          <div className="ring-radar">
            <div className="radar-wave"></div>
            <div className="radar-wave"></div>
            <div className="radar-wave"></div>
            <div className="ring-avatar">
              {activeCallingUser.avatar}
            </div>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Calling {activeCallingUser.name}...
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
            Establishing secure encrypted line
          </p>
          <button 
            className="call-ctrl-btn end" 
            onClick={handleCancelCall} 
            title="Cancel Call"
            style={{ width: '60px', height: '60px' }}
          >
            <PhoneOff size={24} />
          </button>
        </div>
      )}

      {/* Paywall Subscription Modal */}
      {showPaywall && activeCallingUser && (
        <div className="paywall-overlay">
          <div className="paywall-card">
            <button 
              className="icon-btn" 
              style={{ position: 'absolute', top: '15px', right: '15px' }} 
              onClick={handleCancelCall}
            >
              <X size={20} />
            </button>
            <div className="paywall-crown">
              <Crown size={36} />
            </div>
            <h3>{paywallTriggerReason === 'filter' ? 'Unlock Gender Filtering' : 'Unlock Match Calling'}</h3>
            <p>
              {paywallTriggerReason === 'filter' 
                ? 'Unlock Female & Male gender filters to call exactly who you want.'
                : <>Connect with <span className="paywall-badge-title">{activeCallingUser.name}</span> and other nearby users instantly.</>}
            </p>

            {/* Plans Selection Grid */}
            <div className="plans-grid">
              {[
                { amount: 10, duration: '1 Day', label: 'Trial Pack', type: 'standard', badge: '' },
                { amount: 20, duration: '1 Week', label: 'Weekly Pass', type: 'popular', badge: '' },
                { amount: 30, duration: '1 Month', label: 'Monthly Premium', type: 'vip', badge: '👑 Popular' }
              ].map((plan) => (
                <div 
                  key={plan.amount}
                  className={`plan-card ${plan.type} ${selectedPlan?.amount === plan.amount ? 'active' : ''}`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.badge && (
                    <div className={`card-badge ${plan.type}-badge`}>
                      {plan.badge}
                    </div>
                  )}
                  <div className="plan-card-duration">{plan.duration}</div>
                  <div className="plan-card-price">₹{plan.amount}</div>
                  <div className="plan-card-label">{plan.label}</div>
                </div>
              ))}
            </div>

            {/* Payment VPA Settings Panel (collapsible developer option) */}
            <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'left' }}>
              <button 
                onClick={() => setShowPaymentSettings(!showPaymentSettings)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '0.75rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showPaymentSettings ? 'Hide Payment Settings' : 'Payment Settings (Change UPI ID)'}
              </button>
              
              {showPaymentSettings && (
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '12px',
                  marginTop: '8px',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Receiver UPI ID (VPA) for testing:
                  </label>
                  <input 
                    type="text" 
                    value={targetUpiId}
                    onChange={(e) => setTargetUpiId(e.target.value.trim())}
                    placeholder="Enter UPI ID (e.g. name@okaxis)"
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px',
                      fontSize: '0.8rem',
                      color: 'var(--text-main)',
                      outline: 'none'
                    }}
                  />
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Change this to your own personal UPI VPA (e.g. `yourname@paytm`) to verify the links and QR codes work.
                  </div>
                </div>
              )}
            </div>

            {selectedPlan && (
              <div className="payment-details-panel">
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '4px', fontWeight: 700 }}>
                  Step 1: Scan the QR Code to Pay
                </div>
                <div style={{ fontSize: '0.8rem', color: '#fbbf24', marginBottom: '14px', fontWeight: 600 }}>
                  ⚠️ Pay exactly ₹{selectedPlan.amount} (Transaction will show ₹{selectedPlan.amount})
                </div>

                {/* Collapsible QR Code Section */}
                <div className="qr-collapse-container">
                  <button 
                    className="qr-collapse-header"
                    onClick={() => setShowQrCode(!showQrCode)}
                    style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <span>{showQrCode ? 'Hide QR Code' : 'Scan QR (Pay from another device)'}</span>
                    <span>{showQrCode ? '▲' : '▼'}</span>
                  </button>
                  {showQrCode && (
                    <div className="qr-collapse-body">
                      <div className="qr-code-box">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(
                            `upi://pay?pa=${targetUpiId}&pn=MalluChat&mc=5734&tr=${currentTxnId}&am=${selectedPlan.amount}&cu=INR&tn=MalluChat%20Plan%20${selectedPlan.label}`
                          )}`} 
                          alt="UPI QR Code" 
                          className="qr-code-img"
                        />
                      </div>
                      <button 
                        className="qr-download-btn"
                        onClick={() => downloadUpiQrCode(selectedPlan.amount, selectedPlan.label, currentTxnId)}
                      >
                        <Download size={14} /> Download QR Code
                      </button>
                    </div>
                  )}
                </div>

                {/* Copy UPI VPA Option */}
                <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', textAlign: 'left', fontWeight: 600 }}>
                    Or manually transfer to UPI ID:
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                    <div style={{
                      flex: 1,
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      fontFamily: 'monospace',
                      color: 'var(--text-main)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {targetUpiId}
                    </div>
                    <button
                      onClick={handleCopyUpi}
                      style={{
                        background: copiedUpi ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: copiedUpi ? 'black' : 'var(--text-main)',
                        padding: '8px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Copy size={14} /> {copiedUpi ? 'Copied!' : 'Copy ID'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedPlan && (
              <div className="verification-section">
                <h4>Upload Payment Screenshot</h4>
                {!paymentScreenshot ? (
                  <label className="upload-zone">
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setScreenshotFileName(file.name);
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setPaymentScreenshot(event.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Upload className="upload-icon" size={24} />
                    <div className="upload-zone-text">Click to upload or drag screenshot here</div>
                  </label>
                ) : (
                  <div className="screenshot-preview-container">
                    <img src={paymentScreenshot} alt="Payment screenshot preview" className="screenshot-preview" />
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', wordBreak: 'break-all' }}>
                      {screenshotFileName}
                    </div>
                    <button 
                      className="remove-screenshot-btn"
                      onClick={() => {
                        setPaymentScreenshot(null);
                        setScreenshotFileName('');
                        setVerificationSubmitted(false);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}

                <button 
                  className="submit-verify-btn"
                  disabled={!paymentScreenshot || verificationSubmitted}
                  onClick={handleVerifyPayment}
                  style={{
                    background: paymentScreenshot ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    color: paymentScreenshot ? 'black' : 'var(--text-muted)'
                  }}
                >
                  {isVerifyingPayment ? 'Verifying transaction...' : 'Submit Payment Verification'}
                </button>

                {verificationSubmitted && (
                  <div className="payment-warning-alert">
                    <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>
                      {isVerifyingPayment 
                        ? 'Verifying transaction with UPI gateway, please wait...' 
                        : 'Your payment will be confirmed within 24 hours. Please send the screenshot properly or send the original payment screenshot.'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Left Sidebar (Desktop/Tablet) */}
      <div className="sidebar-left glass">
        <div className="sidebar-header">
          <MalluLogo size={36} />
          <h2>MalluChat</h2>
        </div>

        <nav className="desktop-nav">
          <div className={`nav-item-desktop ${viewMode === 'public' ? 'active' : ''}`} onClick={() => setViewMode('public')}>
            <Users size={20} />
            World Chat
          </div>
          <div className={`nav-item-desktop ${viewMode === 'random' ? 'active' : ''}`} onClick={() => {
            if (!username) {
              setShowLoginModal(true);
              return;
            }
            setViewMode('random');
          }}>
            <Shuffle size={20} />
            Random Calling
          </div>
          <div className={`nav-item-desktop ${viewMode === 'private' ? 'active' : ''}`} onClick={() => {
            if (!username && viewMode === 'public') {
              setShowLoginModal(true);
              return;
            }
            setViewMode('private');
          }}>
            <Lock size={20} />
            Private Space
          </div>
          {!isApp && (
            <a className="nav-item-desktop" href="/malluchat.apk" download="malluchat.apk" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '10px', paddingTop: '15px' }}>
              <Download size={20} />
              Get Android App
            </a>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="header-status" style={{ padding: '0 1rem' }}>
            <span className="status-dot"></span>
            {viewMode === 'public'
              ? `${liveUsers} Online right now`
              : (status === 'connected' ? 'Secure Connect' : 'Waiting...')}
          </div>
        </div>
      </div>

      <div className="chat-main-container">

        {/* Login Modal */}
        {showLoginModal && (
          <div className="call-overlay" style={{ zIndex: 2000 }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', maxWidth: '350px', width: '90%', textAlign: 'center', position: 'relative' }}>
              <button
                className="icon-btn"
                style={{ position: 'absolute', top: '15px', right: '15px' }}
                onClick={() => setShowLoginModal(false)}
              >
                <X size={20} />
              </button>
              <h2 style={{ marginBottom: '1rem' }}>Join the Chat</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Choose a display name to start chatting anonymously.</p>
              <input
                className="input-field"
                placeholder="Enter display name..."
                value={username}
                onChange={e => setUsername(e.target.value)}
                maxLength={20}
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter' && username.trim()) setShowLoginModal(false);
                }}
              />
              <button
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
                disabled={!username.trim()}
                onClick={() => setShowLoginModal(false)}
              >
                Start Chatting
              </button>
              <p style={{ marginTop: '1.2rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                By continuing, you agree to our <br /><a href="terms" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Terms & Conditions</a> and <a href="privacy" target="_blank" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Privacy Policy</a>.
              </p>
            </div>
          </div>
        )}

        {/* Admin Login Modal */}
        {showAdminLogin && !isAdminAuth && (
          <div className="call-overlay" style={{ zIndex: 3000 }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', maxWidth: '350px', width: '90%', textAlign: 'center', position: 'relative' }}>
              <button
                className="icon-btn"
                style={{ position: 'absolute', top: '15px', right: '15px' }}
                onClick={() => { window.location.hash = ''; setShowAdminLogin(false) }}
              >
                <X size={20} />
              </button>
              <h2 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Admin Login</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Enter credentials to access the broadcast panel.</p>
              <input
                className="input-field"
                type="email"
                placeholder="Admin Email"
                value={adminEmail}
                onChange={e => setAdminEmail(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <input
                className="input-field"
                type="password"
                placeholder="Admin Password"
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleAdminLogin();
                }}
              />
              <button
                className="btn btn-primary"
                style={{ marginTop: '1rem', width: '100%' }}
                onClick={handleAdminLogin}
              >
                Secure Login
              </button>
            </div>
          </div>
        )}

        {/* Admin Panel Modal */}
        {showAdminPanel && (
          <div className="call-overlay" style={{ zIndex: 3000 }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', maxWidth: '400px', width: '90%', textAlign: 'left', position: 'relative' }}>
              <button
                className="icon-btn"
                style={{ position: 'absolute', top: '15px', right: '15px' }}
                onClick={() => { window.location.hash = ''; setShowAdminPanel(false) }}
              >
                <X size={20} />
              </button>
              <h2 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>Admin Control Panel</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Send a sponsored broadcast ad or Google Ad directly into the chat stream.</p>

              <div style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
                <button
                  className={`btn ${adType === 'custom' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1, margin: 0, padding: '0.5rem' }}
                  onClick={() => setAdType('custom')}
                >Custom</button>
                <button
                  className={`btn ${adType === 'google' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1, margin: 0, padding: '0.5rem' }}
                  onClick={() => setAdType('google')}
                >Google AdSense</button>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sponsor Name</label>
                <input className="input-field" value={adSponsor} onChange={e => setAdSponsor(e.target.value)} placeholder="e.g. System, Admin, Surfshark" />
              </div>

              {adType === 'custom' ? (
                <>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ad Text (HTML supported)</label>
                    <textarea className="input-field" value={adText} onChange={e => setAdText(e.target.value)} placeholder="Wait! Secure your internet connection..." style={{ minHeight: '80px', resize: 'vertical' }} />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hyperlink URL</label>
                    <input className="input-field" value={adLinkUrl} onChange={e => setAdLinkUrl(e.target.value)} placeholder="https://..." />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Image URL (Optional)</label>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <input className="input-field" value={adImageUrl} onChange={e => setAdImageUrl(e.target.value)} placeholder="https://..." />
                      <label className="icon-btn" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '0 10px', background: 'rgba(255,255,255,0.1)' }}>
                        Upload
                        <input type="file" style={{ display: 'none' }} accept="image/*" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setAdImageUrl('Uploading...');
                            const form = new FormData();
                            form.append('file', file);
                            fetch('https://tmpfiles.org/api/v1/upload', {
                              method: 'POST',
                              body: form
                            })
                              .then(res => res.json())
                              .then(data => {
                                const directUrl = data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
                                setAdImageUrl(directUrl);
                              })
                              .catch(() => {
                                alert('Failed to upload ad image.');
                                setAdImageUrl('');
                              });
                          }
                        }} />
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ marginBottom: '1rem', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--panel-border)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Google AdSense will be injected as a native-looking message. Make sure your AdSense account is active for <strong>ca-pub-8351044334296545</strong>.
                  </p>
                </div>
              )}

              <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSendAd}>
                Broadcast {adType === 'google' ? 'Google Ad' : 'Ad'} to General Chat
              </button>
            </div>
          </div>
        )}

        {/* Incoming Chat Request Notification */}
        {incomingChatRequest && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 2000,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--panel-border)',
            borderRadius: '16px',
            padding: '1.5rem',
            maxWidth: '350px',
            width: 'calc(100% - 40px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            animation: 'slideIn 0.3s ease-out forwards'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>Chat Request</h3>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <strong>{incomingChatRequest.metadata?.senderName || 'Someone'}</strong> wants to connect securely.
                </p>
              </div>
              <div style={{ padding: '6px', background: 'rgba(74, 222, 128, 0.1)', color: 'var(--primary)', borderRadius: '50%' }}>
                <LinkIcon size={20} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-secondary" style={{ flex: 1, margin: 0, padding: '0.6rem', fontSize: '0.9rem' }}
                onClick={() => {
                  incomingChatRequest.conn.close();
                  peerEngine.sendDeclineRequest(incomingChatRequest.conn.peer, { type: 'decline', senderName: username });
                  setIncomingChatRequest(null);
                }}
              >
                Decline
              </button>
              <button
                className="btn btn-primary" style={{ flex: 1, margin: 0, padding: '0.6rem', fontSize: '0.9rem' }}
                onClick={() => {
                  peerEngine.setupConnection(incomingChatRequest.conn);
                  setRemoteUsername(incomingChatRequest.metadata?.senderName || 'User');
                  setViewMode('private');
                  setStatus('connected');
                  setIncomingChatRequest(null);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        )}

        {/* Call Overlay Interface */}
        {inCall && (
          <div className="call-overlay" style={{ background: '#000', padding: 0 }}>
            {activeCallingUser && activeCallingUser.id?.startsWith('demo-') ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <div className="simulated-remote-feed" style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #1f2937, #111827)'
                }}>
                  <div className="call-avatar-large" style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    color: '#000',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(74, 222, 128, 0.4)',
                    animation: 'pulse 2s infinite',
                    marginBottom: '1rem'
                  }}>
                    {activeCallingUser.avatar}
                  </div>
                  <h2 style={{ color: 'white', marginBottom: '0.2rem' }}>{activeCallingUser.name}</h2>
                  <div className="call-duration" style={{ color: 'var(--primary)', fontSize: '1rem', fontFamily: 'monospace' }}>
                    {formatCallTime(callDuration)}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    Connected via secure P2P line
                  </p>
                </div>
                
                {/* Local camera preview */}
                <video ref={localVideoRef} autoPlay playsInline muted style={{ position: 'absolute', top: '20px', right: '20px', width: '100px', height: '140px', objectFit: 'cover', borderRadius: '12px', border: '2px solid white', display: isCameraOff ? 'none' : 'block', transform: 'scaleX(-1)' }} />

                {/* Call controls */}
                <div className="call-controls" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
                  <button className={`call-ctrl-btn ${isMicMuted ? 'active' : ''}`} onClick={toggleMute} title="Mute Mic">
                    {isMicMuted ? <MicOff size={28} /> : <Mic size={28} />}
                  </button>
                  <button className="call-ctrl-btn" style={{ background: isCameraOff ? 'var(--danger)' : 'rgba(255,255,255,0.2)' }} onClick={toggleCamera} title="Toggle Camera">
                    {isCameraOff ? <VideoOff size={28} /> : <Video size={28} />}
                  </button>
                  <button className="call-ctrl-btn end" onClick={handleEndCall} title="End Call">
                    <PhoneOff size={28} />
                  </button>
                </div>
              </div>
            ) : peerEngine.localStream?.getVideoTracks().length || remoteStream?.getVideoTracks().length ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', width: '100%', height: '100%' }}>
                <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <video ref={localVideoRef} autoPlay playsInline muted style={{ position: 'absolute', top: '20px', right: '20px', width: '100px', height: '140px', objectFit: 'cover', borderRadius: '12px', border: '2px solid white', display: isCameraOff ? 'none' : 'block', transform: 'scaleX(-1)' }} />

                <div className="call-controls" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
                  <button className={`call-ctrl-btn ${isMicMuted ? 'active' : ''}`} onClick={toggleMute} title="Mute Mic">
                    {isMicMuted ? <MicOff size={28} /> : <Mic size={28} />}
                  </button>
                  <button className="call-ctrl-btn" style={{ background: isCameraOff ? 'var(--danger)' : 'rgba(255,255,255,0.2)' }} onClick={toggleCamera} title="Toggle Camera">
                    {isCameraOff ? <VideoOff size={28} /> : <Video size={28} />}
                  </button>
                  <button className="call-ctrl-btn end" onClick={handleEndCall} title="End Call">
                    <PhoneOff size={28} />
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div className="call-avatar-large">
                  <MalluLogo size={80} />
                </div>
                <h2 style={{ marginBottom: '0.5rem' }}>Secure Voice Call</h2>
                <p style={{ color: 'var(--text-muted)' }}>Secure Channel Active</p>

                <div className="call-controls">
                  <button className={`call-ctrl-btn ${isMicMuted ? 'active' : ''}`} onClick={toggleMute} title="Mute Mic">
                    <MicOff size={28} />
                  </button>
                  <button className="call-ctrl-btn end" onClick={handleEndCall} title="End Call">
                    <PhoneOff size={28} />
                  </button>
                  <button className="call-ctrl-btn" onClick={toggleLoudspeaker} title="Loudspeaker">
                    <Volume2 size={28} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="chat-screen">
          {/* Header */}
          <div className="chat-header">
            <div className="header-user-info">
              <div className="avatar">
                <MalluLogo size={32} />
              </div>
              <div style={{ marginLeft: '6px' }}>
                {viewMode === 'private' ? (
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary)' }}>
                    {remoteUsername}
                  </div>
                ) : (
                  <div style={{ fontWeight: 600 }}>
                    {viewMode === 'public' 
                      ? 'Mallu Public Chat' 
                      : 'Quick Match Calling'}
                  </div>
                )}
                <div className="header-status">
                  <span className="status-dot"></span>
                  {viewMode === 'public'
                    ? `${liveUsers} Online right now`
                    : viewMode === 'random'
                    ? `${demoUsers.filter(p => p.status === 'online').length} nearby active users`
                    : (status === 'connected' ? 'Secure Connect' : 'Waiting for User...')}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {viewMode === 'private' && status === 'connected' && (
                <>
                  <button className={`icon-btn ${inCall ? 'active' : ''}`} onClick={() => initiateCall(true)} title="Secure Video Call">
                    <Video size={20} />
                  </button>
                  <button className={`icon-btn ${inCall ? 'active' : ''}`} onClick={() => initiateCall(false)} title="Secure Voice Call">
                    <Phone size={20} />
                  </button>
                </>
              )}
              {viewMode === 'private' && (
                <button className="icon-btn" onClick={() => { setViewMode('public'); handleEndCall(); setMessages([]); }} title="Leave">
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Random Calling View */}
          {viewMode === 'random' && (
            <div className="random-call-container">
              <div className="random-call-header">
                <h2>Find Your Match</h2>
                <p>Call and talk with Kerala users instantly. End-to-end secure anonymous connections.</p>
              </div>



              {/* Start Random Call Action */}
              <div className="quick-random-action-container">
                <button 
                  className="quick-random-call-btn"
                  onClick={handleStartRandomCall}
                >
                  <Shuffle size={18} className="pulse-icon" style={{ marginRight: '6px' }} />
                  <span>Start Random Call Now</span>
                </button>
              </div>

              {/* Filters Bar */}
              <div className="match-filters-bar">
                <div className="filter-section">
                  <span className="filter-label">Filter:</span>
                  <div className="filter-options">
                    <button 
                      className={`filter-btn ${genderFilter === 'female' ? 'active' : ''}`}
                      onClick={() => handleSelectGenderFilter('female')}
                    >
                      Females {!isPremium && <Crown size={12} style={{ display: 'inline', marginLeft: '4px', color: '#fbbf24', verticalAlign: 'middle' }} />}
                    </button>
                    <button 
                      className={`filter-btn ${genderFilter === 'male' ? 'active' : ''}`}
                      onClick={() => handleSelectGenderFilter('male')}
                    >
                      Males {!isPremium && <Crown size={12} style={{ display: 'inline', marginLeft: '4px', color: '#fbbf24', verticalAlign: 'middle' }} />}
                    </button>
                    <button 
                      className={`filter-btn ${genderFilter === 'all' ? 'active' : ''}`}
                      onClick={() => handleSelectGenderFilter('all')}
                    >
                      Both
                    </button>
                  </div>
                </div>
              </div>

              {/* Matches List Grid */}
              <div className="matches-grid">
                {demoUsers.filter(profile => {
                  const matchesGender = genderFilter === 'all' || profile.gender === genderFilter;
                  return matchesGender;
                }).map((profile, idx) => {
                  const distance = userCoords 
                    ? calculateDistance(userCoords.lat, userCoords.lon, userCoords.lat + profile.latOffset, userCoords.lon + profile.lonOffset)
                    : profile.defaultDist;
                  const isOnline = profile.status === 'online';
                  const locationText = getProfileLocation(idx, detectedCity, distance);

                  return (
                    <div key={profile.id} className="match-card glass">
                      <div className={`match-avatar-container ${isOnline ? 'online' : ''}`}>
                        <div className="match-avatar">
                          {profile.avatar}
                        </div>
                        <span className="match-status-indicator"></span>
                      </div>
                      
                      <div className="match-info">
                        <div className="match-name-row">
                          <span className="match-name">{profile.name}</span>
                        </div>
                        <div className="match-location">
                          <span>{locationText}</span>
                          <span>•</span>
                          <span className="match-distance">{distance} km away</span>
                        </div>
                      </div>

                      <button 
                        className="match-call-btn"
                        onClick={() => handleCallDemoUser(profile)}
                        title={`Call ${profile.name}`}
                      >
                        <Phone size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Waiting Room State (Private only) */}
          {viewMode === 'private' && status !== 'connected' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', textAlign: 'center', maxWidth: '300px' }}>
                <LinkIcon size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ marginBottom: '1rem' }}>{status === 'connecting' ? `Connecting to ${remoteUsername}...` : 'Your Room is Ready'}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  {status === 'connecting' ? 'Waiting for them to accept your request...' : 'Send this exact code to your friend to securely connect.'}
                </p>
                {status !== 'connecting' && (
                  <div className="share-container">
                    <div className="share-link" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>{myId || '...'}</div>
                    <button className="copy-btn" onClick={() => navigator.clipboard.writeText(myId)} style={{ marginTop: '0.5rem' }}>
                      <Copy size={14} style={{ display: 'inline', marginRight: '4px' }} /> Copy Code
                    </button>
                  </div>
                )}

                {status !== 'connecting' && (
                  <div style={{ marginTop: '2rem', width: '100%' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Or Join a Friend</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        className="input-field"
                        placeholder="Code (e.g. A48FXY)"
                        value={roomId}
                        onChange={e => setRoomId(e.target.value.toUpperCase())}
                        style={{ padding: '0.6rem', flex: 1 }}
                        maxLength={6}
                      />
                      <button className="btn btn-primary" style={{ padding: '0.6rem 1rem', width: 'auto', margin: 0 }} onClick={() => {
                        if (!username) { setShowLoginModal(true); return; }
                        if (!roomId) { alert("Enter code"); return; }
                        goPrivate(false);
                      }}>
                        Join
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {(viewMode === 'public' || status === 'connected') && (
            <div className="chat-messages" style={{ paddingBottom: '10px' }}>
              <div className="system-message">
                {viewMode === 'public'
                  ? 'Welcome to Mallu Public Chat. Anyone can see messages here.'
                  : 'Secure Connection Established. Messages are direct and not stored anywhere.'}
              </div>

              {(viewMode === 'private' ? messages : publicMessages).map((msg, idx) => {
                if (msg.type === 'system') {
                  return <div key={idx} className="system-message">{msg.text}</div>;
                }

                const isMine = msg.senderId === myId;
                return (
                  <motion.div
                    key={msg.id}
                    id={`msg-${msg.id}`}
                    className={`message-wrapper ${isMine ? 'msg-sent' : 'msg-received'}`}
                    onDoubleClick={() => viewMode === 'private' && !isMine && handleReaction(msg.id)}
                    style={{ cursor: (!isMine && viewMode === 'private') ? 'pointer' : 'default' }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 50) {
                        setReplyingTo(msg);
                      }
                    }}
                  >
                    <div className="message-bubble">
                      {msg.replyToId && (
                        <div className="reply-context" onClick={() => scrollToMessage(msg.replyToId!)} style={{ cursor: 'pointer' }}>
                          <Reply size={12} style={{ marginRight: '4px', display: 'inline' }} />
                          <i>{msg.replyText}</i>
                        </div>
                      )}

                      {msg.type === 'text' && msg.text}
                      {msg.type === 'voice' && (
                        <CustomAudioPlayer src={msg.voiceBlob} isMine={isMine} />
                      )}
                      {msg.type === 'ad' && (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Sponsored</span>
                            <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Ad</span>
                          </div>
                          {msg.adImageUrl && (
                            <img src={msg.adImageUrl} alt="Sponsored" style={{ width: '100%', borderRadius: '8px', marginBottom: '8px', objectFit: 'cover' }} />
                          )}
                          <div dangerouslySetInnerHTML={{ __html: msg.text || '' }} style={{ fontSize: '0.95rem' }} />
                        </div>
                      )}

                      {msg.type === 'google-ad' && (
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 'min(300px, 70vw)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Sponsored</span>
                            <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Google Ad</span>
                          </div>
                          <GoogleAdMessage />
                        </div>
                      )}

                      {msg.reaction && (
                        <div style={{ position: 'absolute', bottom: '-10px', right: isMine ? 'auto' : '-10px', left: isMine ? '-10px' : 'auto', background: 'var(--panel-bg)', borderRadius: '50%', padding: '2px', fontSize: '12px', border: '1px solid var(--panel-border)' }}>
                          {msg.reaction}
                        </div>
                      )}
                    </div>
                    <div className="message-time">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {!isMine && msg.type !== 'ad' && (
                        <span
                          style={{
                            marginLeft: '4px',
                            cursor: viewMode === 'public' ? 'pointer' : 'default',
                            textDecoration: viewMode === 'public' ? 'underline' : 'none'
                          }}
                          onClick={() => {
                            if (viewMode === 'public') {
                              requestPrivateChat(msg.senderId, msg.senderName);
                            }
                          }}
                        >
                          <span style={{ opacity: 0.6 }}> • </span>
                          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--username-color)' }}>
                            {msg.senderName}
                          </span>
                          {viewMode === 'public' && <span style={{ fontSize: '0.6rem', marginLeft: '2px', color: 'var(--primary)', fontWeight: 'bold' }}>(Private Chat)</span>}
                        </span>
                      )}
                      {isMine && viewMode === 'private' && (
                        <span className={`msg-status ${msg.status === 'read' ? 'msg-read' : ''}`}>
                          {msg.status === 'read' ? <CheckCheck size={14} /> : <CheckCheck size={14} opacity={0.5} />}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )
              })}

              {remoteTyping && viewMode === 'private' && (
                <div className="message-wrapper msg-received" style={{ opacity: 0.7 }}>
                  <div className="message-bubble" style={{ padding: '0.4rem 1rem', display: 'flex', gap: '4px' }}>
                    <span className="status-dot"></span>
                    <span className="status-dot" style={{ animationDelay: '0.2s' }}></span>
                    <span className="status-dot" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}

              <div ref={viewMode === 'public' ? publicMessagesEndRef : messagesEndRef} />
            </div>
          )}

          {/* Chat Input */}
          {(viewMode === 'public' || status === 'connected') && (
            <div className="chat-input-area" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              {replyingTo && (
                <div className="reply-context" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span>Replying to: <i>{replyingTo.text || 'Voice Message'}</i></span>
                  <X size={14} style={{ cursor: 'pointer' }} onClick={() => setReplyingTo(null)} />
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {isRecording ? (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: 'bold' }}>
                    <button className="icon-btn" onClick={cancelRecording} title="Cancel Recording" style={{ background: 'rgba(239, 68, 68, 0.15)', color: 'var(--danger)', padding: '10px', borderRadius: '50%' }}>
                      <Trash2 size={20} />
                    </button>
                    <span className="pulse-green" style={{ background: 'var(--danger)' }}></span>
                    <span style={{ flex: 1 }}>
                      {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Tap Send to stop</span>
                  </div>
                ) : (
                  <>
                    <button className="icon-btn" style={{ padding: '8px' }} onClick={() => alert('Attachments coming soon!')}>
                      <Plus size={22} />
                    </button>
                    <input
                      type="text"
                      className="chat-input"
                      placeholder={viewMode === 'public' ? "Send to public..." : "Type a secure message..."}
                      value={viewMode === 'public' ? publicInput : inputText}
                      onFocus={() => {
                        if (viewMode === 'public' && !username) {
                          setShowLoginModal(true);
                        }
                      }}
                      onChange={e => {
                        if (viewMode === 'public') {
                          setPublicInput(e.target.value);
                        } else {
                          setInputText(e.target.value);
                          handleStartTyping();
                        }
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          if (!username && viewMode === 'public') {
                            setShowLoginModal(true);
                          } else {
                            if (viewMode === 'public') { handleSendPublic(); } else { handleSend(); }
                          }
                        }
                      }}
                    />
                  </>
                )}

                {(viewMode === 'public' ? publicInput : inputText) ? (
                  <button
                    className="send-btn"
                    onClick={() => {
                      if (!username) { setShowLoginModal(true); return; }
                      if (viewMode === 'public') { handleSendPublic(); } else { handleSend(); }
                    }}
                  >
                    <Send size={20} />
                  </button>
                ) : (
                  <button
                    className="send-btn"
                    onClick={isRecording ? stopRecordingAndSend : startRecording}
                    style={isRecording ? { background: 'var(--primary)', color: '#000' } : { background: 'var(--panel-bg)', color: 'var(--text-main)', border: '1px solid var(--panel-border)' }}
                    title={isRecording ? "Send Voice Message" : "Record Voice Message"}
                  >
                    {isRecording ? <Send size={20} /> : <Mic size={20} />}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Bottom Navigation Bar */}
          <div className="bottom-bar-nav">
            <div className={`nav-item ${viewMode === 'public' ? 'active' : ''}`} onClick={() => setViewMode('public')}>
              <Users size={24} />
              World
            </div>
            <div className={`nav-item ${viewMode === 'random' ? 'active' : ''}`} onClick={() => {
              if (!username) {
                setShowLoginModal(true);
                return;
              }
              setViewMode('random');
            }}>
              <Shuffle size={24} />
              Call Match
            </div>
            {!isApp && (
              <a className="nav-item" href="/malluchat.apk" download="malluchat.apk" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                <Download size={24} />
                App
              </a>
            )}
            <div className={`nav-item ${viewMode === 'private' ? 'active' : ''}`} onClick={() => {
              if (!username && viewMode === 'public') {
                setShowLoginModal(true);
                return;
              }
              setViewMode('private');
            }}>
              <Lock size={24} />
              Private Space
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar (Desktop only) */}
      <div className="sidebar-right glass">
        <div className="sidebar-header">
          <h2 style={{ fontSize: '1.1rem' }}>Room Info</h2>
        </div>
        <div style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>
          <p>You are currently in <strong>{viewMode === 'public' ? 'World Chat' : 'Private Space'}</strong>.</p>

          <div style={{ marginTop: '2rem', padding: '1.2rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', border: '1px solid var(--panel-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Sponsored</span>
              <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', color: 'var(--primary)' }}>Promo</span>
            </div>
            <div style={{ background: 'white', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src="https://twingle.online/twingle-logo.png" alt="Twingle Logo" style={{ height: '40px', objectFit: 'contain' }} />
            </div>
            <div style={{ fontSize: '0.85rem', lineHeight: '1.5', textAlign: 'center', color: 'var(--text-main)' }}>
              <strong>FREE MALLU DATING APP</strong>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>Find love, marriage, and friendship in Kerala.</div>
            </div>
            <a href="https://twingle.online" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', background: 'var(--primary)', color: 'black', fontWeight: 'bold', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '0.85rem' }}>
              Visit twingle.online
            </a>
          </div>

          <div style={{ marginTop: '2rem', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--panel-border)', paddingTop: '1rem' }}>
            <a href="terms" target="_blank" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Terms & Conditions</a>
            <a href="privacy" target="_blank" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Privacy Policy</a>
            <a href="aup" target="_blank" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Acceptable Use Policy</a>
            <a href="disclaimer" target="_blank" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Disclaimer</a>
          </div>
        </div>
      </div>

      <audio ref={remoteAudioRef} autoPlay className="hidden-audio" />
    </main>
  );
}
