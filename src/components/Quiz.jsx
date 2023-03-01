import { useEffect, useState } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

function Quiz(props) {
    const [quizData, setQuizData] = useState([]);
    const [answersCorrect, setAnswersCorrect] = useState(0);
    const [btnChecked, setBtnChecked] = useState(false);

    const allQuestionsAnswered = quizData.every(
        (question) => question.selectedAnswer !== ""
    );

    const { difficulty, category, questionAmount } = props.options;
    useEffect(() => {
        // Category starts at 9 and ends at 32 <--- Value
        // https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple&encode=url3986
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
            });
    }, [difficulty, category]);

    function changeSelectedAnswer(questionId, selectedAnswer) {
        setQuizData((prevQuestionsArray) =>
            prevQuestionsArray.map((question) =>
                question.id === questionId
                    ? { ...question, selectedAnswer: selectedAnswer }
                    : question
            )
        );
    }

    function checkAnswers() {
        if (allQuestionsAnswered) {
            setBtnChecked((prevCheck) => !prevCheck);
            setQuizData((prevQuestionsArray) =>
                prevQuestionsArray.map((question) => {
                    if (question.selectedAnswer === question.correct_answer) {
                        setAnswersCorrect((prevCount) => prevCount + 1);
                    }

                    return {
                        ...question,
                        showAnswer: true,
                    };
                })
            );
        }
    }

    function resetGame() {
        setBtnChecked((prevCheck) => !prevCheck);
        props.toggleHome();
    }

    const questions = quizData.map((item) => {
        return (
            <Question
                key={nanoid()}
                id={item.id}
                question={item.question}
                allAnswers={item.allAnswers}
                correctAnswer={item.correct_answer}
                changeSelectedAnswer={changeSelectedAnswer}
                selectedAnswer={item.selectedAnswer}
                showAnswer={item.showAnswer}
            />
        );
    });

    return (
        <div className="quiz--container">
            {questions}
            {allQuestionsAnswered && btnChecked && (
                <p className="quiz--answers">You got {answersCorrect}/{questionAmount}</p>
            )}
            <button
                className="quiz--check"
                onClick={btnChecked ? resetGame : checkAnswers}
            >
                {btnChecked ? "Play Again" : "Check Answers"}
            </button>
        </div>
    );
}

export default Quiz;
