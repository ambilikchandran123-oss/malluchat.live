import { useState, useEffect } from 'react';
import { MalluLogo } from './MalluLogo';
import { Headphones, Mail, Copy, KeyRound, ShieldAlert, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export const PaymentHelpPage = () => {
  const [copiedSupportEmail, setCopiedSupportEmail] = useState<boolean>(false);
  const [copiedCustomMsg, setCopiedCustomMsg] = useState<boolean>(false);
  const [showPreSetHelper, setShowPreSetHelper] = useState<boolean>(false);
  const [customUserText, setCustomUserText] = useState<string>('');
  const [redeemTokenInput, setRedeemTokenInput] = useState<string>('');
  const [tokenSubmittedMsg, setTokenSubmittedMsg] = useState<string>('');
  const [redeemError, setRedeemError] = useState<string>('');

  useEffect(() => {
    document.title = 'Payment Help & Customer Support | MalluChat';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content', 'MalluChat Payment Help & Customer Support. Resolve transaction issues, get manual UPI verification, and redeem calling tokens.');
    }
  }, []);

  const handleCopySupportEmail = () => {
    navigator.clipboard.writeText('teamtwingle@gmail.com');
    setCopiedSupportEmail(true);
    setTimeout(() => setCopiedSupportEmail(false), 2500);
  };

  // Option 1: Send pre-set email without typing
  const handleOpenPreSetMail = () => {
    const supportEmail = 'teamtwingle@gmail.com';
    const subject = encodeURIComponent('MalluChat Payment Verification & Calling Tokens Request');
    const body = encodeURIComponent(
`Hello MalluChat Support Team,

I faced a payment issue / need manual verification for my MalluChat transaction to receive my calling tokens and premium account access.

--- Transaction & Account Details ---
• Date & Time: ${new Date().toLocaleString()}
• UPI UTR / Transaction Reference ID: [Attach or write 12-digit UTR here]
• Amount Deducted: [₹60 / ₹100 / ₹150]
• Issue: [Payment deducted but tokens / premium not unlocked]

⚠️ Policy Acknowledgment:
I understand that all payments are strictly non-refundable and are used directly to maintain and support this website. This payment entitles me only to calling tokens and premium account access on MalluChat.

[NOTE]: I have attached my payment confirmation screenshot to this email. Please verify and credit my calling tokens / premium account access!

Thank you!`
    );

    setShowPreSetHelper(true);
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  };

  // Option 2: Send custom typed email
  const handleSendCustomMail = () => {
    const supportEmail = 'teamtwingle@gmail.com';
    const trimmedText = customUserText.trim();
    const subject = encodeURIComponent('MalluChat Payment Support - Customer Issue');
    const bodyContent = 
`Hello MalluChat Support Team,

${trimmedText ? trimmedText : 'I have a payment-related issue and need assistance with my calling tokens and premium account access.'}

--- Notice & Terms ---
• Date: ${new Date().toLocaleString()}
• Email: teamtwingle@gmail.com
• Refund Policy: I understand that all payments are non-refundable and are used for website maintenance and operations, granting only calling tokens and premium account access.

[Screenshot attached if applicable]
Thank you!`;

    const body = encodeURIComponent(bodyContent);
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  };

  const handleCopyCustomMessage = () => {
    if (!customUserText.trim()) return;
    navigator.clipboard.writeText(customUserText.trim());
    setCopiedCustomMsg(true);
    setTimeout(() => setCopiedCustomMsg(false), 2500);
  };

  const handleApplyRedeemToken = () => {
    const token = redeemTokenInput.trim();
    if (!token) {
      setRedeemError('Please enter the token number received from teamtwingle@gmail.com.');
      return;
    }

    if (token.length < 4) {
      setRedeemError('Invalid token format. Please check the token code sent to your email.');
      return;
    }

    setRedeemError('');

    // Optional admin bypass token for testing
    if (token.toUpperCase() === 'TWINGLEVIP' || token.toUpperCase() === 'ADMIN2026') {
      localStorage.setItem('malluchat_premium', 'true');
      alert('🎉 VIP Master Token verified! Calling access unlocked.');
      window.location.href = '/';
      return;
    }

    localStorage.setItem('malluchat_submitted_token', token);
    setRedeemTokenInput('');
    setTokenSubmittedMsg(`Token "${token}" submitted successfully! Please allow up to 1 to 365 days for manual verification and activation.`);
  };

  return (
    <div style={{
      maxWidth: '720px',
      margin: '0 auto',
      padding: '1.5rem 1rem 3rem 1rem',
      color: 'var(--text-main)',
      fontFamily: 'var(--font-family, sans-serif)',
      boxSizing: 'border-box'
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        paddingBottom: '1.25rem',
        borderBottom: '1px solid var(--panel-border)',
        marginBottom: '1.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MalluLogo size={36} />
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>MalluChat Support</h1>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Payment Issues &amp; Token Help Desk</p>
          </div>
        </div>

        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--panel-border)',
            color: 'var(--text-main)',
            padding: '8px 14px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            transition: 'all 0.2s'
          }}
        >
          <ArrowLeft size={16} /> Back to Chat
        </a>
      </div>

      {/* Main Support Card */}
      <div className="glass" style={{
        borderRadius: '20px',
        padding: '1.5rem',
        border: '1px solid var(--panel-border)',
        boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(74, 222, 128, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Headphones size={22} color="var(--primary)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
              Payment Support &amp; Token Assistance
            </h2>
            <span style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 600 }}>
              Official Help Desk (teamtwingle@gmail.com)
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          If you encountered any payment failure, deduction without immediate activation, or have any transaction-related question, our support team is here to assist you.
        </p>

        {/* STRICT NO REFUND & USAGE POLICY NOTICE */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.09)',
          border: '1px solid rgba(239, 68, 68, 0.28)',
          borderRadius: '14px',
          padding: '14px 16px',
          marginBottom: '1.75rem',
          fontSize: '0.84rem',
          lineHeight: 1.6,
          color: '#fca5a5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#f87171', marginBottom: '6px', fontSize: '0.9rem' }}>
            <ShieldAlert size={18} />
            <span>Important Notice: Strict No Refund Policy</span>
          </div>
          <p style={{ margin: '0 0 6px 0' }}>
            <strong>No Payment Refund:</strong> All payments made on MalluChat are strictly <strong>non-refundable</strong> under any circumstances.
          </p>
          <p style={{ margin: '0 0 6px 0' }}>
            <strong>Website Infrastructure &amp; Usage:</strong> Payments collected are used directly to maintain, host, run, and support our website infrastructure and server costs.
          </p>
          <p style={{ margin: 0 }}>
            <strong>What You Receive:</strong> Your payment exclusively grants you <strong>calling tokens</strong> and <strong>premium VIP account access</strong> privileges on this website.
          </p>
        </div>

        {/* Official Email Badge & Copy */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', width: '100%', marginBottom: '1.75rem' }}>
          <div style={{
            flex: '1 1 200px',
            minWidth: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '0.85rem',
            color: 'var(--primary)',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Mail size={16} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              teamtwingle@gmail.com
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopySupportEmail}
            style={{
              flex: '0 0 auto',
              background: copiedSupportEmail ? 'var(--primary)' : 'rgba(255, 255, 255, 0.08)',
              color: copiedSupportEmail ? '#000' : 'var(--text-main)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              padding: '10px 16px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Copy size={14} />
            <span>{copiedSupportEmail ? 'Copied!' : 'Copy Email'}</span>
          </button>
        </div>

        {/* SECTION 1: Mail sending options */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '1.75rem'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: 0, marginBottom: '0.5rem' }}>
            📧 Contact Customer Support by Email
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Choose either <strong>Option 1</strong> to send a ready-made email instantly without typing, or <strong>Option 2</strong> to type your own custom details.
          </p>

          {/* Option 1: Instant Pre-set Mail (No Typing Needed) */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--primary)', color: '#000', padding: '2px 8px', borderRadius: '4px' }}>
                OPTION 1
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                1-Click Pre-Set Email (No Typing Needed)
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
              Click below to immediately open your mail app with a pre-filled verification draft. Just attach your payment screenshot before hitting send.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenPreSetMail}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Send size={16} />
              <span>Send Pre-Set Email to teamtwingle@gmail.com</span>
            </button>

            {showPreSetHelper && (
              <div style={{
                marginTop: '10px',
                padding: '8px 12px',
                background: 'rgba(74, 222, 128, 0.1)',
                border: '1px solid rgba(74, 222, 128, 0.25)',
                borderRadius: '8px',
                fontSize: '0.78rem',
                color: '#86efac',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <CheckCircle2 size={15} />
                <span>Pre-set email client opened! Please attach your payment screenshot.</span>
              </div>
            )}
          </div>

          {/* Option 2: Space to type custom message */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'rgba(255, 255, 255, 0.15)', color: 'var(--text-main)', padding: '2px 8px', borderRadius: '4px' }}>
                OPTION 2
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Type Your Own Custom Message / Issue
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
              Write your payment details, 12-digit UPI UTR number, or question in the box below:
            </p>

            <textarea
              value={customUserText}
              onChange={(e) => setCustomUserText(e.target.value)}
              placeholder="Type your message here... (e.g. I transferred ₹100 via GooglePay, UTR: 4268xxxx. Please activate my calling tokens and VIP access.)"
              rows={4}
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                padding: '12px',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'vertical',
                marginBottom: '10px'
              }}
            />

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSendCustomMail}
                style={{
                  flex: '1 1 200px',
                  padding: '11px 16px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Mail size={16} />
                <span>Send My Typed Message</span>
              </button>

              <button
                type="button"
                onClick={handleCopyCustomMessage}
                disabled={!customUserText.trim()}
                style={{
                  flex: '0 0 auto',
                  background: copiedCustomMsg ? 'var(--primary)' : 'rgba(255, 255, 255, 0.08)',
                  color: copiedCustomMsg ? '#000' : 'var(--text-main)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  padding: '11px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: customUserText.trim() ? 'pointer' : 'not-allowed',
                  opacity: customUserText.trim() ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Copy size={14} />
                <span>{copiedCustomMsg ? 'Copied Message!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: Token Redemption Box */}
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          🔑 Redeem Your Calling Token Code
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
          Once our support team verifies your payment screenshot, you will receive a unique token number. Enter it here to activate your access:
        </p>

        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
            <KeyRound size={16} color="#fbbf24" />
            <span>Enter Unique Calling Token</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', width: '100%', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={redeemTokenInput}
              onChange={(e) => {
                setRedeemTokenInput(e.target.value);
                if (redeemError) setRedeemError('');
              }}
              placeholder="e.g. MC-98234"
              className="input-field"
              style={{ flex: '1 1 180px', minWidth: 0, padding: '10px 12px', fontSize: '16px' }}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleApplyRedeemToken}
              style={{ flex: '0 0 auto', padding: '10px 18px', width: 'auto', whiteSpace: 'nowrap' }}
            >
              Submit Token
            </button>
          </div>

          {redeemError && (
            <div style={{ color: '#f87171', fontSize: '0.78rem', marginTop: '6px' }}>
              {redeemError}
            </div>
          )}

          {tokenSubmittedMsg && (
            <div style={{
              color: '#fbbf24',
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.25)',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '0.82rem',
              marginTop: '10px',
              lineHeight: 1.5
            }}>
              ⏳ <strong>Token Received:</strong> {tokenSubmittedMsg}
            </div>
          )}
        </div>
      </div>

      {/* Helpful Policy FAQ Card */}
      <div className="glass" style={{
        borderRadius: '20px',
        padding: '1.5rem',
        border: '1px solid var(--panel-border)',
        boxShadow: '0 12px 36px rgba(0,0,0,0.4)'
      }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>
          Payment &amp; Refund Policy Summary
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '4px' }}>
              Are payments refundable?
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              No. All digital transactions are strictly non-refundable. Amount paid is dedicated to supporting website infrastructure, servers, and bandwidth.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '4px' }}>
              What does my payment provide?
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Your verified payment provides free calling tokens and premium account access privileges to connect face-to-face and talk on MalluChat.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '4px' }}>
              How fast does support respond?
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Our support team reviews screenshots sent to <strong>teamtwingle@gmail.com</strong> promptly and usually responds within 1 to 365 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
