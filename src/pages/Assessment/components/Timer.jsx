function Timer({ timeLeft }) {

    const hours = Math.floor(timeLeft / 3600);

    const minutes = Math.floor((timeLeft % 3600) / 60);

    const seconds = timeLeft % 60;

    const format = (value) =>
        value.toString().padStart(2, "0");

    const isDanger = timeLeft <= 300;

    return (

        <div className={`timer ${isDanger ? "danger" : ""}`}>

            ⏱ {format(hours)}:
            {format(minutes)}:
            {format(seconds)}

        </div>

    );

}

export default Timer;