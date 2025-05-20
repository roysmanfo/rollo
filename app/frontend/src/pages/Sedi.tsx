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

  const grouped = SEDI.reduce<Record<string, Sede[]>>((acc, sede) => {
    if (!acc[sede.comune]) acc[sede.comune] = [];
    acc[sede.comune].push(sede);
    return acc;
  }, {});

  const comuni = Object.keys(grouped).sort();
  comuni.forEach((comune) => grouped[comune].sort((a, b) => a.nome.localeCompare(b.nome)));

  return (
    <>
      <Navbar />
      <main className="main-sedi">
        <section>
          {comuni.map((comune) => (
            <Comune key={comune} comune={comune} sedi={grouped[comune]} />
          ))}
        </section>
      </main>
    </>
  );
}

function Comune({ comune, sedi }: { comune: string; sedi: Sede[] }) {
  return (
    <div className="comune-group">
      <h2 className="comune-title">{comune}</h2>
      <div className="sedi-list">
        {sedi.map((s) => (
          <Card key={s.telefono} sede={s} />
        ))}
      </div>
    </div>
  );
}

function Card({ sede }: { sede: Sede }) {
  return (
    <div className="card">
      <h3>{sede.nome}</h3>
      <ul>
        <li>
          <i className="bi bi-geo-fill"></i> {sede.via} {sede.civico}
        </li>
        <li>
          <i className="bi bi-bicycle"></i>
          {sede.biciclette} biciclette
        </li>
        <li>
          <i className="bi bi-telephone-fill"></i>+39 {sede.telefono}
        </li>
      </ul>
    </div>
  );
}
