import { useState, useEffect } from "react";

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        setQuestions([
            {
                q: "Which protocol is used to transfer web pages over the internet?",
                options: ["FTP", "SMTP", "HTTP", "SSH"],
                answer: 2
            },
            {
                q: "Which HTML tag is used to insert an image?",
                options: ["<img>", "<picture>", "<src>", "<image>"],
                answer: 0
            },
            {
                q: "CSS stands for:",
                options: [
                    "Creative Style System",
                    "Cascading Style Sheets",
                    "Computer Styled Sections",
                    "Color Styling Syntax"
                ],
                answer: 1
            },
            {
                q: "Which JavaScript method is used to select an element by ID?",
                options: [
                    "querySelectorAll()",
                    "getElementsByClassName()",
                    "getElementById()",
                    "query()"
                ],
                answer: 2
            },
            {
                q: "React uses which language to structure components?",
                options: ["XML", "TSX", "JSX", "Pug"],
                answer: 2
            }
        ]);

    }, []);

    const handleNext = () => {
        if (selected === questions[index].answer) {
            setScore(prev => prev + 1);
        }
        if (index + 1 === questions.length) {
            setFinished(true);
        } else {
            setIndex(prev => prev + 1);
            setSelected(null);
        }
    };

    const restart = () => {
        setIndex(0);
        setSelected(null);
        setScore(0);
        setFinished(false);
    };

    if (questions.length === 0) return null;

    const percent = Math.round((score / questions.length) * 100);

    return (
        <div className="quiz-card">
            {!finished ? (
                <>
                    <h4 className="mb-3 text-center fw-bold">
                        Question {index + 1} of {questions.length}
                    </h4>

                    <p className="fs-5 mb-4">{questions[index].q}</p>

                    <div>
                        {questions[index].options.map((opt, i) => (
                            <button
                                key={i}
                                className={`btn btn-outline-primary quiz-btn w-100 mb-2 ${selected === i ? "active" : ""
                                    }`}
                                onClick={() => setSelected(i)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>

                    <button
                        className="primary-btn mt-3"
                        disabled={selected === null}
                        onClick={handleNext}
                    >
                        {index + 1 === questions.length ? "Finish" : "Next"}
                    </button>
                </>
            ) : (
                <div className="text-center">
                    <div className="score-text">
                        Score: {score} / {questions.length}
                    </div>
                    <p className="mt-2 fs-5">Percentage: {percent}%</p>

                    <button className="primary-btn mt-4" onClick={restart}>
                        Restart Quiz
                    </button>
                </div>
            )}
        </div>
    );
}

export default Quiz;
