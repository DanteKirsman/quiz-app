import Question from "./Question";

function GameOver({
    answersCorrect,
    questionAmount,
    quizData,
    resetGame,
    currentQuestionCount,
    currentQuizQuestion,
    setCurrentQuestionCount,
    isGameOver,
}) {
    return (
        <div className="gameOver--container">
            <Question
                id={currentQuizQuestion.id}
                allAnswers={currentQuizQuestion.allAnswers}
                question={currentQuizQuestion.question}
                correctAnswer={currentQuizQuestion.correct_answer}
                selectedAnswer={currentQuizQuestion.selectedAnswer}
                showAnswer={currentQuizQuestion.showAnswer}
                isGameOver={isGameOver}
            />
            <p className="quiz--current">
                Question: {currentQuestionCount + 1} / {quizData.length}
            </p>
            <h1 className="gameOver--correct--answer">
                You got {answersCorrect} / {questionAmount}
            </h1>
            <div className="gameOver--buttons">
                {currentQuestionCount - 1 < 0 ? null : (
                    <button
                        className="gameOver--button"
                        onClick={() => setCurrentQuestionCount((prevQuestion) => prevQuestion - 1)}
                    >
                        Previous Question
                    </button>
                )}

                <button className="gameOver--button" onClick={() => resetGame()}>
                    Play Again
                </button>
                {currentQuestionCount + 1 >= quizData.length ? null : (
                    <button
                        className="gameOver--button"
                        onClick={() => setCurrentQuestionCount((prevQuestion) => prevQuestion + 1)}
                    >
                        Next Question
                    </button>
                )}
            </div>
        </div>
    );
}

export default GameOver;
