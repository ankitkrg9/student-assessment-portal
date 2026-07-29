import "./../Result.css";

import {
    FaCheckCircle,
    FaTimesCircle,
    FaClipboardList,
    FaClock,
    FaAward,
    FaBullseye,
    FaQuestionCircle
} from "react-icons/fa";

function SummaryCard({

    totalQuestions,
    attemptedQuestions,
    correctAnswers,
    incorrectAnswers,
    skippedQuestions,
    timeTaken,
    percentage,
    grade

}) {

    const summary = [

        {
            icon: <FaClipboardList />,
            label: "Total Questions",
            value: totalQuestions,
            color: "blue"
        },

        {
            icon: <FaBullseye />,
            label: "Attempted",
            value: attemptedQuestions,
            color: "purple"
        },

        {
            icon: <FaCheckCircle />,
            label: "Correct Answers",
            value: correctAnswers,
            color: "green"
        },

        {
            icon: <FaTimesCircle />,
            label: "Incorrect Answers",
            value: incorrectAnswers,
            color: "red"
        },

        {
            icon: <FaQuestionCircle />,
            label: "Skipped",
            value: skippedQuestions,
            color: "orange"
        },

        {
            icon: <FaClock />,
            label: "Time Taken",
            value: timeTaken,
            color: "gray"
        },

        {
            icon: <FaBullseye />,
            label: "Score",
            value: `${percentage}%`,
            color: "blue"
        },

        {
            icon: <FaAward />,
            label: "Grade",
            value: grade,
            color: "gold"
        }

    ];

    return (

        <div className="result-card summary-card">

            <h3>Performance Summary</h3>

            <div className="summary-list">

                {summary.map((item, index) => (

                    <div
                        key={index}
                        className="summary-item"
                    >

                        <div className="summary-left">

                            <span className={`summary-icon ${item.color}`}>

                                {item.icon}

                            </span>

                            <span>

                                {item.label}

                            </span>

                        </div>

                        <span className="summary-value">

                            {item.value}

                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default SummaryCard;