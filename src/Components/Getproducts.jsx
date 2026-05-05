import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import '../css/Getproducts.css';
import StarRating from './StarRating';

const IMG_URL = "https://vicmakau.alwaysdata.net/static/images/";



/* ── Single Card ── */
const PropertyCard = ({ product, onRate, onBook, onCompanyClick }) => {
  const fallbackImg = `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80`;
  const imgSrc = product.product_photo
    ? IMG_URL + product.product_photo
    : fallbackImg;

  const companyImg = product.company_logo
    ? IMG_URL + product.company_logo
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(product.company_name || 'C')}&background=1a1a1a&color=fff&size=40`;

  const price = product.product_cost
    ? `Ksh ${Number(product.product_cost).toLocaleString()}`
    : 'Price on request';

  return (
    <div className="property-card">
      {/* Image */}
      <div className="card-image-wrap">
        <img src={imgSrc} alt={product.product_name} />

        {/* type pill */}
        <span className="type-pill">{product.product_type || 'Property'}</span>

        {/* verified badge */}
        {product.role === 'company' && (
          <span className="verified-pill">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Verified
          </span>
        )}

        {/* price overlay */}
        <div className="price-badge">
          <span>{price}</span>
        </div>
      </div>

      {/* Body */}
      <div className="card-body-lux">
        <h3>{product.product_name}</h3>

        {product.product_address && (
          <p className="card-address">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {product.product_address}
          </p>
        )}

        {/* Specs */}
        <div className="card-specs">
          {product.bedrooms && (
            <span className="spec-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              {product.bedrooms} beds
            </span>
          )}
          {product.bathrooms && (
            <span className="spec-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h16M4 12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4M4 12v4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4"/>
              </svg>
              {product.bathrooms} bath
            </span>
          )}
          {product.area && (
            <span className="spec-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
              </svg>
              {product.area} sqft
            </span>
          )}
          {!product.bedrooms && !product.bathrooms && !product.area && (
            <span className="spec-item" style={{ color: '#aaa', fontSize: '12px' }}>Details available on visit</span>
          )}
        </div>

        {/* Description */}
        <p style={{ fontSize: '13px', color: '#777', marginBottom: '10px', lineHeight: 1.5 }}>
          {product.product_description?.slice(0, 80)}...
        </p>

        {/* Stars */}
        <StarRating
  productId={product.product_id}
  avgRating={product.avg_rating}
  totalRatings={product.total_ratings}
  onRate={onRate}
/>

        {/* Company + Book */}
        <div className="company-row">
          <div className="company-info">
            <img
              className="company-avatar"
              src={companyImg}
              alt={product.company_name}
            />
            <div>
              <div
                className="company-name"
                onClick={() => onCompanyClick(product)}
              >
                {product.company_name || 'Unknown Company'}
              </div>
              <div className="company-verified">
                {product.role === 'company' ? '✔ Verified Company' : 'Unverified'}
              </div>
            </div>
          </div>

          <button
            className="btn-book"
            onClick={() => onBook(product)}
          >
            Book Visit
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ── */
const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitRating = async (productId, rating) => {
  try {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("rating", rating);

    const res = await axios.post(
      "https://vicmakau.alwaysdata.net/api/add_rating",
      formData
    );

    if (res.status === 201) {
      // Pull the real updated average from the DB
      const ratingRes = await axios.get(
        `https://vicmakau.alwaysdata.net/api/get_rating/${productId}`
      );
      const { avg_rating, total_ratings } = ratingRes.data;

      setProducts((prev) =>
        prev.map((p) =>
          p.product_id === productId
            ? { ...p, avg_rating, total_ratings }
            : p
        )
      );
    }
  } catch (err) {
    console.error("Rating error:", err);
  }
};

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://vicmakau.alwaysdata.net/api/get_product_details');
      const all = Array.isArray(response.data) ? response.data : [];
      const company = all.filter((p) => p.company_name);
      setProducts(company.length ? company : all);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleCompanyClick = (product) =>
    navigate('/company', {
      state: {
        company: {
          user_id: product.user_id,
          company_name: product.company_name,
        },
      },
    });

  const handleBook = (product) =>
    navigate('/makepayment', { state: { product } });

  return (
    <div className="container">
      {/* Header */}
      <div className="listings-header">
        <h2>Featured Properties</h2>
        <p>Discover premium listings from verified housing companies</p>
      </div>

      {/* Loading / Error */}
      {loading && <Loader />}
      {error && <p className="error-msg">{error}</p>}

      {/* Grid */}
      {!loading && !error && products.length === 0 && (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <p>No properties available yet.</p>
        </div>
      )}

      <div className="properties-grid">
        {products.map((product) => (
          <PropertyCard
            key={product.product_id}
            product={product}
            onRate={submitRating}
            onBook={handleBook}
            onCompanyClick={handleCompanyClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Getproducts;
