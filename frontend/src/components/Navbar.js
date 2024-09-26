import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav>
      <Link to="/">Home</Link>
      {token ? (
        <Link to="/" onClick={() => localStorage.clear()}>
          Abmelden
        </Link>
      ) : (
        <>
          <Link to="/login">Anmelden</Link>
          <Link to="/register">Registrieren</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
