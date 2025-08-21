import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/PlayVideo.css";
import Navbar from "./navbar";

function PlayVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userName = currentUser?.UserName || "Guest User";
  const userId = currentUser?.UserId || "0";

  useEffect(() => {
    // Fetch main video
    axios
      .get(`http://127.0.0.1:5000/video/${id}`)
      .then((res) => {
        const videoData = res.data[0];
        setVideo(videoData);
        setComments(videoData.Comments || []);
      })
      .catch((err) => console.error("Error fetching video:", err));

    // Fetch recommended videos
    axios
      .get("http://127.0.0.1:5000/videos")
      .then((res) => setRecommended(res.data))
      .catch((err) => console.error("Error fetching recommended:", err));
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setLoadingComments(true);

    axios
      .post(`http://127.0.0.1:5000/video/${id}/comments`, {
        User: userName,
        UserId: userId,
        Text: newComment,
        Date: new Date().toISOString(),
      })
      .then((res) => {
        setComments([res.data.comment, ...comments]);
        setNewComment("");
      })
      .catch((err) => console.error("Error posting comment:", err))
      .finally(() => setLoadingComments(false));
  };

  if (!video) return <p>Loading...</p>;

  return (
    <div className="play-video-wrapper">
      {/* Navbar */}
      <Navbar user={currentUser} onSignOut={() => navigate("/")} />

      {/* Main content */}
      <div className="play-video-page ">
        {/* Left side: main video */}
        <div className="main-video p-5">
          <div className="video-player">
            <iframe
              src={video.Url}
              title={video.Title}
              width="100%"
              height="500"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <h2>{video.Title}</h2>
          <p>{video.Views} views</p>

          {/* Likes and Dislikes */}
          <div className="stats">
            <span>
              <i className="bi bi-hand-thumbs-up"></i> {video.Likes}
            </span>
            <span>
              <i className="bi bi-hand-thumbs-down"></i> {video.Dislikes}
            </span>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <h3>Comments</h3>
            <div className="comment-box">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim() || loadingComments}
              >
                {loadingComments ? "Posting..." : "Comment"}
              </button>
            </div>

            {comments.length > 0 ? (
              comments.map((c, index) => (
                <div key={index} className="comment">
                  <strong>{c.User}</strong>
                  <p>{c.Text}</p>
                  <small>{new Date(c.Date).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first!</p>
            )}
          </div>
        </div>

        {/* Right side: recommended videos */}
        <aside className="recommended">
          <h3>Recommended</h3>
          {recommended.map((vid) => (
            <Link
              to={`/play-video/${vid.VideoId}`}
              key={vid.VideoId}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="recommended-card">
                <iframe
                  src={vid.Url}
                  title={vid.Title}
                  width="150"
                  height="90"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div>
                  <h4>{vid.Title}</h4>
                  <p>{vid.Views} views</p>
                </div>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}

export default PlayVideo;
