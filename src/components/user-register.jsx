import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserRegister.css";

function UserRegister() {
  let navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [errorClass, setErrorClass] = useState("");

  // ✅ Validation schema
  const validationSchema = Yup.object({
    UserId: Yup.string()
      .required("User ID is required")
      .min(3, "User ID must be at least 3 characters"),
    UserName: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    Password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
    Email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    Mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  });

  const formik = useFormik({
    initialValues: {
      UserId: "",
      UserName: "",
      Password: "",
      Email: "",
      Mobile: "",
    },
    validationSchema,
    onSubmit: useCallback(
      (user) => {
        axios
          .post(`http://127.0.0.1:5000/register-user`, user)
          .then(() => {
            alert("✅ Registered Successfully");
            navigate("/user-login");
          })
          .catch((err) => {
            console.error("Registration error:", err);
            alert("⚠️ Something went wrong while registering!");
          });
      },
      [navigate]
    ),
  });

  function VerifyUser(e) {
    axios.get(`http://127.0.0.1:5000/users`).then((response) => {
      var user = response.data.find((item) => item.UserId === e.target.value);
      if (user) {
        setStatus("❌ UserId already taken");
        setErrorClass("text-danger");
      } else {
        setStatus("✅ UserId Available");
        setErrorClass("text-success");
      }
    });
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={formik.handleSubmit}>
        {/* Title */}
        <h2 className="register-title">Create an Account</h2>
        <p className="register-subtitle">Join Video Library today</p>

        {/* UserId */}
        <div className="form-group">
          <input
            type="text"
            name="UserId"
            placeholder="Enter User ID"
            value={formik.values.UserId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onKeyUp={VerifyUser}
            className={`form-control ${
              formik.touched.UserId && formik.errors.UserId ? "is-invalid" : ""
            }`}
          />
          {formik.touched.UserId && formik.errors.UserId ? (
            <div className="invalid-feedback">{formik.errors.UserId}</div>
          ) : (
            <div className={errorClass}>{status}</div>
          )}
        </div>

        {/* Username */}
        <div className="form-group">
          <input
            type="text"
            name="UserName"
            placeholder="Enter Username"
            value={formik.values.UserName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.UserName && formik.errors.UserName
                ? "is-invalid"
                : ""
            }`}
          />
          {formik.touched.UserName && formik.errors.UserName && (
            <div className="invalid-feedback">{formik.errors.UserName}</div>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <input
            type="password"
            name="Password"
            placeholder="Enter Password"
            value={formik.values.Password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.Password && formik.errors.Password
                ? "is-invalid"
                : ""
            }`}
          />
          {formik.touched.Password && formik.errors.Password && (
            <div className="invalid-feedback">{formik.errors.Password}</div>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <input
            type="email"
            name="Email"
            placeholder="Enter Email"
            value={formik.values.Email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.Email && formik.errors.Email ? "is-invalid" : ""
            }`}
          />
          {formik.touched.Email && formik.errors.Email && (
            <div className="invalid-feedback">{formik.errors.Email}</div>
          )}
        </div>

        {/* Mobile */}
        <div className="form-group">
          <input
            type="text"
            name="Mobile"
            placeholder="Enter Mobile Number"
            value={formik.values.Mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.Mobile && formik.errors.Mobile ? "is-invalid" : ""
            }`}
          />
          {formik.touched.Mobile && formik.errors.Mobile && (
            <div className="invalid-feedback">{formik.errors.Mobile}</div>
          )}
        </div>

        {/* Button */}
        <button type="submit" className="btn-register">
          Register
        </button>

        {/* Login Link */}
        <div className="login-link">
          <span>Already have an account? </span>
          <Link to="/user-login">Login here</Link>
        </div>
      </form>
    </div>
  );
}

export default UserRegister;
