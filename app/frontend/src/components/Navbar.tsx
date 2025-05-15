import { useState } from 'react';
import { Link } from 'react-router';
import type { User } from '../api/user';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <nav>
      <div className="title">
        <i className="bi bi-bicycle"></i>
        <p>Rollo</p>
      </div>
      <ul className="navigation">
        <Link to="/#">Chi siamo</Link>
        <Link to="/#">Sedi</Link>
        <Link to="/mobile">App mobile</Link>
      </ul>
      <div className="loginBtns">
        <Link to="/auth">
          <button>Login</button>
        </Link>
      </div>
    </nav>
  );
}
