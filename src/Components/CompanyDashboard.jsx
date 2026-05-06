import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/CompanyDashboard.css';

const IMG_URL = "https://vicmakau.alwaysdata.net/static/images/";

const StatCard = ({ icon, label, value, accent }) => (
  <div className="dash-stat-card" style={{ '--accent': accent }}>
    <div className="dash-stat-icon">{icon}</div>
    <div className="dash-stat-value">{value}</div>
    <div className="dash-stat-label">{label}</div>
  </div>
);

const PropertyCard = ({ item, imgUrl, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const imgSrc = item.product_photo
    ? imgUrl + item.product_photo
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';

  return (
    <div className="dash-property-card">
      {/* Image */}
      <div className="dash-card-image-wrap">
        <img src={imgSrc} alt={item.product_name} />

        {/* Status pill */}
        <span className="dash-status-pill">
          <span className="dash-status-dot" />
          Active
        </span>

        {/* Price overlay */}
        <div className="dash-price-badge">
          <span>Ksh {Number(item.product_cost).toLocaleString()}</span>
        </div>
      </div>

      {/* Body */}
      <div className="dash-card-body">
        <h3 className="dash-prop-title">{item.product_name}</h3>
        <p className="dash-prop-desc">
          {item.product_description?.slice(0, 75)}...
        </p>

        {/* Actions */}
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
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
              Delete
            </button>
          ) : (
            <div className="dash-confirm-row">
              <span style={{ fontSize: '12px', color: '#dc2626' }}>Sure?</span>
              <button className="dash-btn-confirm-yes" onClick={() => onDelete(item.product_id)}>Yes</button>
              <button className="dash-btn-confirm-no" onClick={() => setConfirmDelete(false)}>No</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CompanyDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchMyProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://vicmakau.alwaysdata.net/api/get_product_details`
      );
      const myProps = response.data.filter(
        (item) => String(item.user_id) === String(user?.user_id)
      );
      setProperties(myProps);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const [bookings, setBookings] = useState([]);

// Add this inside fetchMyProperties or a separate useEffect:
const fetchBookings = async () => {
  try {
    const res = await axios.get(
      `https://vicmakau.alwaysdata.net/api/get_bookings/${user?.user_id}`
    );
    setBookings(res.data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchMyProperties();
  fetchBookings();
}, []);

// Then update the stat card:
<StatCard icon="📅" label="Bookings" value={bookings.length} accent="#d97706" />

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://vicmakau.alwaysdata.net/api/delete_product/${productId}`
      );
      showToast("Property removed successfully.");
      fetchMyProperties();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchMyProperties(); }, []);

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
            <p className="dash-subtitle">Manage your property listings from here</p>
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
        <StatCard icon="🏠" label="Total Listings" value={properties.length} accent="#0F6E56" />
        <StatCard icon="👁️" label="Profile Views" value="1,234" accent="#7c3aed" />
        <StatCard icon="📅" label="Bookings" value="—" accent="#d97706" />
        <StatCard icon="⭐" label="Avg Rating" value="—" accent="#db2777" />
      </div>

      {/* Properties Grid */}
      <div className="dash-section-header">
        <h2 className="dash-section-title">My Properties</h2>
        <span className="dash-count-badge">{properties.length} listing{properties.length !== 1 ? 's' : ''}</span>
      </div>

      {loading && (
        <div className="dash-loading">
          <div className="dash-spinner" />
          <span>Loading your properties...</span>
        </div>
      )}

      {!loading && properties.length === 0 && (
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
          <PropertyCard
            key={item.product_id}
            item={item}
            imgUrl={IMG_URL}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyDashboard;
