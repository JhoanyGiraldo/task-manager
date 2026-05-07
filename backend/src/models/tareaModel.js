import pool from "../config/db.js";


export const crearTarea = async (titulo, user_id, descripcion, fecha, lugar, categoria, materia, prioridad, etiquetas) => {
  const result = await pool.query(
    "INSERT INTO tareas (titulo, user_id, descripcion, fecha, lugar, categoria, materia, prioridad, etiquetas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [titulo, user_id, descripcion, fecha, lugar, categoria, materia, prioridad, etiquetas]
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



export const actualizarTarea = async (
  id,
  titulo,
  descripcion,
  fecha,
  lugar,
  categoria,
  materia,
  prioridad,
  etiquetas
) => {
  const result = await pool.query(
    `UPDATE tareas 
     SET titulo = $1,
         descripcion = $2,
         fecha = $3,
         lugar = $4,
         categoria = $5,
         materia = $6,
         prioridad = $7,
         etiquetas = $8,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $9
     RETURNING *`,
    [
      titulo,
      descripcion,
      fecha,
      lugar,
      categoria,
      materia,
      prioridad,
      etiquetas,
      id,
    ]
  );

  return result.rows[0];
};