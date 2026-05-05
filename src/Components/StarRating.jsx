import React, { useState } from 'react';

const StarRating = ({ productId, avgRating, totalRatings, onRate }) => {
  const [hovered, setHovered] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const filled = hovered ?? Math.round(Number(avgRating) || 0);

  const handleClick = (star) => {
    setSubmitted(true);
    onRate(productId, star);
    // reset submitted flash after 1.5s
    setTimeout(() => setSubmitted(false), 1500);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', margin: '10px 0' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleClick(star)}
          style={{
            fontSize: '20px',
            cursor: 'pointer',
            color: star <= filled ? '#d4af37' : '#d1d5db',
            display: 'inline-block',
            transform: hovered === star ? 'scale(1.35)' : 'scale(1)',
            transition: 'color 0.15s ease, transform 0.15s ease',
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}

      {/* Average display */}
      <span style={{
        fontSize: '12px',
        color: '#888',
        marginLeft: '6px',
        fontWeight: 500,
      }}>
        {avgRating ? Number(avgRating).toFixed(1) : '0.0'}
        {totalRatings ? ` (${totalRatings})` : ' (0)'}
      </span>

      {/* Submitted flash */}
      {submitted && (
        <span style={{
          fontSize: '11px',
          color: '#059669',
          marginLeft: '6px',
          fontWeight: 600,
          animation: 'fadeOut 1.5s forwards',
        }}>
          ✔ Rated!
        </span>
      )}

      <style>{`
        @keyframes fadeOut {
          0%   { opacity: 1; }
          70%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default StarRating;
