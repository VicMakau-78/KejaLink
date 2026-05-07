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
            <h5 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  marginBottom: "1.2rem",
                  letterSpacing: "-0.01em"
                }}>KejaLink</h5>
            <p>
              Experience the pinnacle of sophisticated living where architectural brilliance meets unparalleled comfort. Our curated collection of premier estates redefines the epitome of housing luxury, offering sanctuary-like spaces tailored to your refined taste. 
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
  <h5 style={{
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    marginBottom: "1.2rem",
    letterSpacing: "-0.01em"
  }}>Follow Us</h5>
  <ul className="list-unstyled" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

    {/* Facebook */}
    <li>
      <a href="https://facebook.com" target="_blank" rel="noreferrer"
        style={{
          display: "flex", alignItems: "center", gap: "12px",
          textDecoration: "none", color: "#e0e0e0",
          transition: "color 0.2s, transform 0.2s",
          fontSize: "14px", fontWeight: 500,
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#1877F2"}
        onMouseLeave={e => e.currentTarget.style.color = "#e0e0e0"}
      >
        <span style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </span>
        Facebook
      </a>
    </li>

    {/* Twitter / X */}
    <li>
      <a href="https://twitter.com" target="_blank" rel="noreferrer"
        style={{
          display: "flex", alignItems: "center", gap: "12px",
          textDecoration: "none", color: "#e0e0e0",
          transition: "color 0.2s",
          fontSize: "14px", fontWeight: 500,
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#ffffff"}
        onMouseLeave={e => e.currentTarget.style.color = "#e0e0e0"}
      >
        <span style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "#000000", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, border: "1px solid rgba(255,255,255,0.15)",
        }}>
          {/* X logo */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </span>
        Twitter / X
      </a>
    </li>

    {/* Instagram */}
    <li>
      <a href="https://instagram.com/itz._kyamaz" target="_blank" rel="noreferrer"
        style={{
          display: "flex", alignItems: "center", gap: "12px",
          textDecoration: "none", color: "#e0e0e0",
          transition: "color 0.2s",
          fontSize: "14px", fontWeight: 500,
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#E1306C"}
        onMouseLeave={e => e.currentTarget.style.color = "#e0e0e0"}
      >
        <span style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
          </svg>
        </span>
        Instagram
      </a>
    </li>

    {/* WhatsApp */}
    <li>
      <a href="https://wa.me/254721840417" target="_blank" rel="noreferrer"
        style={{
          display: "flex", alignItems: "center", gap: "12px",
          textDecoration: "none", color: "#e0e0e0",
          transition: "color 0.2s",
          fontSize: "14px", fontWeight: 500,
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#25D366"}
        onMouseLeave={e => e.currentTarget.style.color = "#e0e0e0"}
      >
        <span style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L.057 23.5l5.797-1.522A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.374l-.36-.214-3.716.976.992-3.622-.235-.372A9.818 9.818 0 1 1 12 21.818z"/>
          </svg>
        </span>
        WhatsApp
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