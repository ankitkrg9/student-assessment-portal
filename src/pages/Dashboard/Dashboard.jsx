import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaChartPie } from "react-icons/fa";

import {
    FaUserCircle,
    FaUserEdit,
    FaCog,
    FaSignOutAlt,
    FaClipboardList,
    FaChartLine,
    FaTrophy,
    FaHistory,
    FaArrowRight
} from "react-icons/fa";





function Dashboard() {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {

                setMenuOpen(false);

            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    return (

        <div className="dashboard">

            <header className="dashboard-navbar">

                <div className="logo">
                    Assess<span>AI</span>
                </div>

                <div
                    className="profile-menu"
                    ref={menuRef}
                >

                    <div className="profile" onClick={() => setMenuOpen(!menuOpen)}>
                        <FaUserCircle className="profile-avatar" />

                        <span className="profile-name">
                            Ankit
                        </span>
                    </div>

                    {menuOpen && (

                        <div className="dropdown">

                            <div
                                className="dropdown-item"
                                onClick={() => navigate("/profile")}
                            >
                                <FaUserEdit />

                                My Profile
                            </div>

                            <div
                                className="dropdown-item"
                            >
                                <FaCog />

                                Settings
                            </div>

                            <hr />

                            <div
                                className="dropdown-item logout"
                                onClick={() => {

                                    localStorage.removeItem("token");

                                    navigate("/");

                                }}
                            >

                                <FaSignOutAlt />

                                Logout

                            </div>

                        </div>

                    )}

                </div>

            </header>

            <div className="welcome">

                <div>

                    <h1>Welcome Back 👋</h1>

                    <p>

                        Ready to improve your technical skills today?

                    </p>

                </div>

            </div>

            <div className="stats">

                <div className="stat-card">

                    <FaClipboardList className="stat-icon" />

                    <h2>--</h2>

                    <p>Assessments Taken</p>

                </div>

                <div className="stat-card">

                    <FaChartLine className="stat-icon" />

                    <h2>--</h2>

                    <p>Average Score</p>

                </div>

                <div className="stat-card">

                    <FaTrophy className="stat-icon" />

                    <h2>--</h2>

                    <p>Highest Score</p>

                </div>

            </div>

            <h2 className="section-title">

                Quick Actions

            </h2>

            <div className="action-grid">

                <div
                    className="action-card"
                    onClick={() => navigate("/skills")}
                >

                    <FaClipboardList />

                    <h3>Start Assessment</h3>

                    <p>

                        Begin a new AI Proctored Assessment.

                    </p>

                </div>

                <div className="action-card">

                    <FaHistory />

                    <h3>Assessment History</h3>

                    <p>

                        View all previous assessments.

                    </p>

                </div>
                
                <div
                    className="action-card"
                    onClick={() => navigate("/analytics")}
                >
                    <FaChartPie />

                    <h3>Performance Analytics</h3>

                    <p>
                        Analyze your scores, strengths, and improvement areas.
                    </p>
                </div>


            </div>

            <div className="recent">

                <h2>

                    Recent Activity

                </h2>

                <div className="empty-state">

                    <img

                        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"

                        alt="empty"

                    />

                    <h3>

                        No Assessments Yet

                    </h3>

                    <p>

                        Your completed assessments will appear here.

                    </p>

                    <button

                        onClick={() => navigate("/skills")}

                    >

                        Start Assessment

                        <FaArrowRight />

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;