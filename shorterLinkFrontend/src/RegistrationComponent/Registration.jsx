import { useState } from "react"
import axios from "axios"
import logo from "../assets/headerLogo.png"
import "./registrationStyle.css"




function Registration(props) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleUserNameInput(e) {
        setUsername(e.target.value);
    }
    function handleEmailInput(e) {
        setEmail(e.target.value);
    }
    function handlePasswordInput(e) {
        setPassword(e.target.value);
    }

    function handleRegister(event) {
        event.preventDefault();
        console.log(`${username} + ${password} + ${email}`);
        registerResponse();
    }

    async function registerResponse() {
        try {
            const response = await axios.post("https://localhost:7132/api/Auth/register", {
                "username": username,
                "email": email,
                "password": password
            });
            if (response.data) {
                console.log(response.data);
                // props.logined(true);
                props.registred(true);
            }
        }
        catch (error) {
            alert(error);
        }


    }

    return (
        <div className="registrationForm">
            <img src={logo} alt="Logog" />
            <h1>Добро пожаловать!</h1>
            <p>Зарегистрируйтесь и воспользуйтесь всеми возможностями нашего сервиса</p>


            <form method="post">
                <input onChange={handleUserNameInput} id="usernameInput" type="text" placeholder="Username" value={username} /><br />
                <input onChange={handleEmailInput} id="emailInput" type="email" placeholder="Email" value={email} /><br />
                <input onChange={handlePasswordInput} id="passwordInput" type="password" placeholder="Password" required value={password} /><br />
                <input onClick={handleRegister} id="submitInput" type="submit" value="Зарегистрироваться" />
            </form>

        </div>
    )
}

export default Registration



{/* {
                "username": "Hello",
            "email":"hello@gmail.com",
            "password":"hello123"
            } */}