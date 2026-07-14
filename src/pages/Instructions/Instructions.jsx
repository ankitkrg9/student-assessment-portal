import "./Instructions.css";
import instructionImg from "../../assets/images/register.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaClock,
    FaQuestionCircle,
    FaClipboardCheck
} from "react-icons/fa";

function Instructions() {

    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);

    const handleContinue = () => {

        if (checked) {
            navigate("/system-check");
        }

    };

    return (

        <div className="instruction-page">

            <header className="navbar">

                <div className="logo">
                    Assess<span>AI</span>
                </div>

            </header>

            <h2 className="page-title">
                Please read all instructions carefully before starting the assessment.
            </h2>

            <div className="instruction-card">

                <h1>Assessment Instructions</h1>

                <div className="instruction-content">

                    {/* Left Side */}

                    <div className="left-section">

                        <div className="details-box">

                            <div className="detail">

                                <FaClock className="icon" />

                                <div>
                                    <h4>Duration</h4>
                                    <p>60 Minutes</p>
                                </div>

                            </div>

                            <div className="detail">

                                <FaQuestionCircle className="icon" />

                                <div>
                                    <h4>Total Questions</h4>
                                    <p>40 Questions</p>
                                </div>

                            </div>

                            <div className="detail">

                                <FaClipboardCheck className="icon" />

                                <div>
                                    <h4>Passing Score</h4>
                                    <p>60% and above</p>
                                </div>

                            </div>

                        </div>

                        <img
                            src={instructionImg}
                            alt="Instruction"
                        />

                    </div>

                    {/* Right Side */}

                    <div className="right-section">

                        <div className="rules">

                            <ul>

                                <li>Keep your webcam enabled at all times.</li>

                                <li>Microphone access must remain enabled.</li>

                                <li>Fullscreen mode is mandatory.</li>

                                <li>Do not switch tabs or open other applications.</li>

                                <li>Do not use mobile phones or electronic devices.</li>

                                <li>Only one face should be visible.</li>

                                <li>Repeatedly looking away may be flagged.</li>

                            </ul>

                        </div>

                        <div className="agree">

                            <input

                                type="checkbox"

                                checked={checked}

                                onChange={() => setChecked(!checked)}

                            />

                            <span>

                                I have read and understood all the instructions.

                            </span>

                        </div>

                        <button

                            disabled={!checked}

                            onClick={handleContinue}

                        >

                            Continue

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Instructions;