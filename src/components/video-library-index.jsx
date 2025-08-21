import React from "react";
import { Link } from "react-router-dom";
import "../styles/VideoLibraryIndex.css";

function VideoLibraryIndex() {
  return (
    <div className="index-page">
      {/* Animated floating background circles */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      {/* Main Card */}
      <div className="index-card">
        <h1 className="title">🎬 Video Library</h1>
        <p className="subtitle">Your world of videos, anytime, anywhere</p>

        <div className="btn-row">
          <Link to="/user-login" className="btn-glow btn-primary">
            User Login
          </Link>
          <Link to="/admin-login" className="btn-glow btn-warning">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VideoLibraryIndex;

