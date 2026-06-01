import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log("Conectado a PostgreSQL 🚀");
  })
  .catch((err) => {
    console.error("Error de conexión:", err);
  });

export default pool;