import "./../Result.css";

function ScoreCard({

    percentage,
    correctAnswers,
    totalQuestions,
    grade

}) {

    const radius = 80;

    const circumference = 2 * Math.PI * radius;

    const progress =
        circumference -
        (percentage / 100) * circumference;

    return (

        <div className="result-card score-card">

            <h3>Your Score</h3>

            <div className="score-circle">

                <svg
                    width="200"
                    height="200"
                >

                    <circle
                        className="score-bg"
                        cx="100"
                        cy="100"
                        r={radius}
                    />

                    <circle
                        className="score-progress"
                        cx="100"
                        cy="100"
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={progress}
                    />

                </svg>

                <div className="score-text">

                    <h1>{percentage}%</h1>

                    <p>

                        {correctAnswers} / {totalQuestions}

                    </p>

                    <span className="grade-badge">

                        Grade {grade}

                    </span>

                </div>

            </div>

        </div>

    );

}

export default ScoreCard;