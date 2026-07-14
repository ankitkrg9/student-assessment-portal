function QuestionPalette({

    questions,

    currentQuestion,

    answers,

    reviewQuestions,

    visitedQuestions,

    jumpToQuestion,

    violations,

    maxViolations

}) {

    return (

        <aside className="sidebar">

            <h3>

                Question Palette

            </h3>

            <div className="palette">

                {questions.map((question, index) => {

                    let className = "palette-btn";

                    if (index === currentQuestion) {

                        className += " current";

                    }

                    else if (reviewQuestions.includes(index)) {

                        className += " review";

                    }

                    else if (answers[index] !== undefined) {

                        className += " answered";

                    }

                    else if (visitedQuestions.includes(index)) {

                        className += " visited";

                    }

                    return (

                        <button

                            key={question.id}

                            className={className}

                            onClick={() => jumpToQuestion(index)}

                        >

                            {index + 1}

                        </button>

                    );

                })}

            </div>

            {/* =========================
                Legend
            ========================= */}

            <div className="legend">

                <h4>

                    Legend

                </h4>

                <div>

                    <span className="legend-box current"></span>

                    Current Question

                </div>

                <div>

                    <span className="legend-box answered"></span>

                    Answered

                </div>

                <div>

                    <span className="legend-box review"></span>

                    Marked For Review

                </div>

                <div>

                    <span className="legend-box visited"></span>

                    Visited

                </div>

                <div>

                    <span className="legend-box"></span>

                    Not Visited

                </div>

            </div>

            {/* =========================
                Statistics
            ========================= */}

            <div className="assessment-info">

                <p>

                    Total Questions

                    <strong>

                        {questions.length}

                    </strong>

                </p>

                <p>

                    Answered

                    <strong>

                        {Object.keys(answers).length}

                    </strong>

                </p>

                <p>

                    Review

                    <strong>

                        {reviewQuestions.length}

                    </strong>

                </p>

                <p>

                    Not Answered

                    <strong>

                        {questions.length -

                            Object.keys(answers).length}

                    </strong>

                </p>

                <p>

                    Violations

                    <strong>

                        {violations} / {maxViolations}

                    </strong>

                </p>

            </div>

        </aside>

    );

}

export default QuestionPalette;