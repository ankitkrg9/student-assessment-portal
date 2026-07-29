import "./Result.css";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Components
import ScoreCard from "./components/ScoreCard";
import SummaryCard from "./components/SummaryCard";
import SkillCard from "./components/SkillCard";
import SectionPerformance from "./components/SectionPerformance";
import ResultActions from "./components/ResultActions";

function Result() {

    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {

        // Exit fullscreen after assessment
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

    }, []);

    // Redirect if opened directly
    useEffect(() => {

        if (!state) {

            navigate("/dashboard");

        }

    }, [state, navigate]);

    if (!state) return null;

    const {

        answers = {},
        questions = [],
        timeTaken = 0

    } = state;

    //--------------------------------------------------
    // Calculate Result
    //--------------------------------------------------

    let correctAnswers = 0;

    questions.forEach((question) => {

        if (
            answers[question.id] === question.correctAnswer
        ) {
            correctAnswers++;
        }

    });

    const totalQuestions = questions.length;

    const attemptedQuestions =
        Object.keys(answers).length;

    const skippedQuestions =
        totalQuestions - attemptedQuestions;

    const incorrectAnswers =
        attemptedQuestions - correctAnswers;

    const percentage =
        totalQuestions === 0
            ? 0
            : Math.round(
                (correctAnswers / totalQuestions) * 100
            );

    //--------------------------------------------------
    // Grade
    //--------------------------------------------------

    let grade = "F";

    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";

    //--------------------------------------------------
    // Skill Level
    //--------------------------------------------------

    let skillLevel = "Beginner";
    let feedback = "";

    if (percentage >= 90) {

        skillLevel = "Expert";
        feedback =
            "Outstanding performance! You have excellent command over the assessed skills.";

    }

    else if (percentage >= 75) {

        skillLevel = "Advanced";
        feedback =
            "Great work! You have strong technical knowledge with only a few areas to improve.";

    }

    else if (percentage >= 60) {

        skillLevel = "Intermediate";
        feedback =
            "Good progress! Continue practicing to strengthen your problem-solving skills.";

    }

    else {

        skillLevel = "Beginner";
        feedback =
            "Keep learning and practicing regularly. Consistency will improve your performance.";

    }

    //--------------------------------------------------
    // Time Format
    //--------------------------------------------------

    const hours =
        Math.floor(timeTaken / 3600);

    const minutes =
        Math.floor((timeTaken % 3600) / 60);

    const seconds =
        timeTaken % 60;

    const formattedTime =
        `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`;

    return (

    <div className="result-page">

        <header className="result-navbar">

            <div className="logo">
                Assess<span>AI</span>
            </div>

            <h3>Assessment Completed</h3>

        </header>

        <div className="result-container">

            <h1>
                🎉 Congratulations!
            </h1>

            <p className="result-subtitle">
                You have successfully completed the assessment.
            </p>

                <div className="result-layout">

                    <div className="left-column">

                        <ScoreCard
                            percentage={percentage}
                            correctAnswers={correctAnswers}
                            totalQuestions={totalQuestions}
                            grade={grade}
                        />

                        <SkillCard
                            skillLevel={skillLevel}
                            feedback={feedback}
                        />

                    </div>

                    <div className="right-column">

                        <SummaryCard
                            totalQuestions={totalQuestions}
                            attemptedQuestions={attemptedQuestions}
                            correctAnswers={correctAnswers}
                            incorrectAnswers={incorrectAnswers}
                            skippedQuestions={skippedQuestions}
                            timeTaken={formattedTime}
                            percentage={percentage}
                            grade={grade}
                        />

                        <SectionPerformance
                            questions={questions}
                            answers={answers}
                        />

                    </div>

                </div>

                <ResultActions />

        </div>

        </div>

    );

}

export default Result;