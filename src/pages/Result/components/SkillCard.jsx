import "./../Result.css";

import {
    FaBrain,
    FaMedal,
    FaArrowTrendUp
} from "react-icons/fa6";

function SkillCard({

    skillLevel,
    feedback

}) {

    const badgeColor = {

        Beginner: "beginner",
        Intermediate: "intermediate",
        Advanced: "advanced",
        Expert: "expert"

    };

    return (

        <div className="result-card skill-card">

            <h3>

                <FaBrain />

                AI Performance Analysis

            </h3>

            <div className={`skill-badge ${badgeColor[skillLevel]}`}>

                <FaMedal />

                {skillLevel}

            </div>

            <p className="feedback-text">

                {feedback}

            </p>

            <div className="recommendation-box">

                <h4>

                    <FaArrowTrendUp />

                    Recommendation

                </h4>

                <ul>

                    {skillLevel === "Expert" && (

                        <>
                            <li>Excellent performance across all sections.</li>
                            <li>Continue solving advanced coding challenges.</li>
                            <li>Practice system design and real-world projects.</li>
                        </>

                    )}

                    {skillLevel === "Advanced" && (

                        <>
                            <li>Strengthen problem-solving speed.</li>
                            <li>Focus on advanced React and backend concepts.</li>
                            <li>Practice timed assessments regularly.</li>
                        </>

                    )}

                    {skillLevel === "Intermediate" && (

                        <>
                            <li>Revise JavaScript fundamentals.</li>
                            <li>Build more frontend projects.</li>
                            <li>Practice coding questions daily.</li>
                        </>

                    )}

                    {skillLevel === "Beginner" && (

                        <>
                            <li>Focus on core programming concepts.</li>
                            <li>Practice HTML, CSS and JavaScript.</li>
                            <li>Attempt beginner-level coding exercises regularly.</li>
                        </>

                    )}

                </ul>

            </div>

        </div>

    );

}

export default SkillCard;