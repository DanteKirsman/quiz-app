function Home(props) {
    const difficultyOptions = ["easy", "medium", "hard"];
    return (
        <div className="home--container">
            <h1 className="home--title">Quiz App</h1>
            <select
                className="difficulty--select"
                value={props.options.difficulty}
                onChange={props.changeOptions}
                name="difficulty"
            >
                <option value="">Choose Difficulty</option>
                {difficultyOptions.map((value) => (
                    <option value={value} key={value}>
                        {value}
                    </option>
                ))}
            </select>
            <button className="home--button" onClick={props.toggleHome}>
                Start Quiz
            </button>
        </div>
    );
}

export default Home;
