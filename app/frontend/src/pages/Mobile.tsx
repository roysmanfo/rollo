import Navbar from "../components/Navbar";

import "../style/pages/mobile.scss";


export default function Mobile(){

    return (
        <>
            <Navbar />
            <main className="mobile-main">
                <h1 className="title">Scarica l'app mobile</h1>
                <p className="paragraph">
                    Scarica l'app mobile per accedere al servizio di bike sharing
                    in modo semplice e veloce.
                </p>
                <div className="downloads">
                    <DownloadButton platform="Android" icon="bi-android2" />
                    <DownloadButton platform="iOS" icon="bi-apple" />
                </div>
            </main>
            <footer className="mobile-footer">
                <p>© Rollo 2025 Padova, IT</p>
                <div className="socials">
                    <i className="bi bi-instagram" title="Seguici su instagram"></i>
                    <i className="bi bi-github" title="Seguici su github"></i>
                    <i className="bi bi-facebook" title="Seguici su facebook"></i>
                    <i className="bi bi-reddit" title="Seguici su reddit"></i>
                    <i className="bi bi-twitter-x" title="Seguici su X"></i>
                </div>
            </footer>
        </>
    )
}

function DownloadButton({platform, icon}: {platform: string, icon: string}){
    return(
        <div className="dowload-btn">
            <div className="icon">
                <i className={`bi ${icon}`}></i>
            </div>
            <p className="dl-text">{platform}</p>
        </div>
    )
}