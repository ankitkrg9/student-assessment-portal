import { useEffect, useState } from "react";

function useTimer(initialTime, onTimeUp) {

    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {

        const interval = setInterval(() => {

            setTimeLeft(prev => {

                if (prev <= 1) {

                    clearInterval(interval);

                    if (onTimeUp) {

                        onTimeUp();

                    }

                    return 0;

                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(interval);

    }, [onTimeUp]);

    return {

        timeLeft,

        setTimeLeft

    };

}

export default useTimer;