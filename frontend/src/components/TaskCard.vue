<template>
  <li>

    <!-- 🟢 NORMAL -->
    <div v-if="editandoId !== tarea.id">
      <strong>{{ tarea.titulo }}</strong>
      <p>{{ tarea.descripcion }}</p>
      <p>
        Fecha:
        {{ new Date(tarea.fecha).toLocaleString() }}
      </p>
      <p>Lugar: {{ tarea.lugar }}</p>
      <p>Categoría: {{ tarea.categoria }}</p>
      <p>Materia: {{ tarea.materia }}</p>

      <p>
        Prioridad:
        <span :class="tarea.prioridad || 'media'">
          {{ tarea.prioridad }}
        </span>
      </p>

      <p>Etiquetas: {{ tarea.etiquetas }}</p>

      <div class="botones">
        <button @click="$emit('editar', tarea)">Editar</button>
        <button @click="$emit('eliminar', tarea.id)">Eliminar</button>
      </div>
    </div>

    <!-- 🟡 EDITANDO -->
    <div v-else>
      <input v-model="tareaLocal.titulo" />
      <input v-model="tareaLocal.descripcion" />
      <input type="date" v-model="tareaLocal.fecha" />
      <input v-model="tareaLocal.lugar" />
      <input v-model="tareaLocal.categoria" />
      <input v-model="tareaLocal.materia" />
      <input v-model="tareaLocal.prioridad" />
      <input v-model="tareaLocal.etiquetas" />

      <div class="botones">
        <button @click="$emit('guardar', tarea.id, tareaLocal)">Guardar</button>
        <button @click="$emit('cancelar')">Cancelar</button>
      </div>
    </div>

  </li>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  tarea: Object,
  editandoId: Number
});

const tareaLocal = ref({ ...props.tarea });

watch(
  () => props.tarea,
  (nueva) => {
    tareaLocal.value = { ...nueva };
  }
);

const formatearFecha = (fecha) => {
  if (!fecha) return "";
  return new Date(fecha).toLocaleDateString();
};
</script>






<style scoped>
li {
  list-style: none;
  background: #f8fafc;
  margin-bottom: 15px;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  transition: 0.3s;
}

li:hover {
  transform: translateY(-2px);
}

strong {
  font-size: 18px;
  color: #0f172a;
}

p {
  margin: 6px 0;
  color: #475569;
}

.botones {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

button {
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

/* EDITAR */
button:first-child {
  background: #3b82f6;
  color: white;
}

button:first-child:hover {
  background: #2563eb;
}

/* ELIMINAR */
button:last-child {
  background: #ef4444;
  color: white;
}

button:last-child:hover {
  background: #dc2626;
}

/* INPUTS */
input {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #2563eb;
}

/* PRIORIDADES */
.alta {
  color: #dc2626;
  font-weight: bold;
}

.media {
  color: #f59e0b;
  font-weight: bold;
}

.baja {
  color: #16a34a;
  font-weight: bold;
}
</style>