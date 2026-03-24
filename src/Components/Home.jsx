import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section>

      {/* HERO */}
      <div className="hero-container">

        {/* Background */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          className="hero-img"
          alt="Luxury Home"
        />

        {/* Overlay */}
        <div className="hero-overlay"></div>

        {/* Content */}
        <div className="hero-content container">

          <div className="hero-box">

            {/* Badge */}
            <div className="hero-badge">
              <span className="dot"></span>
              Premium Verified Listings
            </div>

            {/* Title */}
            <h1 className="hero-title">
              Discover Your <br />
              <span>Perfect Space</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-text">
              Connect with verified premium housing companies and experience luxury living.
            </p>

            {/* Buttons */}
            <div className="hero-buttons">

              <button
                className="btn-primary-modern"
                onClick={() => navigate("/products")}
              >
                Explore Properties
              </button>

              {user?.role === "company" ? (
                <button
                  className="btn-glass"
                  onClick={() => navigate("/addproducts")}
                >
                  List Your Property
                </button>
              ) : (
                <button
                  className="btn-glass"
                  onClick={() => navigate("/signin")}
                >
                  List Your Property
                </button>
              )}

            </div>

            {/* Features */}
            <div className="hero-features">
              <span>✔ Verified Companies</span>
              <span>✔ Instant Booking</span>
              <span>✔ Secure Payments</span>
            </div>

          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section">
        <div className="container">
          <div className="row text-center">

            <div className="col-md-3">
              <h2>500+</h2>
              <p>Verified Companies</p>
            </div>

            <div className="col-md-3">
              <h2>12,000+</h2>
              <p>Premium Listings</p>
            </div>

            <div className="col-md-3">
              <h2>50k+</h2>
              <p>Showroom Visits</p>
            </div>

            <div className="col-md-3">
              <h2>98%</h2>
              <p>Satisfaction Rate</p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default Home;