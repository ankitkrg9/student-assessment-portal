import "./../Result.css";

function SectionPerformance({ questions, answers }) {

    const sections = {};

    questions.forEach((question) => {

        const domain = question.domain || "General";

        if (!sections[domain]) {

            sections[domain] = {

                total: 0,
                correct: 0

            };

        }

        sections[domain].total++;

        if (answers[question.id] === question.correctAnswer) {

            sections[domain].correct++;

        }

    });

    const sectionData = Object.keys(sections).map((domain) => {

        const total = sections[domain].total;

        const correct = sections[domain].correct;

        const percentage =
            total === 0
                ? 0
                : Math.round((correct / total) * 100);

        return {

            domain,
            total,
            correct,
            percentage

        };

    });

    return (

        <div className="result-card section-card">

            <h3>Section Performance</h3>

            <div className="section-list">

                {sectionData.map((section) => (

                    <div
                        key={section.domain}
                        className="section-item"
                    >

                        <div className="section-header">

                            <span>

                                {section.domain}

                            </span>

                            <span>

                                {section.correct}/{section.total}

                                {" "}({section.percentage}%)

                            </span>

                        </div>

                        <div className="progress-bar">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${section.percentage}%`
                                }}
                            ></div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default SectionPerformance;