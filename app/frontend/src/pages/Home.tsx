import Navbar from '../components/Navbar';

import '../style/components/navbar.scss';
import '../style/pages/home.scss';

import HeroVideo from '../media/videos/home-bg.mp4';
import { useRef } from 'react';
import useIsVisible from '../hooks/visible';
import { useCounter } from '../hooks/useCounter';

import Phone from '../media/img/Free_iPhone_16_Mockup_2.png';
import { Link } from 'react-router';

export default function Home() {
  return (
    <>
      <Navbar />
      <header className="home-hero">
        <video autoPlay muted loop>
          <source src={HeroVideo} type="video/mp4" />
        </video>
        <div className="fade"></div>
        <div className="presentation">
          <h1 className="slogan">Ride Your Way</h1>
        </div>
      </header>
      <main className="home-main">
        <section className="info" id="info">
          <h1>Siamo sempre in espansione</h1>
          <div className="counters">
            <CounterCard nome="biciclette disponibili" num={234} />
            <CounterCard nome="sedi" num={5} />
            <CounterCard nome="utenti attivi" num={345367} />
            <CounterCard nome="dipendenti" num={4} />
          </div>
        </section>
        <section className="home-app">
          <div className="desc">
            <h1>Scarica l'app mobile</h1>
            <p>
              Scarica la nostra app mobile per accedere facilmente al servizio di bike sharing.
              <br />
              <Link to={'/mobile'}>Disponibile per iOS e Android.</Link>
            </p>
          </div>
          <div className="app-img">
            <img src={Phone} alt="phone with app preview" width="100%" />
          </div>
        </section>
        <section className="last">
          <div className="bike"></div>
        </section>
      </main>
    </>
  );
}

function CounterCard({ nome, num }: { nome: string; num: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useIsVisible(ref, true); // trigger once
  const animatedNumber = useCounter(isVisible, num, 2000); // 2 sec

  return (
    <div className="card" ref={ref}>
      <h3>{animatedNumber.toLocaleString()}</h3>
      <p>{nome}</p>
    </div>
  );
}
