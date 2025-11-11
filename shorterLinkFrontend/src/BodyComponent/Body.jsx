import axios from "axios"
import "./bodyStlye.css"
import { useState } from "react"

import fakeQr from "../assets/Qr.svg"

function Body(props) {
    const [originalUrl, setOriginalUrl] = useState("asd");
    const [shortLink, setshortLink] = useState("");

    function handleOriginalLinkChange(e) {
        setOriginalUrl(e.target.value);
    }

    function handleCopyButton() {
        navigator.clipboard.writeText(shortLink).then(function () {
            alert('Текст скопирован!');
        }).catch(function (err) {
            console.error('Ошибка копирования: ', err);
        });
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
            setshortLink(response.data.shortUrl);
        }
        catch (error) {
            alert(error);
        }

    }
    return (
        <>
            <div className="bodyContainer">
                <input onChange={handleOriginalLinkChange} type="text" />
                <button onClick={handleShortButton}>Сократить</button>


            </div>
            {/* Если не было короткой ссылки */}
            {shortLink &&
                <div className="linksContainer">
                    <div className="linkCard">
                        <a href={shortLink} target="blank"> <h2>{shortLink}</h2></a>
                        <button onClick={handleCopyButton}>Копировать</button>
                        <img id="qrCode" src={fakeQr} alt="Qr code" />
                    </div>
                </div>
            }

        </>
    )
}

export default Body