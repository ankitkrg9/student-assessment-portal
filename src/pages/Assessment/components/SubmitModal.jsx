function SubmitModal({

    isOpen,

    onClose,

    onSubmit,

    totalQuestions,

    answers,

    reviewQuestions,

    timeLeft

}) {

    if (!isOpen) return null;

    const answered = Object.keys(answers).length;

    const review = reviewQuestions.length;

    const notAnswered = totalQuestions - answered;

    const hours = String(
        Math.floor(timeLeft / 3600)
    ).padStart(2, "0");

    const minutes = String(
        Math.floor((timeLeft % 3600) / 60)
    ).padStart(2, "0");

    const seconds = String(
        timeLeft % 60
    ).padStart(2, "0");

    return (

        <div className="modal-overlay">

            <div className="submit-modal">

                <h2>

                    Submit Assessment

                </h2>

                <p className="modal-message">

                    Please review your assessment summary before submitting.

                </p>

                <div className="summary-box">

                    <div className="summary-item">

                        <span>Total Questions</span>

                        <strong>{totalQuestions}</strong>

                    </div>

                    <div className="summary-item">

                        <span>Answered</span>

                        <strong>{answered}</strong>

                    </div>

                    <div className="summary-item">

                        <span>Marked For Review</span>

                        <strong>{review}</strong>

                    </div>

                    <div className="summary-item">

                        <span>Not Answered</span>

                        <strong>{notAnswered}</strong>

                    </div>

                    <div className="summary-item">

                        <span>Time Remaining</span>

                        <strong>

                            {hours}:{minutes}:{seconds}

                        </strong>

                    </div>

                </div>

                <p className="warning-text">

                    Once submitted, you will not be able to modify your answers.

                </p>

                <div className="modal-buttons">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Continue Assessment

                    </button>

                    <button

                        className="confirm-btn"

                        onClick={onSubmit}

                    >

                        Submit Now

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SubmitModal;