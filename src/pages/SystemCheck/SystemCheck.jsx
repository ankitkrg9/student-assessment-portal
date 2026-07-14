import "./SystemCheck.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import {
    FaCamera,
    FaMicrophone,
    FaWifi,
    FaDesktop,
    FaCheckCircle
} from "react-icons/fa";

function SystemCheck() {

    const [micStatus, setMicStatus] = useState("Checking...");
    const [micReady, setMicReady] = useState(false);

    const audioStreamRef = useRef(null);

    const videoRef = useRef(null);

    const [cameraStatus, setCameraStatus] = useState(false);

    const [cameraError, setCameraError] = useState("");

    const analyserRef = useRef(null);
    const animationRef = useRef(null);

    const [micLevel, setMicLevel] = useState(0);
    const [internetStatus, setInternetStatus] = useState(navigator.onLine);
    const [systemCompatible, setSystemCompatible] = useState(false);
    const [systemMessage, setSystemMessage] = useState("");

    useEffect(() => {
        startSystemCheck();
    }, []);

    const startSystemCheck = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            // Save stream
            audioStreamRef.current = stream;

            // Show webcam
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            // Camera status
            setCameraStatus(true);
            setCameraError("");

            // Microphone status
            setMicReady(true);
            setMicStatus("Ready");

            // Audio analyser
            const AudioContextClass =
                window.AudioContext || window.webkitAudioContext;

            const audioContext = new AudioContextClass();

            const source = audioContext.createMediaStreamSource(stream);

            const analyser = audioContext.createAnalyser();

            analyser.fftSize = 256;

            source.connect(analyser);

            analyserRef.current = analyser;

            updateMicLevel();
            checkSystemCompatibility();

        } catch (error) {
            console.error(error);

            setCameraStatus(false);
            setCameraError("Camera permission denied.");

            setMicReady(false);
            setMicStatus("Permission Denied");
        }
    };

    useEffect(() => {

        return () => {

            if (animationRef.current) {

                cancelAnimationFrame(animationRef.current);

            }

            if (audioStreamRef.current) {

                audioStreamRef.current
                    .getTracks()
                    .forEach(track => track.stop());

            }

        };

    }, []);

    useEffect(() => {

        const handleOnline = () => {
            setInternetStatus(true);
        };

        const handleOffline = () => {
            setInternetStatus(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };

    }, []);

    const checkSystemCompatibility = () => {

        const hasMediaDevices =
            !!navigator.mediaDevices;

        const hasGetUserMedia =
            !!navigator.mediaDevices?.getUserMedia;

        const hasLocalStorage =
            typeof Storage !== "undefined";

        const isSecure =
            window.isSecureContext;

        if (
            hasMediaDevices &&
            hasGetUserMedia &&
            hasLocalStorage &&
            isSecure
        ) {

            setSystemCompatible(true);
            setSystemMessage("Supported");

        } else {

            setSystemCompatible(false);
            setSystemMessage("Unsupported");

        }

    };

    const updateMicLevel = () => {
        const analyser = analyserRef.current;

        if (!analyser) return;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        analyser.getByteFrequencyData(dataArray);

        let values = 0;

        for (let i = 0; i < dataArray.length; i++) {
            values += dataArray[i];
        }

        const average = values / dataArray.length;

        const percent = Math.min((average / 120) * 100, 100);

        setMicLevel(percent);

        animationRef.current = requestAnimationFrame(updateMicLevel);
    };

    const navigate = useNavigate();
    const isSystemReady =
        cameraStatus &&
        micReady &&
        internetStatus &&
        systemCompatible;
    
    const startAssessment = async () => {

        if (!document.fullscreenElement) {

            try {

                await document.documentElement.requestFullscreen();

            }

            catch (err) {

                alert("Please allow Fullscreen Mode to continue.");

                return;

            }

        }

        navigate("/assessment");

    };

    return (
        <div className="system-page">

            <header className="navbar">
                <div className="logo">
                    Assess<span>AI</span>
                </div>
            </header>

            <h1>System Check</h1>

            <p className="subtitle">
                Let's make sure everything is working properly before starting your assessment.
            </p>

            <div className="system-card">

                {/* Left Side */}

                <div className="camera-section">

                    <h3>Camera Preview</h3>

                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="camera-preview"
                    ></video>

                    {cameraError && (
                        <p className="camera-error">
                            {cameraError}
                        </p>
                    )}

                </div>

                {/* Right Side */}

                <div className="check-section">

                    <div className="check-item">

                        <div className="left">

                            <FaCamera className="icon" />

                            <span>Camera</span>

                        </div>

                        <div className={`status ${cameraStatus ? "success" : "error"}`}>
                            {cameraStatus ? "Ready" : "Not Ready"}

                            {cameraStatus ? (
                                <FaCheckCircle />
                            ) : (
                                <span>❌</span>
                            )}
                        </div>

                    </div>

                    <div className="check-item">

                        <div className="left">
                            <FaMicrophone className="icon" />
                            <span>Microphone</span>
                        </div>

                        <div className={`status ${micReady ? "success" : "error"}`}>
                            {micStatus}

                            {micReady ? (
                                <FaCheckCircle />
                            ) : (
                                <span>❌</span>
                            )}
                        </div>

                    </div>
                    <div className="check-item">

                        <div className="left">

                            <FaWifi className="icon" />

                            <span>Internet Connection</span>

                        </div>

                        <div
                            className={`status ${internetStatus ? "success" : "error"
                                }`}
                        >

                            {internetStatus ? "Online" : "Offline"}

                            {internetStatus ? (
                                <FaCheckCircle />
                            ) : (
                                <span>❌</span>
                            )}

                        </div>

                    </div>

                    <div className="check-item">

                        <div className="left">

                            <FaDesktop className="icon" />

                            <span>System Compatibility</span>

                        </div>

                        <div
                            className={`status ${systemCompatible ? "success" : "error"
                                }`}
                        >

                            {systemMessage}

                            {systemCompatible ? (
                                <FaCheckCircle />
                            ) : (
                                <span>❌</span>
                            )}

                        </div>

                    </div>

                    <div className="mic-level">

                        <h4>Microphone Level</h4>

                        <div className="meter">

                            <div
                                className="meter-fill"
                                style={{
                                    width: `${micLevel}%`,
                                }}
                            ></div>

                        </div>

                    </div>

                </div>

            </div>

            <button
                className="continue-btn"
                onClick={startAssessment}
            >
                Continue to Assessment
            </button>
            <div className="system-errors">

                {!cameraStatus && (
                    <p>📷 Camera is not ready.</p>
                )}

                {!micReady && (
                    <p>🎤 Microphone is not ready.</p>
                )}

                {!internetStatus && (
                    <p>🌐 Internet connection is offline.</p>
                )}

                {!systemCompatible && (
                    <p>💻 Your system is not compatible.</p>
                )}

            </div>

        </div>
    );
}

export default SystemCheck;