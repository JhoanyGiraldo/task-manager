<template>
  <div class="dashboard">
    <header class="header">
      <h1>Gestor de Tareas</h1>
      <button @click="handleLogout">Cerrar sesión</button>
    </header>

    <div class="contenido">
      
      <!-- FORMULARIO -->
      <div class="formulario">
        <h2>Nueva tarea</h2>

        <input v-model="titulo" placeholder="Título" />
        <input v-model="descripcion" placeholder="Descripción" />
        <input type="date" v-model="fecha" />
        <input v-model="lugar" placeholder="Lugar" />
        <input v-model="categoria" placeholder="Categoría" />
        <input v-model="materia" placeholder="Materia" />

        <select v-model="prioridad">
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <input v-model="etiquetas" placeholder="Etiquetas (coma separadas)" />

        <button @click="crearTarea">Crear tarea</button>
      </div>

      <!-- LISTA -->
      <div class="lista">
        <h2>Mis tareas</h2>

        <ul>
          <li v-for="tarea in tareas" :key="tarea.id">
            <strong>{{ tarea.titulo }}</strong>
            <p>{{ tarea.descripcion }}</p>
            <p>Fecha: {{ formatearFecha(tarea.fecha) }}</p>
            <p>Lugar: {{ tarea.lugar }}</p>
            <p>Categoría: {{ tarea.categoria }}</p>
            <p>Materia: {{ tarea.materia }}</p>

            <p> Prioridad: <span :class="tarea.prioridad || 'media'"> {{ tarea.prioridad }}</span> </p>


            <p>Etiquetas: {{ tarea.etiquetas }}</p>
            

            <button @click="eliminarTarea(tarea.id)">Eliminar</button>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>




<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const tareas = ref([]);
const titulo = ref("");
const descripcion = ref("");
const fecha = ref("");
const lugar = ref("");
const categoria = ref("");
const materia = ref("");
const prioridad = ref("media");
const etiquetas = ref("");

const authStore = useAuthStore();
const router = useRouter();

const API = "http://localhost:3000/api/tareas";


const token = localStorage.getItem("token");

const editandoId = ref(null);
const nuevoTitulo = ref("");

// Obtener tareas
const obtenerTareas = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  tareas.value = res.data;
};

// Crear tarea
const crearTarea = async () => {
  if (!titulo.value) return;

  await axios.post(
    API,
    { titulo: titulo.value, descripcion: descripcion.value, fecha: fecha.value, lugar: lugar.value, categoria: categoria.value, materia: materia.value, prioridad: prioridad.value, etiquetas: etiquetas.value, },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  titulo.value = "";
  descripcion.value = "";
  fecha.value = "";
  lugar.value = "";
  categoria.value = "";
  materia.value = "";
  prioridad.value = "media";
  etiquetas.value = "";
  obtenerTareas();
};

// Eliminar tarea
const eliminarTarea = async (id) => {
  await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  obtenerTareas();
};



//Actualizar tarea
const editarTarea = (tarea) => {
  editandoId.value = tarea.id;
  nuevoTitulo.value = tarea.titulo;
};

const guardarCambio = async (id) => {
  await axios.put(
    `${API}/${id}`,
    { titulo: nuevoTitulo.value },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  editandoId.value = null;
  nuevoTitulo.value = "";
  obtenerTareas();
};


const formatearFecha = (fecha) => {
  if (!fecha) return "";
  return new Date(fecha).toLocaleDateString();
};

// Logout
const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

// Cargar al entrar
onMounted(() => {
  obtenerTareas();
});
</script>






<style scoped>
.dashboard {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  color: white;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #1e293b;
}

.header h1 {
  margin: 0;
}

.header button {
  background: red;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
}

/* CONTENIDO */
.contenido {
  display: flex;
  gap: 20px;
  padding: 20px;
  flex: 1;
}

/* FORMULARIO */
.formulario {
  width: 30%;
  background: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
}

/* LISTA */
.lista {
  width: 70%;
  background: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
}

/* INPUTS */
input, select {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* BOTONES */
button {
  padding: 10px 14px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  transition: 0.2s;
}

/* botón crear */
.formulario button {
  background: #3b82f6;
  color: white;
}

.formulario button:hover {
  background: #2563eb;
}

/* botón eliminar */
.lista button {
  background: #ef4444;
  color: white;
  margin-top: 5px;
}

.lista button:hover {
  background: #dc2626;
}

/* ITEMS */
.lista ul {
  list-style: none;
  padding: 0;
}

.lista li {
  position: relative; 
  background: #f8fafc;
  margin-bottom: 12px;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.lista li button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ef4444;
  color: white;
  padding: 6px 10px;
  font-size: 12px;
}





.tarea {
  position: relative;
  background: #f8fafc;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.tarea h3 {
  margin: 0;
}

.desc {
  color: #475569;
  margin-bottom: 8px;
}

/* botón eliminar */
.btn-eliminar {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ef4444;
  color: white;
}

/* prioridad */
.alta {
  color: red;
  font-weight: bold;
}

.media {
  color: orange;
  font-weight: bold;
}

.baja {
  color: green;
  font-weight: bold;
}
</style>