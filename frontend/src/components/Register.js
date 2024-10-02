import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Zustand für Fehlermeldungen
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Fehlermeldung zurücksetzen
    try {
      await axios.post("http://localhost:4000/api/auth/register", {
        email,
        password,
      });
      // Automatisches Einloggen nach erfolgreicher Registrierung
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", response.data.user.email);
      navigate("/dashboard");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Spezifische Fehlermeldung vom Server anzeigen
      } else {
        setError("Fehler bei der Registrierung. Bitte versuche es erneut."); // Generische Fehlermeldung
      }
    }
  };

  return (
    <div className="homepage">
      <h1>Create Your Account</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Fehlermeldung anzeigen */}
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
