import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/CompanyDashboard.css';

const IMG_URL = "https://vicmakau.alwaysdata.net/static/images/";
const API = "https://vicmakau.alwaysdata.net/api";

// ── Stat Card ──
const StatCard = ({ icon, label, value, accent, sub }) => (
  <div className="dash-stat-card" style={{ '--accent': accent }}>
    <div className="dash-stat-icon">{icon}</div>
    <div className="dash-stat-value">{value}</div>
    <div className="dash-stat-label">{label}</div>
    {sub && <div className="dash-stat-sub">{sub}</div>}
  </div>
);

// ── Subscription Days Card ──
const SubCard = ({ subStatus, onManage }) => {
  if (!subStatus) return null;

  const { has_active, is_trial, plan_name, days_left, end_date, trial_used } = subStatus;

  if (!has_active) {
    return (
      <div className="dash-stat-card dash-sub-card dash-sub-expired" style={{ '--accent': '#dc2626' }}>
        <div className="dash-stat-icon">⚠️</div>
        <div className="dash-stat-value" style={{ fontSize: '1.2rem' }}>
          {trial_used ? "Expired" : "No Plan"}
        </div>
        <div className="dash-stat-label">Subscription</div>
        <button className="dash-sub-action-btn" onClick={onManage}>
          {trial_used ? "Renew Now" : "Get Started"}
        </button>
      </div>
    );
  }

  // Color based on urgency
  const accent = days_left <= 2 ? '#dc2626'
               : days_left <= 5 ? '#d97706'
               : '#0F6E56';

  const planLabel = is_trial ? "Free Trial"
    : plan_name ? plan_name.charAt(0).toUpperCase() + plan_name.slice(1) + " Plan"
    : "Active";

  return (
    <div className="dash-stat-card dash-sub-card" style={{ '--accent': accent }}>
      <div className="dash-stat-icon">
        {is_trial ? "🕐" : plan_name === "premium" ? "👑" : plan_name === "optimum" ? "🏢" : "🏠"}
      </div>
      <div className="dash-stat-value" style={{ color: accent }}>
        {days_left}d
      </div>
      <div className="dash-stat-label">{planLabel}</div>
      <div className="dash-stat-sub">Expires {end_date}</div>
      {days_left <= 5 && (
        <button className="dash-sub-action-btn" onClick={onManage}>
          {is_trial ? "Subscribe Now" : "Renew"}
        </button>
      )}
    </div>
  );
};

// ── Property Card ──
const PropertyCard = ({ item, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const imgSrc = item.product_photo
    ? IMG_URL + item.product_photo
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';

  const stars = Math.round(Number(item.avg_rating) || 0);

  return (
    <div className="dash-property-card">
      <div className="dash-card-image-wrap">
        <img src={imgSrc} alt={item.product_name} />
        <span className="dash-status-pill">
          <span className="dash-status-dot" />
          Active
        </span>
        <div className="dash-price-badge">
          <span>Ksh {Number(item.product_cost).toLocaleString()}</span>
        </div>
      </div>

      <div className="dash-card-body">
        <h3 className="dash-prop-title">{item.product_name}</h3>
        <p className="dash-prop-desc">{item.product_description?.slice(0, 75)}...</p>

        {/* ── Star rating display ── */}
        <div className="dash-prop-rating">
          <div className="dash-stars">
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ color: s <= stars ? '#d4af37' : '#d1d5db', fontSize: '14px' }}>★</span>
            ))}
          </div>
          <span className="dash-rating-text">
            {item.avg_rating ? Number(item.avg_rating).toFixed(1) : '0.0'}
            <span className="dash-rating-count"> ({item.total_ratings || 0})</span>
          </span>
        </div>

        <div className="dash-card-actions">
          <button className="dash-btn-edit">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
          {!confirmDelete ? (
            <button className="dash-btn-delete" onClick={() => setConfirmDelete(true)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
              Delete
            </button>
          ) : (
            <div className="dash-confirm-row">
              <span style={{ fontSize: '12px', color: '#dc2626' }}>Sure?</span>
              <button className="dash-btn-confirm-yes" onClick={() => { onDelete(item.product_id); setConfirmDelete(false); }}>Yes</button>
              <button className="dash-btn-confirm-no" onClick={() => setConfirmDelete(false)}>No</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Booking Card ──
const BookingCard = ({ booking }) => (
  <div className="dash-booking-card">
    <div className="dash-booking-top">
      <div>
        <p className="dash-booking-name">{booking.first_name} {booking.last_name}</p>
        <p className="dash-booking-prop">{booking.product_name}</p>
      </div>
      <span className="dash-booking-amount">Ksh {Number(booking.product_cost).toLocaleString()}</span>
    </div>
    <div className="dash-booking-meta">
      <span>📅 {booking.visit_date}</span>
      <span>🕐 {booking.visit_time}</span>
    </div>
    <div className="dash-booking-contact">
      <span>✉️ {booking.email}</span>
      <span>📞 {booking.phone}</span>
    </div>
    <span className="dash-booking-status">Confirmed</span>
  </div>
);

// ── Main Dashboard ──
const CompanyDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [properties, setProperties]       = useState([]);
  const [bookings, setBookings]           = useState([]);
  const [subStatus, setSubStatus]         = useState(null);
  const [loadingProps, setLoadingProps]   = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [toast, setToast]                 = useState("");
  const [activeTab, setActiveTab]         = useState("properties");
  const [showSubModal, setShowSubModal]   = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  // ── Fetch properties ──
  const fetchMyProperties = useCallback(async () => {
    if (!user?.user_id) return;
    setLoadingProps(true);
    try {
      const res = await axios.get(`${API}/get_product_details`);
      const mine = res.data.filter(item => String(item.user_id) === String(user.user_id));
      setProperties(mine);
    } catch (err) {
      console.error("Properties fetch error:", err);
    } finally {
      setLoadingProps(false);
    }
  }, [user?.user_id]);

  // ── Fetch bookings ──
  const fetchBookings = useCallback(async () => {
    if (!user?.user_id) return;
    setLoadingBookings(true);
    try {
      const res = await axios.get(`${API}/get_bookings/${user.user_id}`);
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Bookings fetch error:", err.response?.data || err.message);
    } finally {
      setLoadingBookings(false);
    }
  }, [user?.user_id]);

  // ── Fetch subscription status ──
  const fetchSubStatus = useCallback(async () => {
    if (!user?.user_id) return;
    try {
      const res = await axios.get(`${API}/subscription_status/${user.user_id}`);
      setSubStatus(res.data);
    } catch (err) {
      console.error("Subscription fetch error:", err);
    }
  }, [user?.user_id]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${API}/delete_product/${productId}`);
      showToast("Property removed successfully.");
      fetchMyProperties();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchMyProperties();
    fetchBookings();
    fetchSubStatus();
  }, [fetchMyProperties, fetchBookings, fetchSubStatus]);

  // ── Calculate avg rating across ALL company properties ──
  const ratingsWithData = properties.filter(p => p.avg_rating && Number(p.avg_rating) > 0);
  const overallAvgRating = ratingsWithData.length > 0
    ? (ratingsWithData.reduce((sum, p) => sum + Number(p.avg_rating), 0) / ratingsWithData.length).toFixed(1)
    : null;

  const totalRatings = properties.reduce((sum, p) => sum + Number(p.total_ratings || 0), 0);

  // ── Render avg rating stars ──
  const avgStars = Math.round(Number(overallAvgRating) || 0);

  const initials = user?.username?.slice(0, 2).toUpperCase() || 'CO';

  return (
    <div className="dash-page">

      {/* Toast */}
      {toast && <div className="dash-toast">{toast}</div>}

      {/* Subscription modal */}
      {showSubModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          {/* Lazy-load Subscription to avoid circular imports */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '2rem', maxWidth: 400, width: '90%', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>Manage Subscription</h3>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '1.5rem' }}>
              Go to Add Property page to manage your subscription plan.
            </p>
            <Link to="/addproducts" style={{
              display: 'inline-block', background: '#0F6E56', color: '#fff',
              borderRadius: 100, padding: '10px 24px', textDecoration: 'none',
              fontWeight: 600, fontSize: '14px', marginRight: '10px'
            }}>
              Go to Plans
            </Link>
            <button onClick={() => setShowSubModal(false)} style={{
              background: '#f0ebe0', border: 'none', borderRadius: 100,
              padding: '10px 20px', cursor: 'pointer', fontWeight: 600, fontSize: '14px'
            }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="dash-header">
        <div className="dash-header-left">
          <div className="dash-avatar">{initials}</div>
          <div>
            <h1 className="dash-greeting">Good day, {user?.username} 👋</h1>
            <p className="dash-subtitle">Manage your property listings and bookings</p>
          </div>
        </div>
        <Link to="/addproducts" className="dash-add-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Property
        </Link>
      </div>

      {/* Stats — now 5 cards */}
      <div className="dash-stats-row">
        <StatCard
          icon="🏠"
          label="Total Listings"
          value={properties.length}
          accent="#0F6E56"
        />
        <StatCard
          icon="📅"
          label="Total Bookings"
          value={loadingBookings ? "..." : bookings.length}
          accent="#d97706"
        />
        <StatCard
          icon="💰"
          label="Est. Revenue"
          value={bookings.length
            ? `Ksh ${bookings.reduce((s, b) => s + Number(b.product_cost || 0), 0).toLocaleString()}`
            : "Ksh 0"}
          accent="#7c3aed"
        />

        {/* ── Avg Rating card ── */}
        <div className="dash-stat-card" style={{ '--accent': '#d4af37' }}>
          <div className="dash-stat-icon">⭐</div>
          <div className="dash-stat-value" style={{ fontSize: overallAvgRating ? '2rem' : '1.2rem' }}>
            {overallAvgRating ?? "No ratings"}
          </div>
          {overallAvgRating && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', margin: '4px 0' }}>
              {[1,2,3,4,5].map(s => (
                <span key={s} style={{ color: s <= avgStars ? '#d4af37' : '#e5e7eb', fontSize: '13px' }}>★</span>
              ))}
            </div>
          )}
          <div className="dash-stat-label">Avg Rating</div>
          {totalRatings > 0 && (
            <div className="dash-stat-sub">{totalRatings} review{totalRatings !== 1 ? 's' : ''}</div>
          )}
        </div>

        {/* ── Subscription days card ── */}
        <SubCard subStatus={subStatus} onManage={() => setShowSubModal(true)} />
      </div>

      {/* Tabs */}
      <div className="dash-tabs">
        <button
          className={`dash-tab ${activeTab === 'properties' ? 'dash-tab-active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >
          Properties
          <span className="dash-tab-badge">{properties.length}</span>
        </button>
        <button
          className={`dash-tab ${activeTab === 'bookings' ? 'dash-tab-active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
          <span className="dash-tab-badge">{bookings.length}</span>
        </button>
      </div>

      {/* Properties Tab */}
      {activeTab === 'properties' && (
        <>
          {loadingProps && (
            <div className="dash-loading"><div className="dash-spinner" /><span>Loading your properties...</span></div>
          )}
          {!loadingProps && properties.length === 0 && (
            <div className="dash-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <p>No properties yet.</p>
              <Link to="/addproducts" className="dash-add-btn" style={{ marginTop: '1rem' }}>+ Add your first property</Link>
            </div>
          )}
          <div className="dash-properties-grid">
            {properties.map(item => (
              <PropertyCard key={item.product_id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <>
          {loadingBookings && (
            <div className="dash-loading"><div className="dash-spinner" /><span>Loading bookings...</span></div>
          )}
          {!loadingBookings && bookings.length === 0 && (
            <div className="dash-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <p>No bookings yet.</p>
            </div>
          )}
          <div className="dash-bookings-grid">
            {bookings.map(booking => (
              <BookingCard key={booking.booking_id} booking={booking} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyDashboard;
