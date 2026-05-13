<template>
  <div class="dashboard">
    <header class="header">
    
    </header>

    <div class="contenido">

      
      <TareaForm
        :prioridadVista="prioridadVista"
        @crear="crearTarea"
      />

      
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
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

import TareaForm from "../components/TareaForm.vue";
import TareaLista from "../components/TareaLista.vue";
import { useNotificacionesStore } from "../store/notificaciones";

const tareas = ref([]);

const route = useRoute();
const notificacionesStore = useNotificacionesStore();

const API = "http://localhost:3000/api/tareas";

const token = localStorage.getItem("token");


const editandoId = ref(null);

// Obtener tareas
const obtenerTareas = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  tareas.value = res.data;
};


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


const editarTarea = (tarea) => {
  editandoId.value = tarea.id;
};


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

  obtenerTareas();
};



const tareasFiltradas = computed(() => {
  if (prioridadVista.value === "todas") {
    return tareas.value;
  }

  return tareas.value.filter(
    (t) => t.prioridad === prioridadVista.value
  );
});


const tareasProximas = computed(() => {
  const ahora = new Date();

  return tareas.value.filter((tarea) => {
    if (!tarea.fecha) return false;

    const fechaTarea = new Date(tarea.fecha);

    // diferencia en minutos
    const diferencia =
      (fechaTarea - ahora) / (1000 * 60);

    return diferencia > 0 && diferencia <= 10;
  });
});

watch(
  tareasProximas,
  (nuevasTareas) => {
    notificacionesStore.actualizarNotificaciones(
      nuevasTareas
    );
  },
  { immediate: true }
);


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