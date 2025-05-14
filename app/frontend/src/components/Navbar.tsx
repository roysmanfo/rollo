import { Link } from "react-router"


export default function Navbar(){
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
        </nav>
    )
}

