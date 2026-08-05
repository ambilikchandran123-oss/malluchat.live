import React, { useState, useEffect, useCallback } from 'react';
import { Search, X, Upload, Link as LinkIcon, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface GifPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGif: (gifUrl: string, title?: string) => void;
}

// Authentic Verified Malayalam Movie & Character GIFs
const CURATED_GIFS: Record<string, { id: string; url: string; title: string; tags?: string[] }[]> = {
  malayalam: [
    { id: 'm1', url: 'https://media.giphy.com/media/SPxbUDEqoJMFfzIo4o/giphy.gif', title: 'Manavalan Glasses (Salim Kumar)', tags: ['salimkumar', 'manavalan', 'malayalam', 'funny'] },
    { id: 'm2', url: 'https://media.giphy.com/media/Air56nKsn1iAoPm5RZ/giphy.gif', title: 'Mohanlal Salute Mass', tags: ['mohanlal', 'lalettan', 'mass', 'malayalam'] },
    { id: 'm3', url: 'https://media.giphy.com/media/asMVvV4fOXFcfm6OuM/giphy.gif', title: 'Mammootty "Is That So?"', tags: ['mammootty', 'mammookka', 'malayalam', 'reaction'] },
    { id: 'm4', url: 'https://media.giphy.com/media/bpyQShzuDh5lLC70wN/giphy.gif', title: 'Premam Malar Teacher Smile', tags: ['premam', 'saipallavi', 'love', 'malayalam'] },
    { id: 'm5', url: 'https://media.giphy.com/media/3oxRmoWRSnxmiJmBaw/giphy.gif', title: 'Salim Kumar Pulival Kalyanam', tags: ['salimkumar', 'comedy', 'malayalam'] },
    { id: 'm6', url: 'https://media.giphy.com/media/btdKdBz6Pw4Ks/giphy.gif', title: 'Marykkundoru Kunjaadu Comedy', tags: ['dileep', 'salimkumar', 'malayalam'] },
    { id: 'm7', url: 'https://media.giphy.com/media/aVMiF9Tc57zkXfZ7IK/giphy.gif', title: 'Nivin Pauly Premam Swag', tags: ['nivinpauly', 'premam', 'mass', 'malayalam'] },
    { id: 'm8', url: 'https://media.giphy.com/media/duTokUNkqqQAiHnOeM/giphy.gif', title: 'Mammootty Mammookka Reaction', tags: ['mammootty', 'mammookka', 'malayalam'] },
    { id: 'm9', url: 'https://media.giphy.com/media/ebcTSCa5r2VHFK1zPS/giphy.gif', title: 'Mammootty Bheeshma Parvam', tags: ['mammootty', 'bheeshmaparvam', 'mass'] },
    { id: 'm10', url: 'https://media.giphy.com/media/AmyldVlxkmut0XyRqB/giphy.gif', title: 'Mohanlal Smile', tags: ['mohanlal', 'lalettan', 'smile'] }
  ],
  mohanlal: [
    { id: 'lal1', url: 'https://media.giphy.com/media/Air56nKsn1iAoPm5RZ/giphy.gif', title: 'Mohanlal Salute Mass', tags: ['mohanlal', 'salute', 'mass'] },
    { id: 'lal2', url: 'https://media.giphy.com/media/AmyldVlxkmut0XyRqB/giphy.gif', title: 'Mohanlal Charm Smile', tags: ['mohanlal', 'smile', 'lalettan'] },
    { id: 'lal3', url: 'https://media.giphy.com/media/mbcD95pcHZbL1wdIZz/giphy.gif', title: 'Mohanlal Dance Move', tags: ['mohanlal', 'dance'] },
    { id: 'lal4', url: 'https://media.giphy.com/media/mzZlll5ARLZDGCtRoO/giphy.gif', title: 'Mohanlal Crying Meme', tags: ['mohanlal', 'cry', 'funny'] },
    { id: 'lal5', url: 'https://media.giphy.com/media/5eFQJhNd7woE0a6pM3/giphy.gif', title: 'Lalettan Movie Swag', tags: ['mohanlal', 'lalettan'] },
    { id: 'lal6', url: 'https://media.giphy.com/media/FFKlScm1ivGq4JfbWt/giphy.gif', title: 'Harikrishnans Mohanlal & Mammootty', tags: ['mohanlal', 'mammootty'] }
  ],
  mammootty: [
    { id: 'mam1', url: 'https://media.giphy.com/media/asMVvV4fOXFcfm6OuM/giphy.gif', title: 'Mammootty "Is That So?" Reaction', tags: ['mammootty', 'mammookka'] },
    { id: 'mam2', url: 'https://media.giphy.com/media/duTokUNkqqQAiHnOeM/giphy.gif', title: 'Mammootty Mammookka Smile', tags: ['mammootty', 'smile'] },
    { id: 'mam3', url: 'https://media.giphy.com/media/LIpi6bKcFVKfZb5Hxe/giphy.gif', title: 'Mammootty Kasaba Mass', tags: ['mammootty', 'kasaba', 'mass'] },
    { id: 'mam4', url: 'https://media.giphy.com/media/ebcTSCa5r2VHFK1zPS/giphy.gif', title: 'Mammootty Bheeshma Parvam Walk', tags: ['mammootty', 'bheeshmaparvam'] },
    { id: 'mam5', url: 'https://media.giphy.com/media/dHD3QObxk9Hk6mRsDe/giphy.gif', title: 'Mammootty Kasaba Sunglasses', tags: ['mammootty', 'glasses'] },
    { id: 'mam6', url: 'https://media.giphy.com/media/Y6CIo9NccFMzdZlKBo/giphy.gif', title: 'Mammootty Special Expression', tags: ['mammootty', 'special'] }
  ],
  salimkumar: [
    { id: 'sk1', url: 'https://media.giphy.com/media/SPxbUDEqoJMFfzIo4o/giphy.gif', title: 'Manavalan Glasses (Pulival Kalyanam)', tags: ['salimkumar', 'manavalan'] },
    { id: 'sk2', url: 'https://media.giphy.com/media/3oxRmoWRSnxmiJmBaw/giphy.gif', title: 'Salim Kumar Classic Reaction', tags: ['salimkumar', 'reaction'] },
    { id: 'sk3', url: 'https://media.giphy.com/media/MoDHlX4whLqqQ/giphy.gif', title: 'Salim Kumar Comedy Laugh', tags: ['salimkumar', 'laugh'] },
    { id: 'sk4', url: 'https://media.giphy.com/media/W76Qa07KYacj1OxCaW/giphy.gif', title: 'Salim Kumar Crying Reaction', tags: ['salimkumar', 'cry'] },
    { id: 'sk5', url: 'https://media.giphy.com/media/KkLQGyM9vCRuOImxkc/giphy.gif', title: 'Salim Kumar & Dileep Scene', tags: ['salimkumar', 'dileep'] }
  ],
  mallulove: [
    { id: 'ml1', url: 'https://media.giphy.com/media/bpyQShzuDh5lLC70wN/giphy.gif', title: 'Premam Sai Pallavi Malar Smile', tags: ['premam', 'saipallavi', 'love'] },
    { id: 'ml2', url: 'https://media.giphy.com/media/aVMiF9Tc57zkXfZ7IK/giphy.gif', title: 'Premam Nivin Pauly Mass Swag', tags: ['premam', 'nivinpauly'] },
    { id: 'ml3', url: 'https://media.giphy.com/media/AYpTVR2cfJsbZQtgOq/giphy.gif', title: 'Premam College Entry', tags: ['premam', 'college'] },
    { id: 'ml4', url: 'https://media.giphy.com/media/FtwFZ1HIwivnjA48ez/giphy.gif', title: 'Sai Pallavi Cute Blushing', tags: ['saipallavi', 'cute'] },
    { id: 'ml5', url: 'https://media.giphy.com/media/2bc8oSPHnc0aA/giphy.gif', title: 'Premam Classic Romantic Scene', tags: ['premam', 'romance'] },
    { id: 'ml6', url: 'https://media.giphy.com/media/9ALlOPjnRzJzl6E6Yz/giphy.gif', title: 'Pranav Mohanlal Hridayam', tags: ['pranav', 'hridayam'] }
  ],
  trending: [
    { id: 'tr1', url: 'https://media.giphy.com/media/Air56nKsn1iAoPm5RZ/giphy.gif', title: 'Mohanlal Salute Mass' },
    { id: 'tr2', url: 'https://media.giphy.com/media/SPxbUDEqoJMFfzIo4o/giphy.gif', title: 'Salim Kumar Manavalan' },
    { id: 'tr3', url: 'https://media.giphy.com/media/asMVvV4fOXFcfm6OuM/giphy.gif', title: 'Mammootty Reaction' },
    { id: 'tr4', url: 'https://media.giphy.com/media/bpyQShzuDh5lLC70wN/giphy.gif', title: 'Premam Sai Pallavi Smile' },
    { id: 'tr5', url: 'https://media.giphy.com/media/ebcTSCa5r2VHFK1zPS/giphy.gif', title: 'Mammootty Bheeshma Parvam' },
    { id: 'tr6', url: 'https://media.giphy.com/media/aVMiF9Tc57zkXfZ7IK/giphy.gif', title: 'Nivin Pauly Swag' }
  ]
};

const CATEGORIES = [
  { id: 'malayalam', label: '🌴 Mallu Memes' },
  { id: 'mohanlal', label: '👑 Mohanlal' },
  { id: 'mammootty', label: '🔥 Mammootty' },
  { id: 'salimkumar', label: '😂 Salim Kumar' },
  { id: 'mallulove', label: '😍 Premam & Love' },
  { id: 'trending', label: '🔥 Trending' }
];

export const GifPickerModal: React.FC<GifPickerModalProps> = ({ isOpen, onClose, onSelectGif }) => {
  const [activeTab, setActiveTab] = useState<'search' | 'upload'>('search');
  const [selectedCategory, setSelectedCategory] = useState<string>('malayalam');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gifs, setGifs] = useState<{ id: string; url: string; title: string }[]>(CURATED_GIFS.malayalam);
  const [loading, setLoading] = useState<boolean>(false);

  // Upload/Custom URL state
  const [customUrl, setCustomUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Search logic: matches local Malayalam tags and title
  const performSearch = useCallback((query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) {
      setGifs(CURATED_GIFS[selectedCategory] || CURATED_GIFS.malayalam);
      return;
    }

    setLoading(true);

    // Filter local curated list matching search query
    const allLocalGifs = Object.values(CURATED_GIFS).flat();
    const matchedLocal = allLocalGifs.filter(gif =>
      gif.title.toLowerCase().includes(q) ||
      gif.tags?.some(t => t.toLowerCase().includes(q))
    );

    // Deduplicate local matches
    const localMap = new Map<string, { id: string; url: string; title: string }>();
    matchedLocal.forEach(item => localMap.set(item.id, item));

    const results = Array.from(localMap.values());
    if (results.length > 0) {
      setGifs(results);
    } else {
      setGifs(CURATED_GIFS[selectedCategory] || CURATED_GIFS.malayalam);
    }
    setLoading(false);
  }, [selectedCategory]);

  // Handle Search Input Change with Debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setGifs(CURATED_GIFS[selectedCategory] || CURATED_GIFS.malayalam);
      return;
    }

    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, performSearch]);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setSearchQuery('');
    setGifs(CURATED_GIFS[catId] || CURATED_GIFS.malayalam);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('gif') && !file.type.includes('image')) {
      alert('Please select a valid GIF or image file.');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data?.data?.url) {
        const directUrl = data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
        onSelectGif(directUrl, file.name);
        onClose();
      } else {
        throw new Error('Upload response invalid');
      }
    } catch (err) {
      alert('Failed to upload GIF file. Please check internet connection or try pasting direct URL.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    onSelectGif(customUrl.trim(), 'Custom GIF');
    setCustomUrl('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass"
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '85vh',
          borderRadius: '20px',
          border: '1px solid var(--panel-border)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          background: 'var(--panel-bg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--panel-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Send Mallu & Malayalam GIFs
            </h3>
          </div>

          <button
            onClick={onClose}
            className="icon-btn"
            style={{ padding: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--panel-border)',
            background: 'rgba(0,0,0,0.2)'
          }}
        >
          <button
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              background: activeTab === 'search' ? 'rgba(255,255,255,0.08)' : 'transparent',
              color: activeTab === 'search' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              borderBottom: activeTab === 'search' ? '2px solid var(--primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
            onClick={() => setActiveTab('search')}
          >
            <Search size={16} /> Malayalam GIF Collection
          </button>

          <button
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              background: activeTab === 'upload' ? 'rgba(255,255,255,0.08)' : 'transparent',
              color: activeTab === 'upload' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              borderBottom: activeTab === 'upload' ? '2px solid var(--primary)' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={16} /> Upload / URL
          </button>
        </div>

        {/* Content Body */}
        {activeTab === 'search' ? (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            {/* Search Bar */}
            <div style={{ padding: '0.75rem 1rem 0.5rem 1rem' }}>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  border: '1px solid var(--panel-border)'
                }}
              >
                <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search (e.g. Mohanlal, Mammootty, Salim Kumar, Premam)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem 0.65rem 2.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 10px' }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Pills */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                padding: '0 1rem 0.75rem 1rem',
                overflowX: 'auto',
                scrollbarWidth: 'none'
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: selectedCategory === cat.id && !searchQuery ? 700 : 500,
                    background: selectedCategory === cat.id && !searchQuery ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
                    color: selectedCategory === cat.id && !searchQuery ? '#000' : 'var(--text-main)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* GIF Grid Area */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '0.5rem 1rem 1rem 1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
                gap: '10px'
              }}
            >
              {loading ? (
                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                  <Loader2 size={32} className="spin" style={{ marginBottom: '10px', color: 'var(--primary)' }} />
                  <span>Loading GIFs...</span>
                </div>
              ) : (
                gifs.map((gif) => (
                  <div
                    key={gif.id}
                    onClick={() => {
                      onSelectGif(gif.url, gif.title);
                      onClose();
                    }}
                    style={{
                      position: 'relative',
                      aspectRatio: '4 / 3',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.04)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <img
                      src={gif.url}
                      alt={gif.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        zIndex: 1,
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                        padding: '6px 6px 4px 6px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: '#fff',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {gif.title}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* Upload / Custom URL Tab */
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
            {/* File Upload Option */}
            <div
              style={{
                border: '2px dashed var(--panel-border)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{ padding: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}>
                <ImageIcon size={32} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-main)' }}>Upload Custom GIF</h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Upload any Malayalam or animated GIF file from your device
                </p>
              </div>

              <label
                className="btn btn-primary"
                style={{
                  cursor: isUploading ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.9rem'
                }}
              >
                {isUploading ? <Loader2 size={18} className="spin" /> : <Upload size={18} />}
                {isUploading ? 'Uploading...' : 'Choose GIF File'}
                <input
                  type="file"
                  accept="image/gif,image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {/* Direct GIF Link Option */}
            <form onSubmit={handleCustomUrlSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Or Paste Direct GIF Image URL
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div
                  style={{
                    flex: 1,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    border: '1px solid var(--panel-border)'
                  }}
                >
                  <LinkIcon size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                  <input
                    type="url"
                    placeholder="https://media.giphy.com/.../giphy.gif"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.75rem 0.6rem 2.4rem',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!customUrl.trim()}
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1rem', width: 'auto', whiteSpace: 'nowrap', opacity: customUrl.trim() ? 1 : 0.5 }}
                >
                  Send GIF
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
