import React, { useState } from 'react';

function Footer() {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Comment submitted: " + comment);
    setComment("");
  };

  return (
    <footer className="bg-dark text-light mt-5 p-4">
      <div className="container">
        <div className="row">

          {/* Section 1 */}
          <div className="col-md-4">
            <h5>KejaLink</h5>
            <p>
              The epitome of housing luxury. Find your dream home with ease and comfort.
            </p>
          </div>

         {/* Section 2 - Brand Center */}
<div className="col-md-4 d-flex flex-col align-items-center text-center">
  <div style={{
    background: "linear-gradient(135deg, #180a3d 0%, #1d359e 50%, #1a0564 100%)",
    borderRadius: "20px",
    padding: "2rem 1.5rem",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(15, 110, 86, 0.25)",
  }}>
    {/* subtle grid texture */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    }} />

    {/* glow blob */}
    <div style={{
      position: "absolute", width: "160px", height: "160px",
      background: "rgba(93,202,165,0.2)", borderRadius: "50%",
      top: "-40px", right: "-40px", filter: "blur(40px)",
    }} />

    {/* house illustration */}
    <div style={{ position: "relative", zIndex: 1, marginBottom: "1rem" }}>
      <svg width="80" height="72" viewBox="0 0 80 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* House shadow */}
        <ellipse cx="40" cy="68" rx="28" ry="4" fill="rgba(0,0,0,0.15)" />
        {/* Main house body */}
        <rect x="14" y="36" width="52" height="30" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        {/* Roof */}
        <path d="M8 38 L40 8 L72 38Z" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinejoin="round"/>
        {/* Roof ridge accent */}
        <path d="M40 8 L40 18" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Door */}
        <rect x="33" y="48" width="14" height="18" rx="7" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        {/* Door handle */}
        <circle cx="44" cy="57" r="1.5" fill="rgba(255,255,255,0.7)"/>
        {/* Left window */}
        <rect x="18" y="42" width="10" height="10" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        <line x1="23" y1="42" x2="23" y2="52" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        <line x1="18" y1="47" x2="28" y2="47" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        {/* Right window */}
        <rect x="52" y="42" width="10" height="10" rx="2" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        <line x1="57" y1="42" x2="57" y2="52" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        <line x1="52" y1="47" x2="62" y2="47" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
        {/* Chimney */}
        <rect x="54" y="14" width="7" height="14" rx="1" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
        {/* Smoke puffs */}
        <circle cx="57" cy="11" r="3" fill="rgba(255,255,255,0.12)"/>
        <circle cx="60" cy="7" r="2.5" fill="rgba(255,255,255,0.08)"/>
        {/* Stars */}
        <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.5)"/>
        <circle cx="68" cy="20" r="1.2" fill="rgba(255,255,255,0.4)"/>
        <circle cx="25" cy="6" r="0.8" fill="rgba(255,255,255,0.3)"/>
      </svg>
    </div>

    {/* Brand name */}
    <div style={{ position: "relative", zIndex: 1 }}>
      <h4 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.6rem",
        fontWeight: 700,
        color: "#ffffff",
        margin: "0 0 6px",
        letterSpacing: "-0.01em",
      }}>
        Keja<span style={{ color: "#da7b10" }}>Link</span>
      </h4>

      <div style={{
        width: "36px", height: "2px",
        background: "rgba(255,255,255,0.3)",
        margin: "0 auto 10px",
        borderRadius: "2px",
      }} />

      <p style={{
        fontSize: "12px",
        color: "rgba(255,255,255,0.6)",
        margin: 0,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 500,
      }}>
        The Epitome of Housing Luxury
      </p>
    </div>
  </div>
</div>

          {/* Section 3 - Social Media */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com" className="text-light" target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-light" target="_blank" rel="noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-light" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="bg-light" />

        <p className="text-center mb-0">
          © {new Date().getFullYear()} KejaLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;