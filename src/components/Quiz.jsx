import { useEffect, useState } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

function Quiz(props) {
    const [quizData, setQuizData] = useState([]);
    const [answersCorrect, setAnswersCorrect] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isGettingData, setIsGettingData] = useState(true);

    const allQuestionsAnswered = quizData.every(
        (question) => question.selectedAnswer !== ""
    );

    const { difficulty, category, questionAmount } = props.options;

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

    function checkAnswer() {
        if (
            quizData[currentQuestion].selectedAnswer ===
            quizData[currentQuestion].correct_answer
        ) {
            setAnswersCorrect((prevCorrect) => prevCorrect + 1);
        }
        if (
            currentQuestion + 1 < quizData.length &&
            quizData[currentQuestion].selectedAnswer !== ""
        ) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        } else if (quizData[currentQuestion].selectedAnswer !== "") {
            setIsGameOver(true);
        }
    }

    function resetGame() {
        setIsGameOver(false);
        props.toggleHome();
    }

    return (
        <div className="quiz--container">
            {isGettingData ? (
                <h1>Fetching data!</h1>
            ) : (
                <Question
                    id={quizData[currentQuestion].id}
                    allAnswers={quizData[currentQuestion].allAnswers}
                    changeSelectedAnswer={changeSelectedAnswer}
                    question={quizData[currentQuestion].question}
                    correctAnswer={quizData[currentQuestion].correct_answer}
                    selectedAnswer={quizData[currentQuestion].selectedAnswer}
                    showAnswer={quizData[currentQuestion].showAnswer}
                />
            )}
            {allQuestionsAnswered && isGameOver && (
                <p className="quiz--answers">
                    You got {answersCorrect}/{questionAmount}
                </p>
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
