import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL",
    [email]
  );
  return result.rows[0];
};

export const createUser = async (name, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};