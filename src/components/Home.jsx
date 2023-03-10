function Home({ options, changeOptions, toggleHome }) {
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
    const questionAmountOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className="home--container">
            <h1 className="home--title">Quiz App</h1>
            <div className="difficulty--container">
                <p className="difficulty--text">Choose Difficulty:</p>
                <select
                    className="difficulty--select"
                    value={options.difficulty}
                    onChange={changeOptions}
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
                    value={options.category}
                    onChange={changeOptions}
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
                    value={options.questions}
                    onChange={changeOptions}
                    name="questionAmount"
                >
                    {questionAmountOption.map((value) => {
                        return (
                            <option value={value} key={value}>
                                {value}
                            </option>
                        );
                    })}
                </select>
            </div>
            <button className="home--button" onClick={toggleHome}>
                Start Quiz
            </button>
        </div>
    );
}

export default Home;
