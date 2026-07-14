import { useEffect, useRef, useState } from "react";

function FloatingCamera({ videoRef }) {

    const cameraRef = useRef(null);

    const [position, setPosition] = useState({
        x: window.innerWidth - 290,
        y: 100,
    });

    const [dragging, setDragging] = useState(false);

    const [offset, setOffset] = useState({
        x: 0,
        y: 0,
    });

    const handleMouseDown = (e) => {

        if (!cameraRef.current) return;

        setDragging(true);

        const rect = cameraRef.current.getBoundingClientRect();

        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });

    };

    useEffect(() => {

        const handleMouseMove = (e) => {

            if (!dragging) return;

            let x = e.clientX - offset.x;
            let y = e.clientY - offset.y;

            x = Math.max(
                0,
                Math.min(x, window.innerWidth - 250)
            );

            y = Math.max(
                0,
                Math.min(y, window.innerHeight - 180)
            );

            setPosition({ x, y });

        };

        const handleMouseUp = () => {

            setDragging(false);

        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {

            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);

        };

    }, [dragging, offset]);

    return (

        <div

            ref={cameraRef}

            className="floating-camera-wrapper"

            onMouseDown={handleMouseDown}

            style={{

                left: position.x,

                top: position.y,

            }}

        >

            <video

                ref={videoRef}

                autoPlay

                playsInline

                muted

                className="floating-camera"

            />

        </div>

    );

}

export default FloatingCamera;