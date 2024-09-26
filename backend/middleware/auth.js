const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Kein Token bereitgestellt" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token-Überprüfungsfehler:", err);
      return res.status(403).json({ message: "Token ungültig" });
    }
    req.userId = decoded.userId;
    next();
  });
}

module.exports = authenticateToken;
