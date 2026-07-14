function QuestionCard({

    question,

    currentQuestion,

    totalQuestions,

    selectedAnswer,

    handleAnswer,

    handlePrevious,

    handleNext,

    handleReview,

    isReview

}) {

    return (

        <main className="question-section">

            <div className="question-card">

                {/* ==========================
                    Question Header
                =========================== */}

                <div className="question-header">

                    <span className="domain-badge">

                        {question.domain}

                    </span>

                    <span
                        className={`difficulty ${question.difficulty.toLowerCase()}`}
                    >

                        {question.difficulty}

                    </span>

                </div>

                {/* ==========================
                    Question Number
                =========================== */}

                <h3>

                    Question {currentQuestion + 1} of {totalQuestions}

                </h3>

                {/* ==========================
                    Question
                =========================== */}

                <h2>

                    {question.question}

                </h2>

                {/* ==========================
                    Options
                =========================== */}

                <div className="options">

                    {question.options.map((option, index) => (

                        <label

                            key={index}

                            className={`option ${selectedAnswer === index
                                ? "selected"
                                : ""
                                }`}

                        >

                            <input

                                type="radio"

                                name={`question-${question.id}`}

                                checked={selectedAnswer === index}

                                onChange={() => handleAnswer(index)}

                            />

                            <span>

                                {option}

                            </span>

                        </label>

                    ))}

                </div>

                {/* ==========================
                    Navigation Buttons
                =========================== */}

                <div className="bottom-buttons">

                    <button

                        className="prev-btn"

                        onClick={handlePrevious}

                        disabled={currentQuestion === 0}

                    >

                        Previous

                    </button>

                    <button

                        className="review-btn"

                        onClick={handleReview}

                    >

                        {

                            isReview

                                ? "Remove Review"

                                : "Mark for Review"

                        }

                    </button>

                    <button

                        className="next-btn"

                        onClick={handleNext}

                    >

                        Save & Next

                    </button>

                </div>

            </div>

        </main>

    );

}

export default QuestionCard;