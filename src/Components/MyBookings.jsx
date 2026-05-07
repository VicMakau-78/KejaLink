import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/MyBookings.css';

const API     = "https://vicmakau.alwaysdata.net/api";
const IMG_URL = "https://vicmakau.alwaysdata.net/static/images/";

// ── Status badge ──
const StatusBadge = ({ date }) => {
  const visitDate = new Date(date);
  const today     = new Date();
  today.setHours(0, 0, 0, 0);

  const isPast    = visitDate < today;
  const isToday   = visitDate.toDateString() === today.toDateString();

  if (isToday)  return <span className="mb-badge mb-badge-today">Today</span>;
  if (isPast)   return <span className="mb-badge mb-badge-past">Completed</span>;
  return              <span className="mb-badge mb-badge-upcoming">Upcoming</span>;
};

// ── Single booking card ──
const BookingCard = ({ booking, onBook }) => {
  const imgSrc = booking.product_photo
    ? IMG_URL + booking.product_photo
    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';

  const visitDate  = new Date(booking.visit_date);
  const isPast     = visitDate < new Date().setHours(0,0,0,0);

  const formattedDate = visitDate.toLocaleDateString('en-KE', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <div className={`mb-card ${isPast ? 'mb-card-past' : ''}`}>
      {/* Image */}
      <div className="mb-card-img-wrap">
        <img src={imgSrc} alt={booking.product_name} />
        <StatusBadge date={booking.visit_date} />
        <div className="mb-card-price-overlay">
          <span>Ksh {Number(booking.product_cost).toLocaleString()}</span>
        </div>
      </div>

      {/* Body */}
      <div className="mb-card-body">
        <h3 className="mb-prop-name">{booking.product_name}</h3>

        {/* Company */}
        <div className="mb-company-row">
          <div className="mb-company-avatar">
            {booking.company_name?.slice(0,2).toUpperCase() || 'CO'}
          </div>
          <div>
            <p className="mb-company-name">{booking.company_name || 'Unknown Company'}</p>
            <p className="mb-company-email">{booking.company_email}</p>
          </div>
        </div>

        <div className="mb-divider" />

        {/* Visit details */}
        <div className="mb-details-grid">
          <div className="mb-detail-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <div>
              <span className="mb-detail-label">Visit Date</span>
              <span className="mb-detail-value">{formattedDate}</span>
            </div>
          </div>

          <div className="mb-detail-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <div>
              <span className="mb-detail-label">Time</span>
              <span className="mb-detail-value">{booking.visit_time}</span>
            </div>
          </div>

          <div className="mb-detail-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <div>
              <span className="mb-detail-label">Booked As</span>
              <span className="mb-detail-value">{booking.first_name} {booking.last_name}</span>
            </div>
          </div>

          <div className="mb-detail-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17"/>
            </svg>
            <div>
              <span className="mb-detail-label">Phone</span>
              <span className="mb-detail-value">{booking.phone}</span>
            </div>
          </div>
        </div>

        {/* Booked on */}
        <p className="mb-booked-on">
          Booked on {new Date(booking.created_at).toLocaleDateString('en-KE', {
            day: 'numeric', month: 'short', year: 'numeric'
          })}
        </p>

        {/* Rebook button for past bookings */}
        {isPast && (
          <button className="mb-rebook-btn" onClick={() => onBook(booking)}>
            🔄 Book Again
          </button>
        )}
      </div>
    </div>
  );
};

// ── Main Component ──
const MyBookings = () => {
  const user     = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [filter, setFilter]       = useState("all"); // all | upcoming | past

  const fetchBookings = useCallback(async () => {
    if (!user?.user_id) {
      setError("Please log in to view your bookings.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${API}/get_user_bookings/${user.user_id}`);
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  }, [user?.user_id]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  // Filter bookings
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filtered = bookings.filter(b => {
    const d = new Date(b.visit_date);
    if (filter === "upcoming") return d >= today;
    if (filter === "past")     return d < today;
    return true;
  });

  const upcoming = bookings.filter(b => new Date(b.visit_date) >= today).length;
  const past     = bookings.filter(b => new Date(b.visit_date) < today).length;

  const handleRebook = (booking) => {
    // Navigate to listings so user can rebook
    navigate("/products");
  };

  return (
    <div className="mb-page">

      {/* Header */}
      <div className="mb-header">
        <div>
          <h1 className="mb-title">My Reservations</h1>
          <p className="mb-subtitle">
            Hi <strong>{user?.username}</strong> — here are all your showroom bookings
          </p>
        </div>
        <button className="mb-explore-btn" onClick={() => navigate("/products")}>
          + Book a Visit
        </button>
      </div>

      {/* Summary pills */}
      <div className="mb-summary-row">
        <div className="mb-summary-pill">
          <span className="mb-summary-num">{bookings.length}</span>
          <span className="mb-summary-label">Total</span>
        </div>
        <div className="mb-summary-pill mb-summary-upcoming">
          <span className="mb-summary-num">{upcoming}</span>
          <span className="mb-summary-label">Upcoming</span>
        </div>
        <div className="mb-summary-pill mb-summary-past">
          <span className="mb-summary-num">{past}</span>
          <span className="mb-summary-label">Completed</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-filters">
        {[
          { id: "all",      label: "All",      count: bookings.length },
          { id: "upcoming", label: "Upcoming", count: upcoming },
          { id: "past",     label: "Past",     count: past },
        ].map(f => (
          <button
            key={f.id}
            className={`mb-filter-btn ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            <span className="mb-filter-count">{f.count}</span>
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="mb-loading">
          <div className="mb-spinner" />
          <span>Loading your bookings...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-error">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="mb-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <p>
            {filter === "upcoming" ? "No upcoming bookings." :
             filter === "past"     ? "No past bookings." :
             "You haven't made any bookings yet."}
          </p>
          <button className="mb-explore-btn" onClick={() => navigate("/products")}>
            Explore Properties
          </button>
        </div>
      )}

      {/* Bookings grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="mb-grid">
          {filtered.map(booking => (
            <BookingCard
              key={booking.booking_id}
              booking={booking}
              onBook={handleRebook}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
