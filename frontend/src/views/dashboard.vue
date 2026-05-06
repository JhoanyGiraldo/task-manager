<template>
  <div class="dashboard">
    <header class="header">

    </header>

    <div class="contenido">

      <!-- 🔥 FORMULARIO -->
      <TareaForm
        :prioridadVista="prioridadVista"
        @crear="crearTarea"
      />

      <!-- 🔥 LISTA -->
      <TareaLista
        :tareas="tareasFiltradas"
        :editandoId="editandoId"
        @editar="editarTarea"
        @eliminar="eliminarTarea"
        @guardar="guardarCambio"
        @cancelar="editandoId = null"
      />

    </div>
  </div>
</template>




<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useAuthStore } from "../store/auth";
import { useRouter, useRoute } from "vue-router";

import TareaForm from "../components/TareaForm.vue";
import TareaLista from "../components/TareaLista.vue";

const tareas = ref([]);

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const API = "http://localhost:3000/api/tareas";

const token = localStorage.getItem("token");

// 🔥 EDICIÓN
const editandoId = ref(null);
const tareaEditando = ref({});

// Obtener tareas
const obtenerTareas = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  tareas.value = res.data;
};

// 🔥 CREAR TAREA (AHORA RECIBE DATOS)
const crearTarea = async (datos) => {
  if (
    !datos.titulo ||
    !datos.descripcion ||
    !datos.fecha ||
    !datos.lugar ||
    !datos.categoria ||
    !datos.materia ||
    !datos.etiquetas
  ) {
    alert("Todos los campos son obligatorios");
    return;
  }

  const prioridadFinal =
    prioridadVista.value === "todas"
      ? datos.prioridad
      : prioridadVista.value;

  await axios.post(
    API,
    {
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      fecha: datos.fecha,
      lugar: datos.lugar,
      categoria: datos.categoria,
      materia: datos.materia,
      prioridad: prioridadFinal,
      etiquetas: datos.etiquetas,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

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

// 🔥 EDITAR
const editarTarea = (tarea) => {
  editandoId.value = tarea.id;

  tareaEditando.value = {
    ...tarea,
    fecha: tarea.fecha ? tarea.fecha.split("T")[0] : "",
  };
};

// 🔥 GUARDAR CAMBIO
const guardarCambio = async (id, datosActualizados) => {
  await axios.put(
    `${API}/${id}`,
    datosActualizados,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  editandoId.value = null;
  tareaEditando.value = {};

  obtenerTareas();
};

// Formatear fecha
const formatearFecha = (fecha) => {
  if (!fecha) return "";
  return new Date(fecha).toLocaleDateString();
};

// 🔥 FILTRO
const tareasFiltradas = computed(() => {
  if (prioridadVista.value === "todas") {
    return tareas.value;
  }

  return tareas.value.filter(
    (t) => t.prioridad === prioridadVista.value
  );
});

// 🔥 PRIORIDAD SEGÚN RUTA
const prioridadVista = computed(() => {
  return route.path.split("/")[2] || "todas";
});

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

.contenido {
  display: flex;
  gap: 20px;
  padding: 20px;
  flex: 1;
  align-items: flex-start;
}
</style>