// UserDashboard.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserDashboard.css";
import UserProfile from "./user-profile";
import Navbar from "./navbar";

function UserDashboard() {
  const [cookies, , removeCookie] = useCookies(["userid"]);
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  // Fetch videos and current user
  useEffect(() => {
    // Fetch all videos
    axios
      .get("http://127.0.0.1:5000/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error("Error fetching videos:", err));

    // Fetch current user by UserId string from cookie
    if (cookies["userid"]) {
      axios
        .get(`http://127.0.0.1:5000/user/${cookies["userid"]}`)
        .then((res) => {
          console.log("Fetched user:", res.data);
          setUser(res.data);
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [cookies]);

  return (
    <div className="dashboard">
    <Navbar />

      {/* User Profile Box */}
      {showProfile && user && (
        <UserProfile user={user} onClose={() => setShowProfile(false)} />
      )}

      {/* Video Grid */}
      <main className="video-grid">
        {videos.map((video) => (
         <Link to={`/play-video/${video.VideoId}`} key={video.VideoId}>
  <div className="video-card">
    <div className="thumbnail">
      <iframe
        src={video.Url}
        title={video.Title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div className="video-details">
      <h4 className="title">{video.Title}</h4>
      <div className="stats">
        <span>
          <i className="bi bi-eye-fill"></i> {video.Views}
        </span>
        <span>
          <i className="bi bi-hand-thumbs-up"></i> {video.Likes}
        </span>
        <span>
          <i className="bi bi-hand-thumbs-down"></i> {video.Dislikes}
        </span>
      </div>
    </div>
  </div>
</Link>


        ))}
      </main>
    </div>
  );
}

export default UserDashboard;
