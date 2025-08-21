import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/DeleteVideo.css";

function DeleteVideo() {
  const params = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);

  function GetVideo() {
    axios.get(`http://127.0.0.1:5000/video/${params.id}`).then((response) => {
      // API gives array with 1 element, so pick [0]
      setVideo(response.data[0]);
    });
  }

  function handleDelete() {
    axios.delete(`http://127.0.0.1:5000/delete-video/${params.id}`).then(() => {
      navigate("/admin-dash"); // redirect after delete
    });
  }

  useEffect(() => {
    GetVideo();
  }, []);

  if (!video) return <div className="auth-page">Loading...</div>;

  return (
    <div className="auth-page">
      {/* Floating orbs background */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Card */}
      <div className="auth-card">
        <div className="card-glow"></div>

        <header className="auth-header">
          <h2 className="brand-title">
            Delete <span>Video</span>
          </h2>
          <p className="subtitle">Are you sure you want to delete?</p>
        </header>

        <div className="card-body" style={{ textAlign: "center" }}>
          <h3>{video.Title}</h3>
          <iframe
            width="100%"
            height="220"
            src={video.Url}
            title={video.Title}
            frameBorder="0"
            allowFullScreen
            style={{ borderRadius: "12px", marginTop: "10px" }}
          ></iframe>
        </div>

        <div className="meta-row" style={{ marginTop: "18px" }}>
          <button className="btn-primary" onClick={handleDelete}>
            Yes, Delete
          </button>
          <button
            className="btn-primary"
            style={{
              background: "linear-gradient(90deg, #a8b2d1, #6c757d)",
              color: "white",
            }}
            onClick={() => navigate("/admin-dash")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteVideo;
