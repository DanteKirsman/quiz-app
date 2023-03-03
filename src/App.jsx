import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { useState } from "react";

function App() {
    const [isHome, setIsHome] = useState(true);
    const [options, setOptions] = useState({
        difficulty: "easy",
        category: "any",
        questionAmount: "1",
    });

    function changeOptions(event) {
        setOptions((prevOptions) => ({
            ...prevOptions,
            [event.target.name]: event.target.value,
        }));
    }
    function toggleHome() {
        setIsHome((prevIsHome) => !prevIsHome);
    }

    return (
        <div>
            {isHome ? (
                <Home
                    options={options}
                    changeOptions={(event) => changeOptions(event)}
                    toggleHome={toggleHome}
                />
            ) : (
                <Quiz options={options} toggleHome={toggleHome} />
            )}
        </div>
    );
}

export default App;
