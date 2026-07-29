import "./Assessment.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import questions from "./data/questions";

import Timer from "./components/Timer";
import ProctorBar from "./components/ProctorBar";
import QuestionPalette from "./components/QuestionPalette";
import QuestionCard from "./components/QuestionCard";
import SubmitModal from "./components/SubmitModal";
import useTimer from "../../hooks/useTimer";
import useProctoring from "../../hooks/useProctoring";
import FloatingCamera from "./components/FloatingCamera";
import WarningModal from "./components/WarningModal";

function Assessment() {

    const navigate = useNavigate();

    // ==========================================
    // Assessment States
    // ==========================================

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState({});

    const [reviewQuestions, setReviewQuestions] = useState([]);

    const [visitedQuestions, setVisitedQuestions] = useState([0]);

    const [submitModal, setSubmitModal] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);

    const [warningMessage, setWarningMessage] = useState("");

    const [assessmentLocked, setAssessmentLocked] = useState(false);

    // ==========================================
    // Proctoring States
    // ==========================================
    const maxViolations = 3;

    const handleViolation = (reason, totalWarnings) => {

        setWarningMessage(reason);

        setWarningOpen(true);

        setAssessmentLocked(true);

        if (totalWarnings >= maxViolations) {

            handleSubmit();

        }

    };

    const {

        videoRef,

        cameraReady,

        micReady,

        internetReady,

        fullscreen,

        violations,

        cameraError

    } = useProctoring(

        maxViolations,

        handleViolation

    );


    const question = questions[currentQuestion];

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = () => {

        console.log("Submitted");

        console.log(answers);

        const totalDuration = 60 * 60;

        const timeTaken = totalDuration - timeLeft;

        navigate("/result", {

            state: {

                questions,

                answers,

                timeTaken

            }

        });

    };

    // ==========================================
    // Timer Finished
    // ==========================================

    const handleTimeUp = () => {

        handleSubmit();

    };

    const {

        timeLeft

    } = useTimer(

        60 * 60,

        handleTimeUp

    )

    // ==========================================
    // Save Answer
    // ==========================================

    const handleAnswer = (optionIndex) => {

        setAnswers((prev) => ({

            ...prev,

            [currentQuestion]: optionIndex

        }));

    };

    // ==========================================
    // Previous
    // ==========================================

    const handlePrevious = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(prev => prev - 1);

        }

    };

    // ==========================================
    // Next
    // ==========================================

    const handleNext = () => {

        if (currentQuestion < questions.length - 1) {

            const nextQuestion = currentQuestion + 1;

            setCurrentQuestion(nextQuestion);

            if (!visitedQuestions.includes(nextQuestion)) {

                setVisitedQuestions(prev => [

                    ...prev,

                    nextQuestion

                ]);

            }

        }

    };

    // ==========================================
    // Jump To Question
    // ==========================================

    const jumpToQuestion = (index) => {

        setCurrentQuestion(index);

        if (!visitedQuestions.includes(index)) {

            setVisitedQuestions(prev => [

                ...prev,

                index

            ]);

        }

    };

    // ==========================================
    // Review
    // ==========================================

    const handleReview = () => {

        if (reviewQuestions.includes(currentQuestion)) {

            setReviewQuestions(

                reviewQuestions.filter(

                    q => q !== currentQuestion

                )

            );

        }

        else {

            setReviewQuestions(prev => [

                ...prev,

                currentQuestion

            ]);

        }

    };

    // ==========================================
    // Auto Save (Placeholder)
    // ==========================================

    useEffect(() => {

        const autoSave = setInterval(() => {

            console.log("Auto Saving...");

        }, 30000);

        return () => clearInterval(autoSave);

    }, [answers]);

    // ==========================================
    // Violation Check (Placeholder)
    // ==========================================

    useEffect(() => {

        if (violations >= maxViolations) {

            alert("Maximum violations reached.");

            handleSubmit();

        }

    }, [violations]);

    const returnToFullscreen = async () => {

        try {

            await document.documentElement.requestFullscreen();

            setWarningOpen(false);

            setAssessmentLocked(false);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="assessment-page">

            {/* =========================
                Navbar
            ========================= */}

            <header className="assessment-navbar">

                <div className="logo">

                    Assess<span>AI</span>

                </div>

                <div className="navbar-right">

                    <Timer

                        timeLeft={timeLeft}

                    />

                    <div className="candidate">

                        Student

                    </div>

                </div>

            </header>

            {/* =========================
                Main Layout
            ========================= */}

            <div
                className={`assessment-container ${assessmentLocked ? "assessment-disabled" : ""
                    }`}
            >

                {/* Sidebar */}

                <QuestionPalette

                    questions={questions}

                    currentQuestion={currentQuestion}

                    answers={answers}

                    reviewQuestions={reviewQuestions}

                    visitedQuestions={visitedQuestions}

                    jumpToQuestion={jumpToQuestion}

                    violations={violations}

                    maxViolations={maxViolations}

                />

                {/* Right Section */}

                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >

                    {/* Proctor Bar */}

                    <ProctorBar

                        cameraReady={cameraReady}

                        micReady={micReady}

                        internetReady={internetReady}

                        fullscreen={fullscreen}

                        violations={violations}

                        maxViolations={maxViolations}

                    />

                    {/* Question */}

                    <QuestionCard

                        question={question}

                        currentQuestion={currentQuestion}

                        totalQuestions={questions.length}

                        selectedAnswer={answers[currentQuestion]}

                        handleAnswer={handleAnswer}

                        handlePrevious={handlePrevious}

                        handleNext={handleNext}

                        handleReview={handleReview}

                        isReview={

                            reviewQuestions.includes(

                                currentQuestion

                            )

                        }

                    />

                    {/* Submit Button */}

                    <div className="submit-section">
                        <button

                            className="submit-btn"

                            onClick={() =>

                                setSubmitModal(true)

                            }

                        >

                            Submit Assessment

                        </button>

                    </div>

                </div>

            </div>

            {/* Floating Camera */}

            <FloatingCamera
                videoRef={videoRef}
            />

            {/* Submit Modal */}

            <SubmitModal

                isOpen={submitModal}

                onClose={() =>

                    setSubmitModal(false)

                }

                onSubmit={handleSubmit}

                totalQuestions={questions.length}

                answers={answers}

                reviewQuestions={reviewQuestions}

                timeLeft={timeLeft}

            />
            <WarningModal

                open={warningOpen}

                message={warningMessage}

                warnings={violations}

                maxWarnings={maxViolations}

                onContinue={returnToFullscreen}

            />

        </div>

    );

}

export default Assessment;