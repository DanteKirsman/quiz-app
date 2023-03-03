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
        const wrongAnswerColour = "#F70031";
        const correctAnswerColour = "#1BCD70";
        const selectedAnswerColour = "#1580E8";
        return (
            <button
                key={nanoid()}
                style={{
                    backgroundColor:
                        showAnswer && answer === correctAnswer
                            ? correctAnswerColour
                            : showAnswer && selectedAnswer === answer
                            ? wrongAnswerColour
                            : selectedAnswer === answer
                            ? selectedAnswerColour
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
