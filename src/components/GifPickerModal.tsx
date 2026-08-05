import React, { useState, useEffect, useCallback } from 'react';
import { Search, X, Upload, Link as LinkIcon, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface GifPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGif: (gifUrl: string, title?: string) => void;
}

// Curated high quality fallback GIFs categorized for instant zero-latency loading
const CURATED_GIFS: Record<string, { id: string; url: string; title: string }[]> = {
  trending: [
    { id: 't1', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnZuejdxNzcybm05aHM3dnoxZzV2MnB5ZTZsaHNjNDVybGNtOW1ndCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlHFRbmaZtBRhXG/giphy.gif', title: 'Happy Dance' },
    { id: 't2', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpucTNhdzBocnhnY2U1Y3U2anI2dzFhYjVmdzM1eTRqZGtmbWdmdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKSjRrfIPjeiVyM/giphy.gif', title: 'Mind Blown' },
    { id: 't3', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNndic290MGttZmxkYXV4YnlndmJhZXlnZjQxMWpsaHgzdzBhMW1xZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2K5jinAlChoCLS/giphy.gif', title: 'Applause' },
    { id: 't4', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWtsNXQydTVucDhhZndlYndlZm8xdmp3OXc2eXdmMDlsbHRjNHh2bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c6DIpwhIYvwlR63vIM/giphy.gif', title: 'Popcorn' },
    { id: 't5', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3dldmZiaXdvZHF6NXRrejlvcWd6ZmZyeTBsZzh4bTkyOGpsZDFscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26u4cqiYI30juCOGY/giphy.gif', title: 'Thumbs Up' },
    { id: 't6', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDVqMjB4dGhhNGlsOGxndWZrdGV6dngwcnpwcHFxY2QybWw2cXdtNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10UeedrT5MIfPG/giphy.gif', title: 'Party Cat' }
  ],
  funny: [
    { id: 'f1', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnJqNXgxejhkcGZyb2IxeGszcG9uMWhucG9qYzdsenVnbDgybGNuZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.gif', title: 'Cat Typing' },
    { id: 'f2', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGJ3cmZ4ZXB6NThuaG5xM2tmeXdwczl4OGV3NmNmbmdsbXdpYXc2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ndFA19YRB0GKY/giphy.gif', title: 'Laughing Dog' },
    { id: 'f3', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGcycG1qN3B2ZWF1MGlxeDhyNzVsbTh5Y3dneXR5NDdwOHptZTVvMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7abKhOpu0NwenH3O/giphy.gif', title: 'LOL' },
    { id: 'f4', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRnbzdyNndxbG54a2U1cjVqMjdyYm43MXFwNHo3NHB2dTBpNHFpNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nXxOjZrbnbRxS/giphy.gif', title: 'Spit Take' }
  ],
  love: [
    { id: 'l1', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJkdmRmbjhvb2g5OWJpajdxMnEydWpxczJqdnpxdTFpZWlnYmd4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLdmIp6wJr91JAI/giphy.gif', title: 'Heart Eyes' },
    { id: 'l2', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnE0MnY5OGcwa3Jvb3FwazltNHhhNjlzMHg4ZTNjNmpndnFiMWFwcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M90mJvfWfd5mbUv03d/giphy.gif', title: 'Love Hug' },
    { id: 'l3', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnFlMnIwdWd6aDFwb3cxbTNjcHBvdG9mNDRra3J2OXkwczYyMGF1MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gD4E1t4pU3wG9D8j9b/giphy.gif', title: 'Blow Kiss' }
  ],
  dance: [
    { id: 'd1', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnlybjNrdjVlYW9yZG9sdG0zc2Q1OTB1dnFwcXk2cmh3ZXk2dnJjOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/blSTtZehjAZ8I/giphy.gif', title: 'Carlton Dance' },
    { id: 'd2', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWZpdjFua3pxZHZzcmQ1ZnpibjlybnkzdnhodHJjczlncWVrbzdrYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13hxeOYjoNJqjm/giphy.gif', title: 'Groove Dance' },
    { id: 'd3', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNndibWlhbjQyaWd1cWh3MnliYjlveGRsYmRhczIxbml1ZmsycWdzYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dhIxvac3FfFiE/giphy.gif', title: 'Disco Moves' }
  ],
  malayalam: [
    { id: 'm1', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnJqNXgxejhkcGZyb2IxeGszcG9uMWhucG9qYzdsenVnbDgybGNuZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.gif', title: 'Malayalam Funny' },
    { id: 'm2', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWtsNXQydTVucDhhZndlYndlZm8xdmp3OXc2eXdmMDlsbHRjNHh2bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c6DIpwhIYvwlR63vIM/giphy.gif', title: 'Mass Reaction' },
    { id: 'm3', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpucTNhdzBocnhnY2U1Y3U2anI2dzFhYjVmdzM1eTRqZGtmbWdmdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKSjRrfIPjeiVyM/giphy.gif', title: 'Super Stare' }
  ],
  reactions: [
    { id: 'r1', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2RtcGl5NDVnbTFqNjMwbnhvZjdubmE5Z3lyZXVlcmg0bWlhZnpxZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/S9f7FVSU0TUzLKCx7A/giphy.gif', title: 'Shocked' },
    { id: 'r2', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZndjN3dvaXZmbGkycDRpbmZqdTlyd3N3dGhyMXd1Y2JydjFrcG5ycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5t9wJjyHAOxvnxcPNk/giphy.gif', title: 'Confused' },
    { id: 'r3', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3dldmZiaXdvZHF6NXRrejlvcWd6ZmZyeTBsZzh4bTkyOGpsZDFscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26u4cqiYI30juCOGY/giphy.gif', title: 'Nod Yes' },
    { id: 'r4', url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGJ3cmZ4ZXB6NThuaG5xM2tmeXdwczl4OGV3NmNmbmdsbXdpYXc2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ndFA19YRB0GKY/giphy.gif', title: 'Wink' }
  ]
};

const CATEGORIES = [
  { id: 'trending', label: '🔥 Trending' },
  { id: 'funny', label: '😂 Funny' },
  { id: 'love', label: '😍 Love' },
  { id: 'dance', label: '💃 Dance' },
  { id: 'malayalam', label: '🌴 Malayalam' },
  { id: 'reactions', label: '😮 Reactions' }
];

export const GifPickerModal: React.FC<GifPickerModalProps> = ({ isOpen, onClose, onSelectGif }) => {
  const [activeTab, setActiveTab] = useState<'search' | 'upload'>('search');
  const [selectedCategory, setSelectedCategory] = useState<string>('trending');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gifs, setGifs] = useState<{ id: string; url: string; title: string }[]>(CURATED_GIFS.trending);
  const [loading, setLoading] = useState<boolean>(false);

  // Upload/Custom URL state
  const [customUrl, setCustomUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Giphy public search API fetcher
  const searchGiphy = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      // Using Giphy public beta API key for client-side search
      const apiKey = 'GlV1VU2yTFawAOh5UMIpXPICBsng6qZl';
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=24&rating=g`
      );
      if (response.ok) {
        const data = await response.json();
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          const formatted = data.data.map((item: any) => ({
            id: item.id,
            url: item.images?.fixed_height?.url || item.images?.original?.url,
            title: item.title || query
          }));
          setGifs(formatted);
        } else {
          // Fallback to category if query yields empty
          setGifs(CURATED_GIFS[selectedCategory] || CURATED_GIFS.trending);
        }
      } else {
        setGifs(CURATED_GIFS[selectedCategory] || CURATED_GIFS.trending);
      }
    } catch (err) {
      console.warn('Giphy search fetch failed, using fallback GIFs:', err);
      setGifs(CURATED_GIFS[selectedCategory] || CURATED_GIFS.trending);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  // Handle Search Input Change with Debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setGifs(CURATED_GIFS[selectedCategory] || CURATED_GIFS.trending);
      return;
    }

    const timer = setTimeout(() => {
      searchGiphy(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, searchGiphy]);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setSearchQuery('');
    setGifs(CURATED_GIFS[catId] || CURATED_GIFS.trending);
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
          maxWidth: '520px',
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
              Send GIF
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
            <Search size={16} /> GIF Search
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
                  placeholder="Search all GIFs (e.g. funny, Malayalam, reaction)..."
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
                    padding: '0.35rem 0.8rem',
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
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '10px'
              }}
            >
              {loading ? (
                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                  <Loader2 size={32} className="spin" style={{ marginBottom: '10px', color: 'var(--primary)' }} />
                  <span>Searching GIFs...</span>
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
                <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-main)' }}>Upload GIF File</h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Upload any animated .gif file from your device
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
