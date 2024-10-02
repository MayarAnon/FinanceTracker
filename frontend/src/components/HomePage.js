import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/HomePage.css";

function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
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
      localStorage.setItem("userEmail", response.data.user.email);
      navigate("/dashboard");
    } catch (error) {
      alert("Fehler beim Login");
    }
  };

  return (
    <div className="homepage">
      <h1>Welcome to Your Finance Tracker</h1>
      <div className="form-container">
        <form onSubmit={handleLoginSubmit}>
          <h2>Sign in</h2>
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
          <button type="submit">Sign in</button>
        </form>
        <p>
          Don't have an account yet? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
