import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get userId from localStorage
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser?.UserId) {
      // Fetch full user details from backend
      axios
        .get(`http://127.0.0.1:5000/user/${loggedUser.UserId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-left">
        <h2 className="logo ms-3" onClick={() => navigate("/")}>
          <span>MiniTube</span>
          <span className="bi bi-youtube ms-2"></span>
        </h2>
      </div>

      {/* Search bar */}
      <div className="navbar-middle">
        <input
          type="text"
          className="search-input"
          placeholder="Search videos..."
        />
        <button className="search-btn bi bi-search"></button>
      </div>

      {/* Profile / dropdown */}
      <div className="navbar-right">
        {!user ? (
          <span className="nav-link">Profile</span>
        ) : (
          <div className="profile-container">
            <button
              className="btn btn-primary bi bi-person-fill"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.UserName || "Profile"}
            </button>

            {showDropdown && (
              <div className="profile-dropdown">
                <p><strong>{user.UserName}</strong></p>
                <p>Email: {user.Email}</p>
                <p>Mobile: {user.Mobile}</p>
                <p>ID: {user.UserId}</p>
                <button className="btn-signout" onClick={handleSignout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
