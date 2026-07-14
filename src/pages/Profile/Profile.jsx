import "./Profile.css";
import profileImg from "../../assets/images/profile.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

  const interestOptions = [
    { value: "frontend", label: "Frontend Development" },
    { value: "backend", label: "Backend Development" },
    { value: "fullstack", label: "Full Stack Development" },
    { value: "react", label: "React Development" },
    { value: "aiml", label: "AI / ML" },
    { value: "datascience", label: "Data Science" },
    { value: "analytics", label: "Data Analytics" },
    { value: "devops", label: "DevOps" },
    { value: "cloud", label: "Cloud Computing" },
  ];

  const languageOptions = [
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
  ];

  const navigate = useNavigate();

  // ===========================
  // States
  // ===========================

  const [status, setStatus] = useState("");
  const [qualification, setQualification] = useState("");
  const [careerGoal, setCareerGoal] = useState("");

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [interestOpen, setInterestOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const [errors, setErrors] = useState({});

  const interestRef = useRef(null);
  const languageRef = useRef(null);

  // ===========================
  // Close Dropdown
  // ===========================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        interestRef.current &&
        !interestRef.current.contains(event.target)
      ) {
        setInterestOpen(false);
      }

      if (
        languageRef.current &&
        !languageRef.current.contains(event.target)
      ) {
        setLanguageOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  // ===========================
  // Multi Select Checkbox
  // ===========================

  const handleCheckbox = (
    value,
    selected,
    setSelected,
    errorName
  ) => {

    if (selected.includes(value)) {

      setSelected(
        selected.filter((item) => item !== value)
      );

    } else {

      setSelected([...selected, value]);

    }

    setErrors((prev) => ({
      ...prev,
      [errorName]: "",
    }));

  };

  // ===========================
  // Validation
  // ===========================

  const validate = () => {

    const newErrors = {};

    if (!status) {
      newErrors.status =
        "Please select your current status.";
    }

    if (!qualification) {
      newErrors.qualification =
        "Please select your highest qualification.";
    }

    if (selectedInterests.length === 0) {
      newErrors.interests =
        "Please select at least one area of interest.";
    }

    if (selectedLanguages.length === 0) {
      newErrors.languages =
        "Please select at least one programming language.";
    }

    if (!careerGoal.trim()) {
      newErrors.careerGoal =
        "Career Goal is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // ===========================
  // Continue
  // ===========================

  const handleContinue = () => {

    if (!validate()) return;

    console.log({
      status,
      qualification,
      selectedInterests,
      selectedLanguages,
      careerGoal,
    });

    // Backend API Later

    navigate("/dashboard");

  };
  return (
    <div className="profile-page">

      <header className="navbar">
        <div className="logo">
          Assess<span>AI</span>
        </div>
      </header>

      <div className="profile-container">

        <div className="profile-card">

          <h1>Tell Us About Yourself</h1>

          <p className="subtitle">
            This helps us personalize your assessment experience.
          </p>

          {/* Current Status */}

          <label>Current Status</label>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);

              setErrors((prev) => ({
                ...prev,
                status: "",
              }));
            }}
            className={errors.status ? "input-error" : ""}
          >
            <option value="">Select your current status</option>
            <option value="student">Student</option>
            <option value="fresher">Fresher (Graduate)</option>
            <option value="professional">Working Professional</option>
            <option value="career-switcher">Career Switcher</option>
          </select>

          {errors.status && (
            <p className="error-text">
              {errors.status}
            </p>
          )}

          {/* Qualification */}

          <label>Highest Qualification</label>

          <select
            value={qualification}
            onChange={(e) => {
              setQualification(e.target.value);

              setErrors((prev) => ({
                ...prev,
                qualification: "",
              }));
            }}
            className={errors.qualification ? "input-error" : ""}
          >
            <option value="">Select your qualification</option>
            <option value="12th">12th Pass</option>
            <option value="Diploma">Diploma</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="Other">Other</option>
          </select>

          {errors.qualification && (
            <p className="error-text">
              {errors.qualification}
            </p>
          )}

          {/* Interest */}

          <label>Area of Interest</label>

          <div className="multi-select" ref={interestRef}>

            <div
              className={`multi-select-header ${errors.interests ? "input-error" : ""}`}
              onClick={() => setInterestOpen(!interestOpen)}
            >

              <span className="selected-text">

                {selectedInterests.length
                  ? interestOptions
                    .filter((item) =>
                      selectedInterests.includes(item.value)
                    )
                    .map((item) => item.label)
                    .join(", ")
                  : "Select area of interest"}

              </span>

              <span
                className={`dropdown-arrow ${interestOpen ? "dropdown-arrow-open" : ""
                  }`}
              ></span>

            </div>

            {interestOpen && (

              <div className="multi-select-dropdown">

                {interestOptions.map((item) => (

                  <label key={item.value}>

                    <input
                      type="checkbox"
                      checked={selectedInterests.includes(item.value)}
                      onChange={() =>
                        handleCheckbox(
                          item.value,
                          selectedInterests,
                          setSelectedInterests,
                          "interests"
                        )
                      }
                    />

                    {item.label}

                  </label>

                ))}

              </div>

            )}

          </div>

          {errors.interests && (
            <p className="error-text">
              {errors.interests}
            </p>
          )}

          {/* Languages */}

          <label className="mt-15">
            Programming Languages Known
          </label>

          <div className="multi-select" ref={languageRef}>

            <div
              className={`multi-select-header ${errors.languages ? "input-error" : ""}`}
              onClick={() => setLanguageOpen(!languageOpen)}
            >

              <span className="selected-text">

                {selectedLanguages.length
                  ? languageOptions
                    .filter((item) =>
                      selectedLanguages.includes(item.value)
                    )
                    .map((item) => item.label)
                    .join(", ")
                  : "Select programming languages"}

              </span>

              <span
                className={`dropdown-arrow ${languageOpen ? "dropdown-arrow-open" : ""
                  }`}
              ></span>

            </div>

            {languageOpen && (

              <div className="multi-select-dropdown">

                {languageOptions.map((item) => (

                  <label key={item.value}>

                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(item.value)}
                      onChange={() =>
                        handleCheckbox(
                          item.value,
                          selectedLanguages,
                          setSelectedLanguages,
                          "languages"
                        )
                      }
                    />

                    {item.label}

                  </label>

                ))}

              </div>

            )}

          </div>

          {errors.languages && (
            <p className="error-text">
              {errors.languages}
            </p>
          )}

          {/* Career Goal */}

          <label>Career Goal</label>

          <input
            type="text"
            placeholder="e.g. I want to become a Full Stack Developer"

            value={careerGoal}

            onChange={(e) => {

              setCareerGoal(e.target.value);

              setErrors((prev) => ({
                ...prev,
                careerGoal: "",
              }));

            }}

            className={errors.careerGoal ? "input-error" : ""}
          />

          {errors.careerGoal && (
            <p className="error-text">
              {errors.careerGoal}
            </p>
          )}

          <button
            type="button"
            onClick={handleContinue}
          >
            Continue
          </button>

        </div>

        <div className="profile-image">
          <img
            src={profileImg}
            alt="Profile"
          />
        </div>

      </div>

    </div>
  );
}

export default Profile;