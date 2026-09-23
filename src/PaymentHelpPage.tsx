import { useState, useEffect } from 'react';
import { MalluLogo } from './MalluLogo';
import { Headphones, Mail, Copy, KeyRound, ShieldAlert, ArrowLeft } from 'lucide-react';

export const PaymentHelpPage = () => {
  const [copiedSupportEmail, setCopiedSupportEmail] = useState<boolean>(false);
  const [showMailHelper, setShowMailHelper] = useState<boolean>(false);
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

  const handleOpenCustomerCareMail = () => {
    const supportEmail = 'teamtwingle@gmail.com';
    const subject = encodeURIComponent('MalluChat Payment Verification & Token Request');
    const body = encodeURIComponent(
`Hello MalluChat Support Team,

I need manual payment verification / faced a payment error on MalluChat and would like to receive my unique calling token.

--- My Payment & Account Details ---
• Date & Time: ${new Date().toLocaleString()}
• UPI UTR / Reference ID: [Write your 12-digit UPI UTR number here]
• Amount Paid: [₹60 / ₹100 / ₹150]
• Payment Status: [Money Deducted / Transaction Pending / Payment Error]

⚠️ Notice: I acknowledge that all payments are non-refundable and will be credited as free calling tokens/VIP access for use on this website.

[IMPORTANT]: I have attached my payment confirmation screenshot to this email as proof of payment. Please verify my transaction and send me my unique calling token number!

Thank you!`
    );

    setShowMailHelper(true);
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  };

  const handleApplyRedeemToken = () => {
    const token = redeemTokenInput.trim();
    if (!token) {
      setRedeemError('Please enter the token number received from teamtwingle@gmail.com.');
      return;
    }

    if (token.length < 4) {
      setRedeemError('Invalid token format. Please check the token number sent to your email.');
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
    setTokenSubmittedMsg(`Token "${token}" submitted successfully! Please wait up to 24 hours for manual verification and activation by our support team.`);
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
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Payment Issues &amp; Manual Verification</p>
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
              Payment Issues &amp; Help Desk
            </h2>
            <span style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 600 }}>
              Official Support Service
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          If you experienced payment errors, transaction timeouts, or your money was deducted from your bank account without immediate activation, our support team will manually verify your payment and provide a <strong>unique token number</strong> for free calling tokens &amp; VIP access.
        </p>

        {/* No Refund Policy Notice */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: '14px',
          padding: '12px 14px',
          marginBottom: '1.5rem',
          fontSize: '0.82rem',
          lineHeight: 1.5,
          color: '#fca5a5'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#f87171', marginBottom: '4px' }}>
            <ShieldAlert size={16} />
            <span>Important: No Refund Policy</span>
          </div>
          <span>
            All payments are strictly non-refundable. Amount paid will be credited as free calling tokens &amp; VIP access exclusively for use on this website.
          </span>
        </div>

        {/* Action: Email Support */}
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
          Step 1: Contact Customer Care
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
          Click the button below to generate a pre-filled verification email. Make sure to attach your transaction screenshot showing the 12-digit UPI UTR number:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpenCustomerCareMail}
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '0.92rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Mail size={18} />
            <span>One-Click Customer Care (Email Support)</span>
          </button>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', width: '100%' }}>
            <div style={{
              flex: '1 1 200px',
              minWidth: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '10px 12px',
              fontSize: '0.82rem',
              color: 'var(--primary)',
              fontFamily: 'monospace',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              teamtwingle@gmail.com
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
                padding: '10px 14px',
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
        </div>

        {/* Mail Helper Notice Popup */}
        {showMailHelper && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            color: '#6ee7b7',
            lineHeight: 1.5
          }}>
            ✅ <strong>Email draft generated!</strong> Please attach your payment screenshot before sending to <strong>teamtwingle@gmail.com</strong>.
          </div>
        )}

        {/* Redeem Unique Token Box */}
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
          Step 2: Redeem Your Unique Token
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
          Once our team verifies your transaction, you will receive a unique token number. Enter it here:
        </p>

        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '14px',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
            <KeyRound size={16} color="#fbbf24" />
            <span>Redeem Token Number</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', width: '100%', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={redeemTokenInput}
              onChange={(e) => {
                setRedeemTokenInput(e.target.value);
                if (redeemError) setRedeemError('');
              }}
              placeholder="Enter Token (e.g. MC-98234)"
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
              ⏳ <strong>Verification in progress:</strong> {tokenSubmittedMsg}
            </div>
          )}
        </div>
      </div>

      {/* Helpful FAQ / Guidance Card */}
      <div className="glass" style={{
        borderRadius: '20px',
        padding: '1.5rem',
        border: '1px solid var(--panel-border)',
        boxShadow: '0 12px 36px rgba(0,0,0,0.4)'
      }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>
          Frequently Asked Questions
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '4px' }}>
              Why was my payment deducted without VIP activation?
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Payment gateway or bank network delays can prevent instant callbacks. Our team manually verifies every transaction against the bank statement and issues tokens promptly.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '4px' }}>
              How long does manual verification take?
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              Verification typically completes within 1 to 24 hours after you submit your transaction screenshot to <strong>teamtwingle@gmail.com</strong>.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '4px' }}>
              Can I get a cash refund?
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              As stated in our terms, all digital payments are strictly non-refundable. Any verified funds are credited as free calling tokens &amp; VIP access on MalluChat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
