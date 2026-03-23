import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/signin";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
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

            {/* COMPANY ONLY */}
            {user?.role === "company" && (
              <li className="nav-item">
                <Link className="nav-link" to="/addproducts">
                  Add Property
                </Link>
              </li>
            )}

            {/* LOGGED IN USERS */}
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/makepayment">
                  Payments
                </Link>
              </li>
            )}

          </ul>

          {/* RIGHT SIDE */}
          <div className="d-flex align-items-center">

            {!user ? (
              <>
                <Link to="/signin" className="btn btn-outline-dark btn-sm me-2">
                  Sign In
                </Link>

                <Link to="/signup" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="me-3 text-muted">
                  👋 Hi, <strong>{user.username}</strong> ({user.role})
                </span>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
              
            )}

            {user?.role === "company" && (
            <li className="nav-item">
              <Link className="nav-link" to="/company-dashboard">
                Dashboard
              </Link>
            </li>
          )}

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;