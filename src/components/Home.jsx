function Home(props) {
    return (
        <div className="home--container">
            <h1 className="home--title">Quiz App</h1>
            <button className="home--button" onClick={props.toggleHome}>
                Start Quiz
            </button>
        </div>
    );
}

export default Home;
