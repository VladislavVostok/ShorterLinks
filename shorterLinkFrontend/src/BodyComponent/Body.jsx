import axios from "axios"
import "./bodyStlye.css"
import { useState } from "react"

function Body(props) {
    const [originalUrl, setOriginalUrl] = useState("");
    const [links,setLinks] = useState([]);

    function handleOriginalLinkChange(e) {
        setOriginalUrl(e.target.value);
    }

    function handleShortButton() {
        shortLinkResponse();
    }

    async function shortLinkResponse() {
        try {
            const response = await axios.post("https://localhost:7132/api/Links", {
                "OriginalUrl": originalUrl
            }, {
                headers: {
                    'Authorization': `Bearer ${props.tokenVal}`
                }
            });
            console.log(response.data);
        }
        catch (error) {
            alert(error);
        }

    }
    return (
        <div className="bodyContainer">
            <input onChange={handleOriginalLinkChange} type="text" />
            <button onClick={handleShortButton}>Сократить</button>
        </div>)
}

export default Body