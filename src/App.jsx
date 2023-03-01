import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { useState } from "react";

function App() {
    const [isHome, setIsHome] = useState(false);

    function toggleHome() {
        setIsHome((prevIsHome) => !prevIsHome);
    }

    return <div>{isHome ? <Quiz toggleHome={toggleHome} /> : <Home toggleHome={toggleHome} />}</div>;
}

export default App;
