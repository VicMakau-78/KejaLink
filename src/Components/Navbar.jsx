import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/signin";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top ">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          🏡 KejaLink
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          {/* LEFT SIDE */}
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <Link to="/products" className="nav-link">
              Listings
            </Link>

            {/* COMPANY ONLY */}
            {user?.role === "company" && (
              <li className="nav-item">
                <Link className="nav-link" to="/addproducts">
                  Add Property
                </Link>
              </li>
            )}

            {user?.role === "company" && (
            <li className="nav-item">
              <Link className="nav-link" to="/company-dashboard">
                Dashboard
              </Link>
            </li>
          )}

          </ul>

          {/* RIGHT SIDE */}
<div className="d-flex align-items-center gap-2">
  {!user ? (
    <>
      <Link to="/signin" className="btn-kejalink-outline">
        Sign In
      </Link>
      <Link to="/signup" className="btn-kejalink-fill">
        Sign Up
      </Link>
    </>
  ) : (
    <>
      <div className="d-flex align-items-center gap-2 me-2">
        <div className="kejalink-avatar">
          {user.username?.slice(0, 2).toUpperCase()}
        </div>
        <span className="text-muted" style={{ fontSize: "13.5px" }}>
          Hi, <strong>{user.username}</strong>
        </span>
      </div>
      <button className="btn-kejalink-danger" onClick={handleLogout}>
        Logout
      </button>
    </>
  )}
</div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;