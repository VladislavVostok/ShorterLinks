import { useEffect, useState } from "react";
import "../HeaderComponent/headerStyle.css"
import loginLogo from "../assets/loginIcon.png"

function Header(props) {
    const [userName, setUserName] = useState("");
    let renderHeader;

    useEffect(() => {
        const userD = localStorage.getItem("userData");
        setUserName(JSON.parse(userD).username);
    }, [])
    function handleUserProfileBtn() {
        props.isUserProfile(true);
    }
    function handleLogo() {
        props.isUserProfile(false);
    }
    function handleLogOut() {
        localStorage.setItem("userData", "");
        loginState(false);
        registrState(false);
    }

    if (props.logined) {
        renderHeader = <div className="headerConatainer">
            <h1 onClick={handleLogo}>Linkly</h1>
            <button id="Login" onClick={handleLogOut}>Log out <img src={loginLogo} alt="loginIcon" /> </button>
            <button onClick={handleUserProfileBtn} id="signUp">{userName}</button>
        </div>
    }
    else {
        renderHeader = <div className="headerConatainer">
            <h1>Linkly</h1>
            <button id="Login">Login <img src={loginLogo} alt="loginIcon" /> </button>
            <button id="signUp">Regiseter now</button>
        </div>
    }


    return (
        <>
            {renderHeader}
        </>
    )

}

export default Header