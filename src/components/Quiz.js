import React, { useState, useEffect } from "react";
import { QuizData } from "../Data/QuizData";
import QuizResult from "./QuizResult";

const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

function Quiz() {
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        setShuffledQuestions(shuffleArray(QuizData)); // Shuffle questions only once
    }, []);

    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < shuffledQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        } else {
            setShowResult(true);
        }
    };

    const updateScore = () => {
        if (clickedOption === shuffledQuestions[currentQuestion]?.answer) {
            setScore(score + 1);
        }
    };

    const resetAll = () => {
        setShuffledQuestions(shuffleArray(QuizData)); // Reshuffle on reset
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    };

    return (
        <div>
            <p className="heading-txt">Quiz APP</p>
            <div className="container">
                {showResult ? (
                    <QuizResult
                        score={score}
                        totalScore={shuffledQuestions.length}
                        tryAgain={resetAll}
                    />
                ) : shuffledQuestions.length > 0 ? (
                    <>
                        <div className="question">
                            <span id="question-number">{currentQuestion + 1}. </span>
                            <span id="question-txt">
                                {shuffledQuestions[currentQuestion]?.question}
                            </span>
                        </div>
                        <div className="option-container">
                            {shuffledQuestions[currentQuestion]?.options.map((option, i) => (
                                <button
                                    className={`option-btn ${clickedOption === i + 1 ? "checked" : ""
                                        }`}
                                    key={i}
                                    onClick={() => setClickedOption(i + 1)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <input
                            type="button"
                            value="Next"
                            id="next-button"
                            onClick={changeQuestion}
                        />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Quiz;
