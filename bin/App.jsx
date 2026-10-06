import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (!isLoggedIn) {
        return <Login setIsLoggedIn={setIsLoggedIn} />;
    }

    return <Home />;
}

export default App;