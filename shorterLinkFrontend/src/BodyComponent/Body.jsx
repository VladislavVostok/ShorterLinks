import axios, { all } from "axios"
import "./bodyStlye.css"
import { useEffect, useState } from "react"
import linkIcon from "../assets/linkIcon.png"
import copyIcon from "../assets/copyIcon.png"

import fakeQr from "../assets/Qr.svg"
import Header from "../HeaderComponent/Header"

function Body(props) {
    let body;
    const [originalUrl, setOriginalUrl] = useState("");
    const [InputUrl, setInputUrl] = useState("");
    const [shortLink, setshortLink] = useState("");
    const [allLinks, SetLinks] = useState([]);

    useEffect(() => {
        GetAllLinks();
    }, [props.userProfile]);

    function handleOriginalLinkChange(e) {
        setshortLink("");
        setInputUrl(e.target.value);
    }

    function handleCopyButton() {
        navigator.clipboard.writeText(shortLink).then(function () {
            alert('Текст скопирован!');
        }).catch(function (err) {
            console.error('Ошибка копирования: ', err);
        });
    }

    function handleShortButton() {
        setOriginalUrl(InputUrl);
        if (originalUrl) {
            shortLinkResponse();
            GetAllLinks();
        }

    }

    function handleDeleteUrl(urlId) {
        deleteUrl(urlId);
    }

    async function deleteUrl(urlId) {
        try {
            const response = await axios.delete(`https://localhost:7132/api/Links/${urlId}`,{
                "headers":{
                    "Authorization":`Bearer ${props.tokenVal}`
                }
            });

            if (response.status === 204) {
                alert("deleted");
                GetAllLinks();
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    async function GetAllLinks() {
        try {
            const response = await axios.get("https://localhost:7132/api/Links", {
                headers: {
                    'Authorization': `Bearer ${props.tokenVal}`
                }
            });

            SetLinks(response.data);
            console.log("Ответ на всле ссылки" + JSON.stringify(response.data));

        }
        catch (requestError) {
            console.error(requestError);
        }
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

            setInputUrl("");
            console.log(response.data);
            setshortLink(response.data.shortUrl);
        }
        catch (error) {
            alert(error);
        }

    }

    if (props.userProfile) {
        body = <div className="bodyContainer">
            <h1>Shorten Your Loooong Links :&#41;</h1>
            <div className="linkInputContainer">
                <input onChange={handleOriginalLinkChange} value={InputUrl} type="text" placeholder="Enter the link here" />
                <button onClick={handleShortButton}>Shorter Now</button>
            </div>

            <div className="linksCardContainer">
                <div className="linksStats">
                    <h5>Short Links</h5>
                    <h5>Original Link</h5>
                    <h5>QR Code</h5>
                    <h5>Clicks</h5>
                    <h5>Date</h5>

                </div>
                {allLinks.map(link => (
                    <div className="linkCard">
                        <a href={link.shortUrl} target="_blank">{link.shortUrl}</a>
                        <img src={copyIcon} alt="copuIOcon" onClick={handleCopyButton} />
                        {/* <button onClick={handleCopyButton}>Копировать</button> */}

                        {/* сократить длину оришинальной ссылки до 20 символов */}
                        <a href={link.originalUrl} target="_blank">{link.originalUrl.slice(0, 20)}</a>


                        {/* <a href={link.originalUrl} target="_blank">{link.originalUrl}</a> */}

                        <img id="qrCode" onClick={() => handleDeleteUrl(link.id)} src={fakeQr} alt="Qr code" />
                        <h4>{link.clickCount}</h4>
                        <h4>{link.createdAt}</h4>
                    </div>
                ))}

            </div>
        </div>
    }
    else {
        body = <div className="bodyContainer">
            <h1>Shorten Your Loooong Links :&#41;</h1>
            <div className="linkInputContainer">
                <input onChange={handleOriginalLinkChange} value={InputUrl} type="text" placeholder="Enter the link here" />
                <button onClick={handleShortButton}>Shorter Now</button>
            </div>

            {shortLink &&
                <div className="linkCardContainer">
                    <div className="linkCard">
                        <a href={shortLink} target="blank">{shortLink}</a>
                        <img src={copyIcon} alt="copuIOcon" onClick={handleCopyButton} />
                        {/* <button onClick={handleCopyButton}>Копировать</button> */}
                        <a href={originalUrl} target="blank">{originalUrl}</a>
                        <img id="qrCode" src={fakeQr} alt="Qr code" />
                    </div>
                </div>
            }

        </div>
    }

    return (
        <>
            {body}
            {/* Если не было короткой ссылки */}
            {/* {shortLink &&
                <div className="linksContainer">
                    <div className="linksStats">
                        <h5>Short Links</h5>
                    </div>
                    <div className="linkCard">
                        <a href={shortLink} target="blank"> <h2>{shortLink}</h2></a>
                        <button onClick={handleCopyButton}>Копировать</button>
                        <img id="qrCode" src={fakeQr} alt="Qr code" />
                    </div>
                </div>
            } */}

        </>
    )
}

export default Body