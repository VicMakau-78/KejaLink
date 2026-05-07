import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/Subscription.css';

const API = "https://vicmakau.alwaysdata.net/api";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    icon: "🏠",
    max: "8 properties",
    color: "#0F6E56",
    accent: "#e1f5ee",
    prices: { monthly: 6500, "3months": 18000, "6months": 35000, yearly: 72000 },
    features: ["Up to 8 property listings", "Verified company badge", "Booking management", "Basic analytics", "Email support"],
    missing: ["Priority listing", "Unlimited properties", "Dedicated agent"],
  },
  {
    id: "optimum",
    name: "Optimum",
    icon: "🏢",
    max: "18 properties",
    color: "#7c3aed",
    accent: "#f3f0ff",
    popular: true,
    prices: { monthly: 18000, "3months": 52000, "6months": 100000, yearly: 198000 },
    features: ["Up to 18 property listings", "Verified company badge", "Booking management", "Advanced analytics", "Priority email support", "Priority listing placement"],
    missing: ["Unlimited properties", "Dedicated agent"],
  },
  {
    id: "premium",
    name: "Premium",
    icon: "👑",
    max: "Unlimited",
    color: "#d4af37",
    accent: "#fffbeb",
    prices: { monthly: 45000, "3months": 150000, "6months": 270000, yearly: 520000 },
    features: ["Unlimited property listings", "Verified company badge", "Booking management", "Full analytics suite", "Priority support 24/7", "Priority listing placement", "Dedicated account agent"],
    missing: [],
  },
];

const CYCLES = [
  { id: "monthly",  label: "Monthly",    savings: null },
  { id: "3months",  label: "3 Months",   savings: "Save 8%" },
  { id: "6months",  label: "6 Months",   savings: "Save 10%" },
  { id: "yearly",   label: "Yearly",     savings: "Save 15%" },
];

const Subscription = ({ onClose, onSubscribed }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cycle, setCycle] = useState("monthly");
  const [selected, setSelected] = useState(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [trialLoading, setTrialLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [step, setStep] = useState("plans"); // plans | confirm

  useEffect(() => {
    // Fetch current subscription status
    if (!user?.user_id) return;
    axios.get(`${API}/subscription_status/${user.user_id}`)
      .then(r => setStatus(r.data))
      .catch(() => {});
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 4000); };

  const handleTrial = async () => {
    setTrialLoading(true);
    try {
      const fd = new FormData();
      fd.append("user_id", user.user_id);
      const res = await axios.post(`${API}/start_trial`, fd);
      showToast("✅ " + res.data.message);
      setTimeout(() => { onSubscribed && onSubscribed(); onClose && onClose(); }, 1500);
    } catch (err) {
      showToast("❌ " + (err.response?.data?.error || "Failed to start trial"));
    } finally {
      setTrialLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!phone) { showToast("Please enter your M-Pesa phone number"); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("user_id", user.user_id);
      fd.append("plan_name", selected.id);
      fd.append("billing_cycle", cycle);
      fd.append("phone", phone);
      const res = await axios.post(`${API}/subscribe`, fd);
      showToast("✅ " + res.data.message);
      setTimeout(() => { onSubscribed && onSubscribed(); onClose && onClose(); }, 2000);
    } catch (err) {
      showToast("❌ " + (err.response?.data?.error || "Subscription failed"));
    } finally {
      setLoading(false);
    }
  };

  const selectedPlan = PLANS.find(p => p.id === selected?.id);
  const price = selectedPlan ? selectedPlan.prices[cycle] : 0;

  return (
    <div className="sub-overlay">
      <div className="sub-modal">

        {/* Toast */}
        {toast && <div className="sub-toast">{toast}</div>}

        {/* Header */}
        <div className="sub-header">
          <div>
            <h2 className="sub-title">
              {step === "plans" ? "Choose Your Plan" : "Confirm & Pay"}
            </h2>
            <p className="sub-subtitle">
              {step === "plans"
                ? "Unlock the full potential of KejaLink for your company"
                : `${selectedPlan?.name} · ${CYCLES.find(c=>c.id===cycle)?.label}`}
            </p>
          </div>
          {onClose && (
            <button className="sub-close" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* Active subscription banner */}
        {status?.has_active && (
          <div className="sub-active-banner">
            <span>✅</span>
            <div>
              <strong>{status.is_trial ? "Free Trial Active" : `${status.plan_name?.charAt(0).toUpperCase() + status.plan_name?.slice(1)} Plan Active`}</strong>
              <span> — {status.days_left} days remaining (expires {status.end_date})</span>
            </div>
          </div>
        )}

        {step === "plans" && (
          <>
            {/* Free trial CTA */}
            {!status?.has_active && !status?.trial_used && (
              <div className="sub-trial-banner">
                <div className="sub-trial-left">
                  <span className="sub-trial-badge">FREE</span>
                  <div>
                    <p className="sub-trial-title">Start with a 5-Day Free Trial</p>
                    <p className="sub-trial-sub">No payment needed. Access all Basic features free for 5 days.</p>
                  </div>
                </div>
                <button className="sub-trial-btn" onClick={handleTrial} disabled={trialLoading}>
                  {trialLoading ? "Starting..." : "Start Free Trial"}
                </button>
              </div>
            )}

            {/* Billing cycle toggle */}
            <div className="sub-cycle-row">
              {CYCLES.map(c => (
                <button
                  key={c.id}
                  className={`sub-cycle-btn ${cycle === c.id ? 'active' : ''}`}
                  onClick={() => setCycle(c.id)}
                >
                  {c.label}
                  {c.savings && <span className="sub-cycle-save">{c.savings}</span>}
                </button>
              ))}
            </div>

            {/* Plan cards */}
            <div className="sub-plans-grid">
              {PLANS.map(plan => (
                <div
                  key={plan.id}
                  className={`sub-plan-card ${selected?.id === plan.id ? 'selected' : ''} ${plan.popular ? 'popular' : ''}`}
                  style={{ '--plan-color': plan.color, '--plan-accent': plan.accent }}
                  onClick={() => setSelected(plan)}
                >
                  {plan.popular && <div className="sub-popular-badge">Most Popular</div>}

                  <div className="sub-plan-icon">{plan.icon}</div>
                  <h3 className="sub-plan-name">{plan.name}</h3>
                  <p className="sub-plan-max">{plan.max}</p>

                  <div className="sub-plan-price">
                    <span className="sub-currency">Ksh</span>
                    <span className="sub-amount">{plan.prices[cycle].toLocaleString()}</span>
                    <span className="sub-period">/{CYCLES.find(c2=>c2.id===cycle)?.label.toLowerCase()}</span>
                  </div>

                  <div className="sub-plan-divider" />

                  <ul className="sub-features">
                    {plan.features.map(f => (
                      <li key={f} className="sub-feature-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                    {plan.missing.map(f => (
                      <li key={f} className="sub-feature-item missing">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="sub-select-btn"
                    style={{ background: selected?.id === plan.id ? plan.color : 'transparent',
                             color: selected?.id === plan.id ? '#fff' : plan.color,
                             borderColor: plan.color }}
                    onClick={(e) => { e.stopPropagation(); setSelected(plan); setStep("confirm"); }}
                  >
                    {selected?.id === plan.id ? "Selected ✓" : `Choose ${plan.name}`}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {step === "confirm" && selectedPlan && (
          <div className="sub-confirm">
            <button className="sub-back-btn" onClick={() => setStep("plans")}>
              ← Back to plans
            </button>

            <div className="sub-confirm-layout">
              {/* Plan summary */}
              <div className="sub-confirm-summary" style={{ '--plan-color': selectedPlan.color }}>
                <div className="sub-confirm-plan-icon">{selectedPlan.icon}</div>
                <h3>{selectedPlan.name} Plan</h3>
                <p className="sub-confirm-max">{selectedPlan.max}</p>

                <div className="sub-confirm-price-box">
                  <div className="sub-confirm-price-row">
                    <span>Plan</span>
                    <span>{selectedPlan.name}</span>
                  </div>
                  <div className="sub-confirm-price-row">
                    <span>Billing</span>
                    <span>{CYCLES.find(c=>c.id===cycle)?.label}</span>
                  </div>
                  <div className="sub-confirm-price-row total">
                    <span>Total</span>
                    <span>Ksh {price.toLocaleString()}</span>
                  </div>
                </div>

                <ul className="sub-features" style={{ marginTop: '1rem' }}>
                  {selectedPlan.features.map(f => (
                    <li key={f} className="sub-feature-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={selectedPlan.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment form */}
              <div className="sub-payment-form">
                <h4 className="sub-payment-title">Pay via M-Pesa</h4>
                <p className="sub-payment-sub">Enter your Safaricom number to receive the STK push</p>

                <div className="sub-field">
                  <label className="sub-label">M-Pesa Phone Number</label>
                  <div className="sub-phone-wrap">
                    <span>🇰🇪</span>
                    <input
                      className="sub-input"
                      type="number"
                      placeholder="254712345678"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                  <span className="sub-hint">Format: 254xxxxxxxxx</span>
                </div>

                <div className="sub-mpesa-badge">
                  <span className="sub-mpesa-m">M</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Lipa Na M-Pesa</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>Secure · Instant · Trusted</div>
                  </div>
                </div>

                <button
                  className="sub-pay-btn"
                  onClick={handleSubscribe}
                  disabled={loading}
                  style={{ background: selectedPlan.color }}
                >
                  {loading ? (
                    <><div className="sub-spinner" /> Processing...</>
                  ) : (
                    <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                    </svg> Pay Ksh {price.toLocaleString()}</>
                  )}
                </button>

                <p className="sub-secure-note">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Payment secured by Safaricom M-Pesa
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Subscription;
