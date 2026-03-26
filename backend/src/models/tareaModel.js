import pool from "../config/db.js";


export const crearTarea = async (titulo, user_id) => {
  const result = await pool.query(
    "INSERT INTO tareas (titulo, user_id) VALUES ($1, $2) RETURNING *",
    [titulo, user_id]
  );
  return result.rows[0];
};


export const obtenerTareasPorUsuario = async (user_id) => {
  const result = await pool.query(
    "SELECT * FROM tareas WHERE user_id = $1 AND deleted_at IS NULL ORDER BY id DESC",
    [user_id]
  );
  return result.rows;
};


export const eliminarTarea = async (id) => {
  await pool.query(
    "UPDATE tareas SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1",
    [id]
  );
};