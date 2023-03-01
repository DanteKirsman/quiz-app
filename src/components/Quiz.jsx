import { useEffect, useState } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

function Quiz() {
    const [quizData, setQuizData] = useState([]);

    const allQuestionsAnswered = quizData.every(
        (question) => question.selectedAnswer !== ""
    );

    useEffect(() => {
        const api =
            "https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986";
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
    }, []);

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
            setQuizData((prevQuestionsArray) =>
                prevQuestionsArray.map((question) => ({
                    ...question,
                    showAnswer: true,
                }))
            );
        }
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
    console.log(quizData);

    return (
        <div className="quiz--container">
            {questions}
            <button className="quiz--check" onClick={checkAnswers}>
                Check Answers
            </button>
        </div>
    );
}

export default Quiz;
