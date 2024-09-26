const pool = require("../db");

class Transaction {
  static async create(userId, amount, category, date, description, type) {
    const result = await pool.query(
      "INSERT INTO transactions (user_id, amount, category, date, description, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [userId, amount, category, date, description, type]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  }
}

module.exports = Transaction;
