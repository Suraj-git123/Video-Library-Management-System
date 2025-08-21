import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserLogin.css';

function UserLogin() {
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    UserId: Yup.string()
      .required("User ID is required")
      .min(3, "User ID must be at least 3 characters"),
    Password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
  });

  const formik = useFormik({
    initialValues: {
      UserId: '',
      Password: ''
    },
    validationSchema,
    onSubmit: (user) => {
  axios.get(`http://127.0.0.1:5000/users`)
    .then(response => {
      const result = response.data.find(item => item.UserId === user.UserId);
      if (result) {
        if (user.Password === result.Password) {
          // ✅ Save logged-in user to localStorage
          localStorage.setItem("user", JSON.stringify({
            UserId: result.UserId,
            UserName: result.UserName
          }));

          navigate('/user-dash'); // redirect after login
        } else {
          formik.setFieldError("Password", "❌ Incorrect password");
        }
      } else {
        formik.setFieldError("UserId", "❌ User ID not found");
      }
    })
    .catch(() => {
      alert("⚠️ Server error. Please try again later.");
    });
}

  });

  return (
    <div className="login-container">
      <form onSubmit={formik.handleSubmit} className="login-form">
        {/* Logo/Title */}
        <h2 className="login-title">Video Library</h2>
        <p className="login-subtitle">Sign in to continue</p>

        {/* User ID */}
        <div className="form-group">
          <input
            type="text"
            name="UserId"
            placeholder="Enter User ID"
            className={`form-control ${formik.touched.UserId && formik.errors.UserId ? 'is-invalid' : ''}`}
            value={formik.values.UserId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.UserId && formik.errors.UserId ? (
            <div className="invalid-feedback">{formik.errors.UserId}</div>
          ) : null}
        </div>

        {/* Password */}
        <div className="form-group">
          <input
            type="password"
            name="Password"
            placeholder="Enter Password"
            className={`form-control ${formik.touched.Password && formik.errors.Password ? 'is-invalid' : ''}`}
            value={formik.values.Password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Password && formik.errors.Password ? (
            <div className="invalid-feedback">{formik.errors.Password}</div>
          ) : null}
        </div>

        {/* Button */}
        <button type="submit" className="btn-login">Login</button>

        {/* Register link */}
        <div className="register-link">
          <span>New here? </span>
          <Link to="/user-register">Create an account</Link>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;
