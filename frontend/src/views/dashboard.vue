<template>
  <div class="dashboard-container">
    <div class="card">
      <h1>Mis Tareas</h1>

      <!-- Crear tarea -->
      <div class="form">
        <input v-model="titulo" placeholder="Nueva tarea..." />
        <button @click="crearTarea">Agregar</button>
      </div>

      <!-- Lista de tareas -->
      <ul>
        <li v-for="tarea in tareas" :key="tarea.id">
          {{ tarea.titulo }}
          <button @click="eliminarTarea(tarea.id)">❌</button>
        </li>
      </ul>

      <button class="logout" @click="handleLogout">
        Cerrar sesión
      </button>
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

const authStore = useAuthStore();
const router = useRouter();

const API = "http://localhost:3000/api/tareas";


const token = localStorage.getItem("token");

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
    { titulo: titulo.value },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  titulo.value = "";
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
.dashboard-container {
  min-height: 100vh;
  background: #0f172a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
}

button {
  padding: 10px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.logout {
  margin-top: 20px;
  width: 100%;
  background: red;
  color: white;
}
</style>