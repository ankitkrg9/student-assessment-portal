import "./../Result.css";

import { useNavigate } from "react-router-dom";

import {
    FaDownload,
    FaHome
} from "react-icons/fa";

function ResultActions() {

    const navigate = useNavigate();

    const downloadReport = () => {

        alert("PDF Report will be available after backend integration.");

    };

    const goDashboard = () => {

        navigate("/dashboard");

    };

    return (

        <div className="result-actions">

            <button
                className="download-btn"
                onClick={downloadReport}
            >

                <FaDownload />

                Download Report

            </button>

            <button
                className="dashboard-btn"
                onClick={goDashboard}
            >

                <FaHome />

                Back to Dashboard

            </button>

        </div>

    );

}

export default ResultActions;