import { nanoid } from "nanoid";

function Question(props) {
    const choices = props.allAnswers.map((answer) => {
        return (
            <button
                key={nanoid()}
                style={{
                    backgroundColor:
                        props.showAnswer && answer === props.correctAnswer
                            ? "#94D7A2"
                            : props.showAnswer &&
                              answer !== props.correctAnswer &&
                              props.selectedAnswer === answer
                            ? "#F8BCBC"
                            : props.selectedAnswer === answer
                            ? "#d1d8f9"
                            : "transparent",
                }}
                className="question--button"
                onClick={() => props.changeSelectedAnswer(props.id, answer)}
            >
                {decodeURIComponent(answer)}
            </button>
        );
    });
    return (
        <div className="question--container">
            <h1 className="question--title">
                {decodeURIComponent(props.question)}
            </h1>
            <div className="question--buttons">{choices}</div>
            <div className="line"></div>
        </div>
    );
}

export default Question;
