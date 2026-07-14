import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import registerImg from "../../assets/images/register.svg";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validation
  const validate = () => {

    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    // Mobile
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters.";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    // Terms
    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms =
        "Please accept the Terms & Conditions.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Continue
  const handleContinue = (e) => {

    e.preventDefault();

    if (!validate()) return;

    console.log(formData);

    // Backend Signup API Here Later

    navigate("/profile");
  };
  return (
    <div className="register-page">

      <header className="navbar">
        <div className="logo">
          Assess<span>AI</span>
        </div>

        <div className="login-link">
          Already have an account?
          <Link to="/"> Login</Link>
        </div>
      </header>

      <div className="register-container">

        <div className="register-card">

          <h1>Create your account</h1>
          <h2>Fill in the details to get started</h2>

          <form onSubmit={handleContinue} noValidate>

            {/* Full Name */}

            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "input-error" : ""}
            />

            {errors.fullName && (
              <p className="error-text">
                {errors.fullName}
              </p>
            )}

            {/* Email */}

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

            {/* Mobile */}

            <label>Mobile Number</label>

            <input
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              className={errors.mobile ? "input-error" : ""}
            />

            {errors.mobile && (
              <p className="error-text">
                {errors.mobile}
              </p>
            )}

            {/* Password */}

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />

            {errors.password && (
              <p className="error-text">
                {errors.password}
              </p>
            )}

            {/* Confirm Password */}

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "input-error" : ""}
            />

            {errors.confirmPassword && (
              <p className="error-text">
                {errors.confirmPassword}
              </p>
            )}

            {/* Terms */}

            <div className="terms">

              <input
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
              />

              <span>
                I agree to the Terms & Conditions and Privacy Policy
              </span>

            </div>

            {errors.acceptedTerms && (
              <p className="error-text">
                {errors.acceptedTerms}
              </p>
            )}

            <button type="submit">
              Continue
            </button>

            <p>
              Already have an account?
              <Link to="/"> Login</Link>
            </p>

          </form>

        </div>

        <div className="register-image">
          <img
            src={registerImg}
            alt="Register"
          />
        </div>

      </div>

    </div>
  );
}

export default Register;