import {
  crearTarea,
  obtenerTareasPorUsuario,
  eliminarTarea,
  actualizarTarea,
} from "../models/tareaModel.js";


export const crear = async (req, res) => {
  try {
    const {  titulo, descripcion, fecha, lugar, categoria, materia, prioridad, etiquetas } = req.body;
    const user_id = req.user.id;

    const tarea = await crearTarea(titulo, user_id, descripcion, fecha, lugar, categoria, materia, prioridad, etiquetas);

    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea" });
  }
};


export const obtenerTodas = async (req, res) => {
  try {
    const user_id = req.user.id;

    const tareas = await obtenerTareasPorUsuario(user_id);

    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas" });
  }
};


export const eliminar = async (req, res) => {
  try {
    const { id } = req.params;

    await eliminarTarea(id);

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
};


export const actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo } = req.body;

    const tarea = await actualizarTarea(id, titulo);

    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
};