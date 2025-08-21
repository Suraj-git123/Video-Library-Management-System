import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);

  function loadVideos() {
    axios.get('http://127.0.0.1:5000/videos')
      .then(response => setVideos(response.data))
      .catch(error => console.error("Error fetching videos:", error));
  }

  return (
    <div className="dashboard-page">
      {/* Floating Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Dashboard Card */}
      <div className="dashboard-card">
        <div className="dashboard-glow"></div>
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <Link to="/add-video" className="btn-gradient bi bi-camera-video">
            Add Video
          </Link>
        </div>

        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map(video => (
                <tr key={video.VideoId}>
                  <td>{video.Title}</td>
                  <td>
                    <iframe
                      src={video.Url}
                      width="250"
                      height="140"
                      title={video.Title}
                      allowFullScreen
                    ></iframe>
                  </td>
                  <td>
                    <Link to={`/edit-video/${video.VideoId}`} className="btn-action btn-edit bi bi-pen"></Link>
                    <Link to={`/delete-video/${video.VideoId}`} className="btn-action btn-delete bi bi-trash"></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
