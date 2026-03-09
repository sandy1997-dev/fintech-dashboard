import { Check, Zap, Shield } from "lucide-react";

export default function Subscription({ isPro, onActivate }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>
        Upgrade to Pro
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: 40 }}>
        Get advanced analytics and unlimited budgets.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Free Plan */}
        <div
          style={{
            background: "var(--surface)",
            padding: 32,
            borderRadius: 20,
            border: "1px solid var(--border)",
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>Basic</h3>
          <div style={{ fontSize: 32, fontWeight: 800, margin: "20px 0" }}>
            $0<span style={{ fontSize: 14, color: "var(--muted)" }}>/mo</span>
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
            <li style={{ fontSize: 13 }}>
              <Check size={14} color="var(--green)" /> 5 Budgets
            </li>
            <li style={{ fontSize: 13 }}>
              <Check size={14} color="var(--green)" /> Basic Analytics
            </li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div
          style={{
            background: "var(--surface)",
            padding: 32,
            borderRadius: 20,
            border: isPro
              ? "2px solid var(--green)"
              : "2px solid var(--accent)",
            position: "relative",
            transform: "scale(1.05)",
          }}
        >
          {isPro && (
            <div
              style={{
                position: "absolute",
                top: -12,
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--green)",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              ACTIVE PLAN
            </div>
          )}
          <h3 style={{ fontSize: 18, fontWeight: 700 }}>Pro</h3>
          <div style={{ fontSize: 32, fontWeight: 800, margin: "20px 0" }}>
            $12<span style={{ fontSize: 14, color: "var(--muted)" }}>/mo</span>
          </div>
          <ul
            style={{
              textAlign: "left",
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 30,
            }}
          >
            <li style={{ fontSize: 13 }}>
              <Check size={14} color="var(--accent)" /> Unlimited Budgets
            </li>
            <li style={{ fontSize: 13 }}>
              <Check size={14} color="var(--accent)" /> Advanced D3 Analytics
            </li>
            <li style={{ fontSize: 13 }}>
              <Check size={14} color="var(--accent)" /> Export to CSV/PDF
            </li>
          </ul>

          <button
            disabled={isPro}
            onClick={onActivate}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 12,
              background: isPro ? "var(--border)" : "var(--accent)",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              cursor: isPro ? "default" : "pointer",
            }}
          >
            {isPro ? "Current Plan" : "Upgrade Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
