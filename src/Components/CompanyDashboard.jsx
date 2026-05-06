import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/CompanyDashboard.css';

const IMG_URL = "https://vicmakau.alwaysdata.net/static/images/";
const API = "https://vicmakau.alwaysdata.net/api";

const StatCard = ({ icon, label, value, accent }) => (
  <div className="dash-stat-card" style={{ '--accent': accent }}>
    <div className="dash-stat-icon">{icon}</div>
    <div className="dash-stat-value">{value}</div>
    <div className="dash-stat-label">{label}</div>
  </div>
);

const PropertyCard = ({ item, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const imgSrc = item.product_photo
    ? IMG_URL + item.product_photo
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';

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
        <p className="dash-prop-desc">
          {item.product_description?.slice(0, 75)}...
        </p>
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

// ── Booking row card ──
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

const CompanyDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingProps, setLoadingProps] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [toast, setToast] = useState("");
  const [activeTab, setActiveTab] = useState("properties");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // ── Fetch this company's properties ──
  const fetchMyProperties = useCallback(async () => {
    if (!user?.user_id) return;
    setLoadingProps(true);
    try {
      const res = await axios.get(`${API}/get_product_details`);
      const mine = res.data.filter(
        (item) => String(item.user_id) === String(user.user_id)
      );
      setProperties(mine);
    } catch (err) {
      console.error("Properties fetch error:", err);
    } finally {
      setLoadingProps(false);
    }
  }, [user?.user_id]);

  // ── Fetch bookings for this company ──
  const fetchBookings = useCallback(async () => {
    if (!user?.user_id) {
      console.warn("No user_id found in localStorage user object:", user);
      return;
    }
    setLoadingBookings(true);
    try {
      const res = await axios.get(`${API}/get_bookings/${user.user_id}`);
      console.log("Bookings fetched:", res.data); // debug
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Bookings fetch error:", err.response?.data || err.message);
    } finally {
      setLoadingBookings(false);
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
  }, [fetchMyProperties, fetchBookings]);

  const initials = user?.username?.slice(0, 2).toUpperCase() || 'CO';

  return (
    <div className="dash-page">

      {/* Toast */}
      {toast && <div className="dash-toast">{toast}</div>}

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

      {/* Stats */}
      <div className="dash-stats-row">
        <StatCard icon="🏠" label="Total Listings"   value={properties.length}                   accent="#0F6E56" />
        <StatCard icon="📅" label="Total Bookings"   value={loadingBookings ? "..." : bookings.length} accent="#d97706" />
        <StatCard icon="💰" label="Est. Revenue"
          value={bookings.length
            ? `Ksh ${bookings.reduce((s, b) => s + Number(b.product_cost || 0), 0).toLocaleString()}`
            : "Ksh 0"}
          accent="#7c3aed"
        />
        <StatCard icon="⭐" label="Avg Rating" value="—" accent="#db2777" />
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

      {/* ── Properties Tab ── */}
      {activeTab === 'properties' && (
        <>
          {loadingProps && (
            <div className="dash-loading">
              <div className="dash-spinner" />
              <span>Loading your properties...</span>
            </div>
          )}
          {!loadingProps && properties.length === 0 && (
            <div className="dash-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <p>No properties yet.</p>
              <Link to="/addproducts" className="dash-add-btn" style={{ marginTop: '1rem' }}>
                + Add your first property
              </Link>
            </div>
          )}
          <div className="dash-properties-grid">
            {properties.map((item) => (
              <PropertyCard key={item.product_id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}

      {/* ── Bookings Tab ── */}
      {activeTab === 'bookings' && (
        <>
          {loadingBookings && (
            <div className="dash-loading">
              <div className="dash-spinner" />
              <span>Loading bookings...</span>
            </div>
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
            {bookings.map((booking) => (
              <BookingCard key={booking.booking_id} booking={booking} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyDashboard;
