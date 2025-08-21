import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AddVideo.css';

function AddVideo() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    VideoId: Yup.number().required("Video Id is required").positive().integer(),
    Title: Yup.string().required("Title is required").min(3, "Min 3 characters"),
    Url: Yup.string().url("Enter a valid URL").required("URL is required"),
    Likes: Yup.number().min(0, "Must be >= 0"),
    Dislikes: Yup.number().min(0, "Must be >= 0"),
    Views: Yup.number().min(0, "Must be >= 0"),
    CategoryId: Yup.string().required("Select a category")
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      VideoId: '',
      Title: '',
      Url: '',
      Likes: '',
      Dislikes: '',
      Views: '',
      CategoryId: ''
    },
    validationSchema,
    onSubmit: (video) => {
      axios.post('http://127.0.0.1:5000/add-video', video)
        .then(() => {
          alert('✅ Video Added Successfully!');
          navigate('/admin-dash');
        })
        .catch(err => {
          console.error("Error adding video:", err);
          alert("❌ Failed to add video. Try again.");
        });
    }
  });

  // ✅ Load Categories
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/categories')
      .then(response => {
        response.data.unshift({ CategoryId: 0, CategoryName: 'Select Category' });
        setCategories(response.data);
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="addvideo-container">
      <div className="addvideo-card">
        <h2>🚀 Add New Video</h2>
        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Video Id */}
          <div className={`form-group ${formik.errors.VideoId && formik.touched.VideoId ? 'error-shake' : ''}`}>
            <label>Video Id</label>
            <input 
              type="number" 
              name="VideoId" 
              className={`form-control ${formik.errors.VideoId && formik.touched.VideoId ? 'is-invalid' : ''}`}
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              value={formik.values.VideoId}
            />
            {formik.errors.VideoId && formik.touched.VideoId && <div className="error-msg">{formik.errors.VideoId}</div>}
          </div>

          {/* Title */}
          <div className={`form-group ${formik.errors.Title && formik.touched.Title ? 'error-shake' : ''}`}>
            <label>Title</label>
            <input 
              type="text" 
              name="Title" 
              className={`form-control ${formik.errors.Title && formik.touched.Title ? 'is-invalid' : ''}`}
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              value={formik.values.Title}
            />
            {formik.errors.Title && formik.touched.Title && <div className="error-msg">{formik.errors.Title}</div>}
          </div>

          {/* URL */}
          <div className={`form-group ${formik.errors.Url && formik.touched.Url ? 'error-shake' : ''}`}>
            <label>Url</label>
            <input 
              type="text" 
              name="Url" 
              className={`form-control ${formik.errors.Url && formik.touched.Url ? 'is-invalid' : ''}`}
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              value={formik.values.Url}
            />
            {formik.errors.Url && formik.touched.Url && <div className="error-msg">{formik.errors.Url}</div>}
          </div>

          {/* Likes */}
          <div className="form-group">
            <label>Likes</label>
            <input 
              type="number" 
              name="Likes" 
              className="form-control"
              onChange={formik.handleChange} 
              value={formik.values.Likes}
            />
          </div>

          {/* Dislikes */}
          <div className="form-group">
            <label>Dislikes</label>
            <input 
              type="number" 
              name="Dislikes" 
              className="form-control"
              onChange={formik.handleChange} 
              value={formik.values.Dislikes}
            />
          </div>

          {/* Views */}
          <div className="form-group">
            <label>Views</label>
            <input 
              type="number" 
              name="Views" 
              className="form-control"
              onChange={formik.handleChange} 
              value={formik.values.Views}
            />
          </div>

          {/* Category */}
          <div className={`form-group ${formik.errors.CategoryId && formik.touched.CategoryId ? 'error-shake' : ''}`}>
            <label>Category</label>
            <select 
              name="CategoryId" 
              className={`form-select ${formik.errors.CategoryId && formik.touched.CategoryId ? 'is-invalid' : ''}`}
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              value={formik.values.CategoryId}
            >
              {categories.map(category =>
                <option key={category.CategoryId} value={category.CategoryId}>
                  {category.CategoryName}
                </option>
              )}
            </select>
            {formik.errors.CategoryId && formik.touched.CategoryId && <div className="error-msg">{formik.errors.CategoryId}</div>}
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn btn-warning">➕ Add Video</button>
            <Link to="/admin-dash" className="btn btn-danger">✖ Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVideo;
