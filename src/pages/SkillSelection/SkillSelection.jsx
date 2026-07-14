import "./SkillSelection.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaReact,
    FaLayerGroup,
    FaBrain,
    FaCloud,
    FaServer,
    FaCheckCircle
} from "react-icons/fa";

import {
    MdOutlineDataUsage,
    MdOutlineAnalytics
} from "react-icons/md";

import {
    HiOutlineViewGrid
} from "react-icons/hi";

function SkillSelection() {
    const navigate = useNavigate();

    const domains = [
        { id: 1, title: "Frontend", subtitle: "Development", icon: <FaReact /> },
        { id: 2, title: "Backend", subtitle: "Development", icon: <HiOutlineViewGrid /> },
        { id: 3, title: "Full Stack", subtitle: "Development", icon: <FaLayerGroup /> },
        { id: 4, title: "AI / ML", subtitle: "", icon: <FaBrain /> },
        { id: 5, title: "Data Science", subtitle: "", icon: <MdOutlineDataUsage /> },
        { id: 6, title: "Data Analyst", subtitle: "", icon: <MdOutlineAnalytics /> },
        { id: 7, title: "DevOps", subtitle: "", icon: <FaServer /> },
        { id: 8, title: "Cloud", subtitle: "Computing", icon: <FaCloud /> }
    ];

    const [selected, setSelected] = useState(null);

    const toggleSkill = (id) => {
        setSelected((prev) => (prev === id ? null : id));
    };

    const handleContinue = () => {
        navigate("/instructions");
    };

    return (
        <div className="skill-page">
            <header className="navbar">
                <div className="logo">
                    Assess<span>AI</span>
                </div>
            </header>

            <div className="skill-card">
                <h1>Select Your Domain</h1>

                <p>Choose a single domain you want to be assessed in.</p>

                <div className="domain-grid">
                    {domains.map((item) => (
                        <div
                            key={item.id}
                            className={`domain-box ${selected === item.id ? "active" : ""}`}
                            onClick={() => toggleSkill(item.id)}
                        >
                            {selected === item.id && (
                                <FaCheckCircle className="check-icon" />
                            )}

                            <div className="domain-icon">{item.icon}</div>

                            <div>
                                <h3>{item.title}</h3>
                                <span>{item.subtitle}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button disabled={selected === null} onClick={handleContinue}>
                    Continue
                </button>
            </div>
        </div>
    );
}

export default SkillSelection;