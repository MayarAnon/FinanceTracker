import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", response.data.user.email); // E-Mail speichern
      alert("Login erfolgreich!");
      navigate("/"); // Weiterleitung zum Dashboard
    } catch (error) {
      alert("Fehler beim Login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Anmelden</h2>
      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Anmelden</button>
    </form>
  );
}

export default Login;
