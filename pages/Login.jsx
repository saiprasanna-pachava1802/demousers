import { useState } from "react";

function Login({ setIsLoggedIn }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (username !== "" && password !== "") {
            setIsLoggedIn(true);
        }
    };

    return (
        <div className="login-page">

            <div className="login-box">

                <h2>Support Management System</h2>

                <h3>Login</h3>

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Login
                    </button>

                    <button type="button">
                        Forgot Password?
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;