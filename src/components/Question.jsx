import { nanoid } from "nanoid";

function Question({
    id,
    allAnswers,
    changeSelectedAnswer,
    question,
    correctAnswer,
    selectedAnswer,
    showAnswer,
}) {
    const choices = allAnswers.map((answer) => {
        return (
            <button
                key={nanoid()}
                style={{
                    backgroundColor:
                        selectedAnswer === answer ? "#1580E8" : "transparent",
                }}
                className="question--button"
                onClick={() => changeSelectedAnswer(id, answer)}
            >
                {decodeURIComponent(answer)}
            </button>
        );
    });
    return (
        <div className="question--container">
            <h1 className="question--title">{decodeURIComponent(question)}</h1>
            <div className="question--buttons">{choices}</div>
            <div className="line"></div>
        </div>
    );
}

export default Question;
