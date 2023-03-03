import { nanoid } from "nanoid";

function Question({
    id,
    allAnswers,
    changeSelectedAnswer,
    question,
    correctAnswer,
    selectedAnswer,
    showAnswer,
    isGameOver,
}) {
    const choices = allAnswers.map((answer) => {
        return (
            <button
                key={nanoid()}
                style={{
                    backgroundColor:
                        showAnswer && answer === correctAnswer
                            ? "#1BCD70"
                            : showAnswer && selectedAnswer === answer
                            ? "#F70031"
                            : selectedAnswer === answer
                            ? "#1580E8"
                            : "transparent",
                }}
                className="question--button"
                onClick={isGameOver ? null : () => changeSelectedAnswer(id, answer)}
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
