import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserProfile.css";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/user/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div className="profile-box">
      <div className="profile-header">
        <h3>User Details</h3>
        <button className="close-btn" onClick={() => navigate(-1)}>
          ×
        </button>
      </div>
      <div className="profile-info">
        <p><strong>User ID:</strong> {user.UserId}</p>
        <p><strong>Name:</strong> {user.UserName}</p>
        <p><strong>Email:</strong> {user.Email}</p>
        <p><strong>Mobile:</strong> {user.Mobile}</p>
      </div>
    </div>
  );
}

export default UserProfile;
