import '../style/pages/auth.scss';
import { useState } from 'react';

type Role = 'login' | 'sign up';

export default function Auth() {
  const [role, setRole] = useState<Role>('login');

  return (
    <>
      <main className="auth-main">
        <section className="auth-section">
          <h2>{role}</h2>
          <form method="post">
            <input
              className={role === 'login' ? 'hidden' : ''}
              type="name"
              placeholder="Nome"
              name="nome"
              id="nome"
            />
            <input
              className={role === 'login' ? 'hidden' : ''}
              type="surname"
              placeholder="Cognome"
              name="cognome"
              id="cognome"
            />
            <input type="email" placeholder="Email" name="email" id="email" />
            <input type="password" placeholder="Password" name="password" id="password" />
            <p className="switch">
              {role === 'login' ? (
                <>
                  Nessun account ?{' '}
                  <button type="button" onClick={() => setRole('sign up')}>
                    creane uno
                  </button>
                </>
              ) : (
                <>
                  Hai gia un account ?{' '}
                  <button type="button" onClick={() => setRole('login')}>
                    accedi
                  </button>
                </>
              )}
            </p>
            <button type="submit" className="submit">
              Invia
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
