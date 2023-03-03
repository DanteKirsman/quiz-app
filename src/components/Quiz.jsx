import { useEffect, useState } from "react";
import Question from "./Question";
import GameOver from "./GameOver";
import { nanoid } from "nanoid";

function Quiz({ options, toggleHome }) {
    const [quizData, setQuizData] = useState([]);
    const [answersCorrect, setAnswersCorrect] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [currentQuestionCount, setCurrentQuestionCount] = useState(0);
    const [isGettingData, setIsGettingData] = useState(true);

    const { difficulty, category, questionAmount } = options;
    const allQuestionsAnswered = quizData.every((question) => question.selectedAnswer !== "");

    useEffect(() => {
        let api = `https://opentdb.com/api.php?amount=${questionAmount}&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`;
        if (category === "any") {
            api = `https://opentdb.com/api.php?amount=${questionAmount}&difficulty=${difficulty}&type=multiple&encode=url3986`;
        }
        fetch(api)
            .then((res) => res.json())
            .then((data) => {
                setQuizData(
                    data.results.map((question) => {
                        let allAnswers = [...question.incorrect_answers];
                        const randomIndex = Math.floor(Math.random() * 4);
                        allAnswers.splice(randomIndex, 0, question.correct_answer);
                        return {
                            ...question,
                            id: nanoid(),
                            selectedAnswer: "",
                            allAnswers: allAnswers,
                            showAnswer: false,
                        };
                    })
                );
                setIsGettingData(false);
            })
            .catch((error) => console.log(error));
    }, [difficulty, category, questionAmount, isGettingData]);

    function changeSelectedAnswer(questionId, selectedAnswer) {
        setQuizData((prevQuestionsArray) =>
            prevQuestionsArray.map((question) =>
                question.id === questionId
                    ? { ...question, selectedAnswer: selectedAnswer }
                    : question
            )
        );
    }

    const currentQuizQuestion = quizData[currentQuestionCount];

    function checkAnswer() {
        if (currentQuizQuestion.selectedAnswer === currentQuizQuestion.correct_answer) {
            setAnswersCorrect((prevCorrect) => prevCorrect + 1);
        }
        if (
            currentQuestionCount + 1 < quizData.length &&
            currentQuizQuestion.selectedAnswer !== ""
        ) {
            setCurrentQuestionCount((prevQuestion) => prevQuestion + 1);
        } else if (allQuestionsAnswered) {
            setIsGameOver(true);
            setCurrentQuestionCount(0);
        }
        if (currentQuizQuestion.selectedAnswer !== "") {
            setQuizData((prevData) =>
                prevData.map((question) =>
                    currentQuizQuestion.id === question.id
                        ? { ...question, showAnswer: true }
                        : question
                )
            );
        }
    }

    function resetGame() {
        setIsGameOver(false);
        toggleHome();
    }

    return (
        <div className="quiz--container">
            {isGettingData ? (
                <h1>Fetching data!</h1>
            ) : isGameOver ? (
                <GameOver
                    answersCorrect={answersCorrect}
                    questionAmount={questionAmount}
                    quizData={quizData}
                    resetGame={resetGame}
                    currentQuestionCount={currentQuestionCount}
                    currentQuizQuestion={currentQuizQuestion}
                    setCurrentQuestionCount={setCurrentQuestionCount}
                    isGameOver={isGameOver}
                />
            ) : (
                <div className="quiz--container">
                    <Question
                        id={currentQuizQuestion.id}
                        allAnswers={currentQuizQuestion.allAnswers}
                        changeSelectedAnswer={changeSelectedAnswer}
                        question={currentQuizQuestion.question}
                        correctAnswer={currentQuizQuestion.correct_answer}
                        selectedAnswer={currentQuizQuestion.selectedAnswer}
                        showAnswer={currentQuizQuestion.showAnswer}
                    />
                    <p className="quiz--current">
                        Question: {currentQuestionCount + 1} / {quizData.length}
                    </p>
                    {!isGameOver ? (
                        <button
                            className="quiz--check"
                            onClick={isGameOver ? resetGame : checkAnswer}
                        >
                            {currentQuestionCount + 1 < quizData.length
                                ? "Continue"
                                : "Submit Quiz"}
                        </button>
                    ) : null}
                </div>
            )}
        </div>
    );
}

export default Quiz;
