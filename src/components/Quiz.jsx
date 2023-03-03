import { useEffect, useState } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

function Quiz({ options, toggleHome }) {
    const [quizData, setQuizData] = useState([]);
    const [answersCorrect, setAnswersCorrect] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isGettingData, setIsGettingData] = useState(true);

    const { difficulty, category, questionAmount } = options;

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
                        const randomNumber = Math.floor(Math.random() * 4);
                        allAnswers.splice(
                            randomNumber,
                            0,
                            question.correct_answer
                        );
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

    const currentQuizQuestion = quizData[currentQuestion];

    function checkAnswer() {
        if (
            currentQuizQuestion.selectedAnswer ===
            currentQuizQuestion.correct_answer
        ) {
            setAnswersCorrect((prevCorrect) => prevCorrect + 1);
        }
        if (
            currentQuestion + 1 < quizData.length &&
            currentQuizQuestion.selectedAnswer !== ""
        ) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        } else if (currentQuizQuestion.selectedAnswer !== "") {
            setIsGameOver(true);
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
                <h1>
                    You got {answersCorrect} / {questionAmount}
                </h1>
            ) : (
                <Question
                    id={currentQuizQuestion.id}
                    allAnswers={currentQuizQuestion.allAnswers}
                    changeSelectedAnswer={changeSelectedAnswer}
                    question={currentQuizQuestion.question}
                    correctAnswer={currentQuizQuestion.correct_answer}
                    selectedAnswer={currentQuizQuestion.selectedAnswer}
                    showAnswer={currentQuizQuestion.showAnswer}
                />
            )}
            <button
                className="quiz--check"
                onClick={isGameOver ? resetGame : checkAnswer}
            >
                {currentQuestion + 1 < quizData.length
                    ? "Continue"
                    : isGameOver
                    ? "Play Again"
                    : "Submit Quiz"}
            </button>
        </div>
    );
}

export default Quiz;
