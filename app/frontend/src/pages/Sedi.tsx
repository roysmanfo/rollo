import Navbar from '../components/Navbar';

import '../style/pages/sedi.scss';

type Sede = {
  nome: string;
  comune: string;
  cap: number;
  via: string;
  civico: number;
  biciclette: number;
  telefono: string;
};

export default function Sedi() {
  const SEDI: Sede[] = [
    {
      nome: 'Centro',
      comune: 'Padova',
      cap: 35100,
      via: 'Via Roma',
      civico: 10,
      biciclette: 5,
      telefono: '0491234567',
    },
    {
      nome: 'Stazione',
      comune: 'Padova',
      cap: 35131,
      via: 'Viale Codalunga',
      civico: 25,
      biciclette: 7,
      telefono: '0497654321',
    },
    {
      nome: 'Università',
      comune: 'Padova',
      cap: 35121,
      via: 'Via del Santo',
      civico: 3,
      biciclette: 4,
      telefono: '0491112233',
    },
    {
      nome: 'Ospedale',
      comune: 'Padova',
      cap: 35128,
      via: 'Via Giustiniani',
      civico: 5,
      biciclette: 6,
      telefono: '0495566778',
    },
    {
      nome: 'Prato',
      comune: 'Padova',
      cap: 35122,
      via: 'Via Manzoni',
      civico: 18,
      biciclette: 8,
      telefono: '0498899776',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="main-sedi">
        <h1>Sedi</h1>
        <section>
          <Card />
        </section>
      </main>
    </>
  );
}

function Card() {
  return (
    <div className="card">
      <h3>Denis</h3>
      <ul>
        <li>via popa denis 123</li>
        <li>124 biciclette gestite</li>
        <li>36754725</li>
      </ul>
    </div>
  );
}
