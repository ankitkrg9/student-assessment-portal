import {
    FaCamera,
    FaMicrophone,
    FaWifi,
    FaExpand,
    FaExclamationTriangle,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

function ProctorBar({
    cameraReady,
    micReady,
    internetReady,
    fullscreen,
    violations,
    maxViolations
}) {

    return (

        <div className="proctor-bar">

            {/* Camera */}

            <div className={`proctor-item ${cameraReady ? "success" : "error"}`}>

                <FaCamera />

                <span>

                    Camera

                </span>

                {cameraReady ? (

                    <FaCheckCircle />

                ) : (

                    <FaTimesCircle />

                )}

            </div>

            {/* Microphone */}

            <div className={`proctor-item ${micReady ? "success" : "error"}`}>

                <FaMicrophone />

                <span>

                    Microphone

                </span>

                {micReady ? (

                    <FaCheckCircle />

                ) : (

                    <FaTimesCircle />

                )}

            </div>

            {/* Internet */}

            <div className={`proctor-item ${internetReady ? "success" : "error"}`}>

                <FaWifi />

                <span>

                    Internet

                </span>

                {internetReady ? (

                    <FaCheckCircle />

                ) : (

                    <FaTimesCircle />

                )}

            </div>

            {/* Fullscreen */}

            <div className={`proctor-item ${fullscreen ? "success" : "error"}`}>

                <FaExpand />

                <span>

                    Fullscreen

                </span>

                {fullscreen ? (

                    <FaCheckCircle />

                ) : (

                    <FaTimesCircle />

                )}

            </div>

            {/* Violations */}

            <div className="proctor-item warning">

                <FaExclamationTriangle />

                <span>

                    Violations

                </span>

                <strong>

                    {violations} / {maxViolations}

                </strong>

            </div>

        </div>

    );

}

export default ProctorBar;