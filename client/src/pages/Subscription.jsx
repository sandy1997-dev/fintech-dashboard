import React, { useState } from "react";
import { Check, Zap, Shield, Loader2 } from "lucide-react";

export default function Subscription({ isPro, onActivate }) {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (isPro) return;
    
    setIsPurchasing(true);
    
    // Simulate a 1.5 second "Payment Processing" delay
    setTimeout(() => {
      onActivate(); // This calls the upgrade function in App.js
      setIsPurchasing(false);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }} className="fade-up fade-up-1">
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10, fontFamily: 'var(--font-display)' }}>
        {isPro ? "You are a Pro Member" : "Upgrade to Pro"}
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: 40, fontSize: 15 }}>
        {isPro 
          ? "You have unlocked all premium features. Enjoy your advanced financial tools!" 
          : "Get advanced analytics, unlimited budgets, and priority data exports."}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: 'center' }}>
        
        {/* Free Plan */}
        <div
          style={{
            background: "var(--surface)",
            padding: 32,
            borderRadius: 20,
            border: "1px solid var(--border)",
            opacity: isPro ? 0.6 : 1,
            transition: '0.3s'
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>Basic</h3>
          <div style={{ fontSize: 32, fontWeight: 800, margin: "20px 0", fontFamily: 'var(--font-mono)' }}>
            $0<span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }}>/mo</span>
          </div>
          <ul
            style={{
              textAlign: "left",
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <li style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check size={14} color="var(--green)" /> 5 Monthly Budgets
            </li>
            <li style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check size={14} color="var(--green)" /> Basic Analytics
            </li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div
          style={{
            background: "var(--surface)",
            padding: 40,
            borderRadius: 24,
            border: isPro ? "2px solid var(--green)" : "2px solid var(--accent)",
            position: "relative",
            transform: isPro ? "scale(1)" : "scale(1.05)",
            boxShadow: isPro ? "none" : "0 20px 40px -12px rgba(124, 106, 247, 0.25)",
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {isPro && (
            <div
              style={{
                position: "absolute",
                top: -14,
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--green)",
                color: "#fff",
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.05em',
                boxShadow: '0 4px 12px rgba(52, 211, 153, 0.3)'
              }}
            >
              ACTIVE PLAN
            </div>
          )}
          
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>Pro</h3>
          <div style={{ fontSize: 32, fontWeight: 800, margin: "20px 0", fontFamily: 'var(--font-mono)' }}>
            $12<span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }}>/mo</span>
          </div>
          
          <ul
            style={{
              textAlign: "left",
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginBottom: 32,
            }}
          >
            <li style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Zap size={14} color="var(--accent)" fill="var(--accent)" /> Unlimited Budgets
            </li>
            <li style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={14} color="var(--accent)" fill="var(--accent)" /> Advanced D3 Analytics
            </li>
            <li style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check size={14} color="var(--accent)" /> Export to CSV/PDF
            </li>
          </ul>

          <button
            disabled={isPro || isPurchasing}
            onClick={handlePurchase}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              background: isPro ? "var(--green)" : "var(--accent)",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: 14,
              cursor: (isPro || isPurchasing) ? "default" : "pointer",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: '0.2s',
              boxShadow: isPro ? 'none' : '0 8px 16px -4px rgba(124, 106, 247, 0.4)'
            }}
          >
            {isPurchasing ? (
              <>
                <div className="spin-animation">◌</div> Processing...
              </>
            ) : isPro ? (
              "✓ Plan Activated"
            ) : (
              "Upgrade Now"
            )}
          </button>
        </div>
      </div>
      
      <style>{`
        .spin-animation {
          animation: spin 1s linear infinite;
          font-size: 18px;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}