import { useEffect, useRef, useState } from "react";

function useProctoring(
    maxViolations = 3,
    onViolation
) {

    // ===========================
    // States
    // ===========================

    const [cameraReady, setCameraReady] = useState(false);

    const [micReady, setMicReady] = useState(false);

    const [internetReady, setInternetReady] = useState(
        navigator.onLine
    );

    const [fullscreen, setFullscreen] = useState(
        document.fullscreenElement !== null
    );

    const [violations, setViolations] = useState(0);
    const [violationLogs, setViolationLogs] = useState([]);

    const lastViolationRef = useRef(0);

    const addViolation = (reason) => {

        const now = Date.now();

        if (now - lastViolationRef.current < 3000) {

            return;

        }

        lastViolationRef.current = now;

        setViolations(prev => {

            const total = prev + 1;

            if (onViolation) {

                onViolation(reason, total);

            }

            return total;

        });

    };

    const [cameraError, setCameraError] = useState("");

    const videoRef = useRef(null);

    const streamRef = useRef(null);

    // ===========================
    // Camera + Microphone
    // ===========================

    useEffect(() => {

        const startMedia = async () => {

            try {

                const stream =
                    await navigator.mediaDevices.getUserMedia({

                        video: true,

                        audio: true

                    });

                streamRef.current = stream;

                if (videoRef.current) {

                    videoRef.current.srcObject = stream;

                }

                setCameraReady(true);

                setMicReady(true);

                setCameraError("");

            }

            catch (error) {

                console.log(error);

                setCameraReady(false);

                setMicReady(false);

                setCameraError(
                    "Camera / Microphone permission denied."
                );

            }

        };

        startMedia();

        return () => {

            if (streamRef.current) {

                streamRef.current
                    .getTracks()
                    .forEach(track => track.stop());

            }

        };

    }, []);

    // ===========================
    // Internet
    // ===========================

    useEffect(() => {

        const online = () => setInternetReady(true);

        const offline = () => {

            setInternetReady(false);

            addViolation();

        };

        window.addEventListener("online", online);

        window.addEventListener("offline", offline);

        return () => {

            window.removeEventListener(
                "online",
                online
            );

            window.removeEventListener(
                "offline",
                offline
            );

        };

    }, []);

    // ===========================
    // Fullscreen
    // ===========================

    useEffect(() => {

        const fullscreenChange = () => {

            const isFullscreen =
                document.fullscreenElement !== null;

            setFullscreen(isFullscreen);

            if (!isFullscreen) {

                addViolation();

            }

        };

        document.addEventListener(
            "fullscreenchange",
            fullscreenChange
        );

        return () => {

            document.removeEventListener(
                "fullscreenchange",
                fullscreenChange
            );

        };

    }, []);

    // ===========================
    // Tab Change
    // ===========================

    useEffect(() => {

        const visibility = () => {

            if (document.hidden) {

                addViolation();

            }

        };

        document.addEventListener(
            "visibilitychange",
            visibility
        );

        return () => {

            document.removeEventListener(
                "visibilitychange",
                visibility
            );

        };

    }, []);

    // ===========================
    // Window Blur
    // ===========================

    useEffect(() => {

        const blur = () => {

            addViolation();

        };

        window.addEventListener("blur", blur);

        return () => {

            window.removeEventListener("blur", blur);

        };

    }, []);

    // ===========================
    // Disable Right Click
    // ===========================

    useEffect(() => {

        const disableRightClick = (e) => {

            e.preventDefault();

            addViolation();

        };

        document.addEventListener(
            "contextmenu",
            disableRightClick
        );

        return () => {

            document.removeEventListener(
                "contextmenu",
                disableRightClick
            );

        };

    }, []);

    // ===========================
    // Disable Copy / Paste / Cut
    // ===========================

    useEffect(() => {

        const prevent = (e) => {

            e.preventDefault();

            addViolation();

        };

        document.addEventListener("copy", prevent);

        document.addEventListener("paste", prevent);

        document.addEventListener("cut", prevent);

        return () => {

            document.removeEventListener(
                "copy",
                prevent
            );

            document.removeEventListener(
                "paste",
                prevent
            );

            document.removeEventListener(
                "cut",
                prevent
            );

        };

    }, []);

    // ===========================
    // Keyboard Shortcuts
    // ===========================

    useEffect(() => {

        const keydown = (e) => {

            const blocked =

                e.key === "F12" ||

                (e.ctrlKey &&
                    e.shiftKey &&
                    ["I", "J", "C"].includes(
                        e.key.toUpperCase()
                    )) ||

                (e.ctrlKey &&
                    ["U", "S", "P"].includes(
                        e.key.toUpperCase()
                    ));

            if (blocked) {

                e.preventDefault();

                addViolation();

            }

        };

        document.addEventListener(
            "keydown",
            keydown
        );

        return () => {

            document.removeEventListener(
                "keydown",
                keydown
            );

        };

    }, []);

    // ===========================
    // Auto Submit Limit
    // ===========================

    useEffect(() => {

        if (violations >= maxViolations) {

            alert(
                "Maximum violations reached. Assessment will be submitted."
            );

        }

    }, [violations, maxViolations]);

    return {

        videoRef,

        cameraReady,

        micReady,

        internetReady,

        fullscreen,

        violations,

        cameraError

    };

}

export default useProctoring;