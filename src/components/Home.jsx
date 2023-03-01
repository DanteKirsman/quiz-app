function Home(props) {
    const difficultyOptions = ["easy", "medium", "hard"];
    const categoryOptions = [
        "General Knowledge",
        "Entertainment: Books",
        "Entertainment: Film",
        "Entertainment: Music",
        "Entertainment: Musicals & Theatres",
        "Entertainment: Television",
        "Entertainment: Video Games",
        "Entertainment: Board Games",
        "Science & Nature",
        "Science: Computers",
        "Science: Mathematics",
        "Mythology",
        "Sports",
        "Geography",
        "History",
        "Politics",
        "Art",
        "Celebrities",
        "Animals",
        "Vehicles",
        "Entertainment: Comics",
        "Science: Gadgets",
        "Entertainment: Japanese Anime & Manga",
        "Entertainment: Cartoon & Animations",
    ];

    function questionAmountAdd() {
        const questionAmountOptions = [];
        for (let i = 0; i <= 50; i++) {
            questionAmountOptions.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
        return questionAmountOptions;
    }

    return (
        <div className="home--container">
            <h1 className="home--title">Quiz App</h1>
            <div className="difficulty--container">
                <p className="difficulty--text">Choose Difficulty:</p>
                <select
                    className="difficulty--select"
                    value={props.options.difficulty}
                    onChange={props.changeOptions}
                    name="difficulty"
                >
                    {difficultyOptions.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div className="category--container">
                <p className="category--text">Choose Category:</p>
                <select
                    className="category--select"
                    value={props.options.category}
                    onChange={props.changeOptions}
                    name="category"
                >
                    <option value="any">Any Category</option>
                    {categoryOptions.map((value, index) => {
                        return (
                            <option value={index + 9} key={value}>
                                {value}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="questions--container">
                <p className="questions--text">Amount of Questions:</p>
                <select
                    className="questions--select"
                    value={props.options.questions}
                    onChange={props.changeOptions}
                    name="questionAmount"
                >
                    {questionAmountAdd()}
                </select>
            </div>
            <button className="home--button" onClick={props.toggleHome}>
                Start Quiz
            </button>
        </div>
    );
}

export default Home;
