import Navbar from '../components/Navbar';

import '../style/pages/mobile.scss';

export default function Mobile() {
  return (
    <>
      <Navbar />
      <main className="mobile-main">
        <h1 className="title">Scarica l'app mobile</h1>
        <p className="paragraph">
          Scarica l'app mobile per accedere al servizio di bike sharing in modo semplice e veloce.
        </p>
        <div className="downloads">
          <DownloadButton platform="Android" icon="bi-android2" dl="rollo-v1.0.0.apk" />
          <DownloadButton platform="iOS" icon="bi-apple" dl="" />
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
  );
}

function DownloadButton({ platform, icon, dl }: { platform: string; icon: string; dl: string }) {
  const redirect = () => {
    if (dl) location.href = 'https://github.com/FrancescoDuluta/Rollo/releases/download/v1.0/' + dl;
  };

  return (
    <div className="dowload-btn" onClick={redirect}>
      <div className="icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <p className="dl-text">{platform}</p>
    </div>
  );
}
