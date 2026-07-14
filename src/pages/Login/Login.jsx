import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/images/login.svg";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Login Successful");

    // Temporary navigation
    navigate("/dashboard");
  };

    // TODO:
    // Call Login API here later

  return (
    <div className="login-page">

      <header className="navbar">
        <div className="logo">
          Assess<span>AI</span>
        </div>

        <div className="signup-link">
          Don't have an account?
          <Link to="/register"> Sign up</Link>
        </div>
      </header>

      <div className="login-container">

        <div className="login-card">

          <h1>Student Assessment Portal</h1>

          <h2>Login</h2>

          <form onSubmit={handleLogin} noValidate>

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />

            {errors.email && (
              <p className="error-text">
                {errors.email}
              </p>
            )}

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />

            {errors.password && (
              <p className="error-text">
                {errors.password}
              </p>
            )}

            <button type="submit">
              Login
            </button>

          </form>

        </div>

        <div className="login-image">
          <img
            src={loginImg}
            alt="Login"
          />
        </div>

      </div>

    </div>
  );
}

export default Login;