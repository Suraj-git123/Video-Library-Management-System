import axios from 'axios';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      UserId: '',
      Password: ''
    },
    validationSchema: Yup.object({
      UserId: Yup.string().trim().required('Username is required'),
      Password: Yup.string().min(4, 'At least 4 characters').required('Password is required')
    }),
    onSubmit: async (admin, { setSubmitting }) => {
      try {
        // Keep your current GET logic (replace with POST when backend is ready)
        const response = await axios.get('http://127.0.0.1:5000/admin');
        const user = (response.data || []).find(item => item.UserId === admin.UserId);

        if (!user) {
          formik.setFieldError('UserId', 'User not found');
          return;
        }
        if (user.Password !== admin.Password) {
          formik.setFieldError('Password', 'Incorrect password');
          return;
        }

        // success animation can be subtle; we just navigate for now
        navigate('/admin-dash');
      } catch (err) {
        console.error(err);
        formik.setStatus('Server error. Please try again later.');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="auth-page">
      {/* Decorative background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="auth-card" role="main" aria-labelledby="loginHeading">
        <div className="card-glow" aria-hidden="true" />
        <header className="auth-header">
          <h1 id="loginHeading" className="brand-title">
            Admin <span>Login</span>
          </h1>
          <p className="subtitle">Welcome back! Please sign in to continue.</p>
        </header>

        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Username */}
          <div
            className={[
              'field',
              formik.touched.UserId && formik.errors.UserId ? 'error' : '',
            ].join(' ')}
          >
            <input
              id="UserId"
              name="UserId"
              type="text"
              className="input"
              placeholder=" "
              autoComplete="username"
              value={formik.values.UserId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(formik.touched.UserId && formik.errors.UserId)}
              aria-describedby="userIdHelp"
            />
            <label htmlFor="UserId" className="label">Admin Username</label>
            <span className="field-icon" aria-hidden="true">
              {/* User icon (inline SVG) */}
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 12c2.761 0 5-2.69 5-6s-2.239-6-5-6-5 2.69-5 6 2.239 6 5 6zm0 2c-4.418 0-9 2.239-9 5v3h18v-3c0-2.761-4.582-5-9-5z"/>
              </svg>
            </span>
            {formik.touched.UserId && formik.errors.UserId && (
              <div id="userIdHelp" className="error-text" role="alert">
                {formik.errors.UserId}
              </div>
            )}
          </div>

          {/* Password */}
          <div
            className={[
              'field',
              formik.touched.Password && formik.errors.Password ? 'error' : '',
            ].join(' ')}
          >
            <input
              id="Password"
              name="Password"
              type={showPassword ? 'text' : 'password'}
              className="input"
              placeholder=" "
              autoComplete="current-password"
              value={formik.values.Password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(formik.touched.Password && formik.errors.Password)}
              aria-describedby="passwordHelp"
            />
            <label htmlFor="Password" className="label">Password</label>

            <button
              type="button"
              className="toggle"
              onClick={() => setShowPassword(s => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {/* Eye icon (inline SVG) */}
              {showPassword ? (
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10z"/><path d="M14.121 9.879A3 3 0 109.88 14.12 3 3 0 0014.12 9.88z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M2 12s4-7 10-7c2.21 0 4.21.89 5.83 2.17l2.7-2.7 1.41 1.41-19 19-1.41-1.41 3.07-3.07C2.62 17.24 2 12 2 12zm6.26 2.85l1.48-1.48A3 3 0 0012 15a3 3 0 002.63-4.26l1.49-1.49A5 5 0 0112 17a4.99 4.99 0 01-3.74-2.15zM21.99 12s-.35 2.36-2.22 4.53l-1.45-1.45C19.94 13.69 20.83 12 20.83 12s-1.79-3.13-4.61-4.9l1.42-1.42C21.55 7.78 22 12 21.99 12z"/>
                </svg>
              )}
            </button>

            {formik.touched.Password && formik.errors.Password && (
              <div id="passwordHelp" className="error-text" role="alert">
                {formik.errors.Password}
              </div>
            )}
          </div>

          {/* Status / server error */}
          {formik.status && (
            <div className="status-text" role="alert">{formik.status}</div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={formik.isSubmitting || !formik.isValid}
            aria-busy={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <span className="spinner" aria-hidden="true" /> Logging in…
              </>
            ) : (
              'Login'
            )}
          </button>

          <div className="meta-row">
            <div className="tip">Tip: Use correct case for your username.</div>
            <a className="link" href="#" onClick={e => e.preventDefault()}>
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
