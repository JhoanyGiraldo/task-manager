<template>
  <div class="dashboard-container">
    <div class="card">
      <h1>Mis Tareas</h1>

      
      <div class="form">
        <input v-model="titulo" placeholder="Nueva tarea..." />
        <button @click="crearTarea">Agregar</button>
      </div>

      
      <ul>
       <li v-for="tarea in tareas" :key="tarea.id" class="tarea-item">
  
         <div v-if="editandoId === tarea.id" class="edit-mode">
           <input v-model="nuevoTitulo" />
           <button @click="guardarCambio(tarea.id)" class="btn-guardar">Guardar</button>
         </div>

         <div v-else class="view-mode">
           <span>{{ tarea.titulo }}</span>
         <div>
          <button @click="editarTarea(tarea)" class="btn-editar">Editar</button>
          <button @click="eliminarTarea(tarea.id)" class="btn-eliminar">Eliminar</button>
        </div>
  </div>

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
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 420px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
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
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  opacity: 0.85;
}


ul {
  list-style: none;
  padding: 0;
}


.tarea-item {
  background: #f1f5f9;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}


.view-mode {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.edit-mode {
  display: flex;
  gap: 10px;
}


.btn-editar {
  background: #3b82f6;
  color: white;
  margin-right: 5px;
}

.btn-eliminar {
  background: #ef4444;
  color: white;
}

.btn-guardar {
  background: #22c55e;
  color: white;
}

.logout {
  margin-top: 20px;
  width: 100%;
  background: #dc2626;
  color: white;
}
</style>