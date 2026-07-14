import "./WarningModal.css";

function WarningModal({

    open,

    message,

    warnings,

    maxWarnings,

    onContinue

}) {

    if (!open) return null;

    return (

        <div className="warning-overlay">

            <div className="warning-modal">

                <div className="warning-icon">

                    ⚠️

                </div>

                <h2>

                    Assessment Warning

                </h2>

                <p>

                    {message}

                </p>

                <div className="warning-count">

                    Warning

                    <strong>

                        {warnings} / {maxWarnings}

                    </strong>

                </div>

                <button

                    onClick={onContinue}

                >

                    Return to Fullscreen

                </button>

            </div>

        </div>

    );

}

export default WarningModal;