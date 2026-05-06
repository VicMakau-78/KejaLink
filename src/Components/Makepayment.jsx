import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../css/Makepayment.css';

const Makepayment = () => {
  const { product } = useLocation().state || {};
  const navigate = useNavigate();

  const img_url = "https://vicmakau.alwaysdata.net/static/images/";

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const bookingData = new FormData();
      bookingData.append("product_id", product.product_id);
      bookingData.append("first_name", firstName);
      bookingData.append("last_name", lastName);
      bookingData.append("email", email);
      bookingData.append("phone", number);
      bookingData.append("visit_date", visitDate);
      bookingData.append("visit_time", visitTime);

      await axios.post("https://vicmakau.alwaysdata.net/api/book_visit", bookingData);

      const paymentData = new FormData();
      paymentData.append("phone", number);
      paymentData.append("amount", product.product_cost);

      await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", paymentData);

      setSuccess("Booking confirmed! Check your phone to complete M-Pesa payment.");
      setLoading(false);
    }  catch (err) {
  setLoading(false);
  // Show the actual backend error if available
  const msg = err.response?.data?.error || err.message || "Something went wrong";
  setError(msg);
}
  };

  // Tomorrow as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const imgSrc = product?.product_photo
    ? img_url + product.product_photo
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';

  return (
    <div className="pay-page">

      {/* Back button */}
      <button className="pay-back-btn" onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to Listings
      </button>

      <div className="pay-layout">

        {/* LEFT — Property Summary */}
        <div className="pay-property-panel">
          <div className="pay-img-wrap">
            <img src={imgSrc} alt={product?.product_name} />
            <div className="pay-img-overlay">
              <span className="pay-verified-pill">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Verified Property
              </span>
            </div>
          </div>

          <div className="pay-property-info">
            <h2 className="pay-prop-name">{product?.product_name}</h2>
            <p className="pay-prop-desc">{product?.product_description}</p>

            <div className="pay-price-row">
              <span className="pay-price-label">Visit Fee</span>
              <span className="pay-price-amount">Ksh {Number(product?.product_cost).toLocaleString()}</span>
            </div>

            <div className="pay-divider" />

            {/* What's included */}
            <p className="pay-includes-label">What's included</p>
            {["Guided property tour", "Agent consultation", "Booking confirmation", "M-Pesa secure payment"].map((item) => (
              <div key={item} className="pay-include-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{item}</span>
              </div>
            ))}

            {/* M-Pesa badge */}
            <div className="pay-mpesa-badge">
              <span className="pay-mpesa-logo">M</span>
              <div>
                <div className="pay-mpesa-title">Lipa Na M-Pesa</div>
                <div className="pay-mpesa-sub">Secure · Instant · Trusted</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Booking Form */}
        <div className="pay-form-panel">
          <div className="pay-form-header">
            <h3 className="pay-form-title">Book a Showroom Visit</h3>
            <p className="pay-form-subtitle">Fill in your details to confirm your visit</p>
          </div>

          {loading && <div className="pay-loader-wrap"><Loader /></div>}

          {success && (
            <div className="pay-success-banner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              {success}
            </div>
          )}

          {error && (
            <div className="pay-error-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handlesubmit} className="pay-form">

            {/* Name row */}
            <div className="pay-field-row">
              <div className="pay-field">
                <label className="pay-label">First Name</label>
                <input
                  className="pay-input"
                  type="text"
                  placeholder="John"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="pay-field">
                <label className="pay-label">Last Name</label>
                <input
                  className="pay-input"
                  type="text"
                  placeholder="Doe"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="pay-field">
              <label className="pay-label">Email Address</label>
              <input
                className="pay-input"
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Date & Time row */}
            <div className="pay-field-row">
              <div className="pay-field">
                <label className="pay-label">Visit Date</label>
                <input
                  className="pay-input"
                  type="date"
                  required
                  min={minDate}
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                />
              </div>
              <div className="pay-field">
                <label className="pay-label">Preferred Time</label>
                <select
                  className="pay-input"
                  required
                  value={visitTime}
                  onChange={(e) => setVisitTime(e.target.value)}
                >
                  <option value="">Select time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>
            </div>

            <div className="pay-field">
              <label className="pay-label">M-Pesa Phone Number</label>
              <div className="pay-phone-wrap">
                <span className="pay-phone-prefix">🇰🇪</span>
                <input
                  className="pay-input pay-input-phone"
                  type="number"
                  placeholder="254712345678"
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <span className="pay-field-hint">Format: 254xxxxxxxxx</span>
            </div>

            {/* Order summary */}
            <div className="pay-summary">
              <div className="pay-summary-row">
                <span>Visit fee</span>
                <span>Ksh {Number(product?.product_cost).toLocaleString()}</span>
              </div>
              <div className="pay-summary-row">
                <span>Service fee</span>
                <span>Ksh 50</span>
              </div>
              <div className="pay-summary-row pay-summary-total">
                <span>Total</span>
                <span>Ksh {(Number(product?.product_cost) + 50).toLocaleString()}</span>
              </div>
            </div>

            <button type="submit" className="pay-submit-btn" disabled={loading}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <div className="pay-btn-spinner" /> Processing...
                </span>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  Pay & Confirm Booking
                </>
              )}
            </button>

            <p className="pay-secure-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Secured by M-Pesa. Your details are safe.
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;
