import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'

function Navbar() {
  const navigate = useNavigate();

  // ✅ Use state instead of reading localStorage directly
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    // ✅ Re-read user whenever login event fires
    const handleLogin = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    // ✅ Also update on route changes (covers edge cases)
    window.addEventListener("userLoggedIn", handleLogin);

    return () => {
      window.removeEventListener("userLoggedIn", handleLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);                        // ✅ Clears navbar instantly
    navigate("/signin");
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
            <li className="nav-item">
              <Link className="nav-link" to="/products">Listings</Link>
            </li>

            {user?.role === "company" && (
              <li className="nav-item">
                <Link className="nav-link" to="/addproducts">Add Property</Link>
              </li>
            )}

            {user?.role === "company" && (
              <li className="nav-item">
                <Link className="nav-link" to="/company-dashboard">Dashboard</Link>
              </li>
            )}
          </ul>

          {/* RIGHT SIDE */}
          <div className="d-flex align-items-center gap-2">
            {!user ? (
              <>
                <Link to="/signin" className="btn-kejalink-outline">Sign In</Link>
                <Link to="/signup" className="btn-kejalink-fill">Sign Up</Link>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center gap-2 me-2">
                  <div className="kejalink-avatar">
                    {user.username?.slice(0, 2).toUpperCase()}
                  </div>
                  <span style={{ fontSize: "13.5px" }} className="text-muted">
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