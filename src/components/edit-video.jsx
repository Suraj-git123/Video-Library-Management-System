import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../styles/EditVideo.css";

function EditVideo() {
  const [video, setVideo] = useState(null);
  const [categories, setCategories] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      VideoId: 0,
      Title: "",
      Url: "",
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      CategoryId: 0,
    },
    enableReinitialize: true, // refresh when data changes
    validationSchema: Yup.object({
      Title: Yup.string().required("⚠ Title is required"),
      Url: Yup.string()
        .url("⚠ Enter a valid YouTube embed URL")
        .required("⚠ Video URL is required"),
      CategoryId: Yup.number().min(1, "⚠ Please select a category"),
    }),
    onSubmit: (values) => {
      axios
        .put(`http://127.0.0.1:5000/update-video/${params.id}`, values)
        .then(() => {
          alert("✅ Video updated successfully!");
          navigate("/admin-dash");
        })
        .catch((err) => console.error("Error updating video:", err));
    },
  });

  // ✅ Load categories
  function loadCategories() {
    axios
      .get("http://127.0.0.1:5000/categories")
      .then((response) => {
        response.data.unshift({
          CategoryId: 0,
          CategoryName: "Select Category",
        });
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }

  // ✅ Load video
  function getVideo() {
    axios
      .get(`http://127.0.0.1:5000/video/${params.id}`)
      .then((response) => {
        setVideo(response.data[0]); // API returned array → take first item
        formik.setValues(response.data[0]); // sync into form
      })
      .catch((error) => console.error("Error fetching video:", error));
  }

  useEffect(() => {
    loadCategories();
    getVideo();
  }, []);

  if (!video) return <div className="loading">⏳ Loading video details...</div>;

  return (
    <div className="edit-video-container">
      <h2 className="form-title">✎ Edit Video</h2>
      <form onSubmit={formik.handleSubmit} className="edit-form">
        
        {/* Video Id (read-only) */}
        <div className="form-group">
          <label>Video Id</label>
          <input
            type="number"
            name="VideoId"
            value={formik.values.VideoId}
            disabled
          />
        </div>

        {/* Title */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="Title"
            value={formik.values.Title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.Title && formik.errors.Title ? "error-input" : ""}
          />
          {formik.touched.Title && formik.errors.Title && (
            <div className="error">{formik.errors.Title}</div>
          )}
        </div>

        {/* Url */}
        <div className="form-group">
          <label>Url</label>
          <input
            type="text"
            name="Url"
            value={formik.values.Url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.Url && formik.errors.Url ? "error-input" : ""}
          />
          {formik.touched.Url && formik.errors.Url && (
            <div className="error">{formik.errors.Url}</div>
          )}
        </div>

        {/* Likes */}
        <div className="form-group">
          <label>Likes</label>
          <input
            type="number"
            name="Likes"
            value={formik.values.Likes}
            onChange={formik.handleChange}
          />
        </div>

        {/* Dislikes */}
        <div className="form-group">
          <label>Dislikes</label>
          <input
            type="number"
            name="Dislikes"
            value={formik.values.Dislikes}
            onChange={formik.handleChange}
          />
        </div>

        {/* Views */}
        <div className="form-group">
          <label>Views</label>
          <input
            type="number"
            name="Views"
            value={formik.values.Views}
            onChange={formik.handleChange}
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select
            name="CategoryId"
            value={formik.values.CategoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.CategoryId && formik.errors.CategoryId ? "error-input" : ""}
          >
            {categories.map((category) => (
              <option
                key={category.CategoryId}
                value={category.CategoryId}
              >
                {category.CategoryName}
              </option>
            ))}
          </select>
          {formik.touched.CategoryId && formik.errors.CategoryId && (
            <div className="error">{formik.errors.CategoryId}</div>
          )}
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-save">
            Save
          </button>
          <Link to="/admin-dash" className="btn-cancel">
             Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditVideo;
