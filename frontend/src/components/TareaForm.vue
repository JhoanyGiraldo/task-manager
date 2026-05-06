<template>
  <div class="formulario">
    <h2>Nueva tarea</h2>

    <input v-model="form.titulo" placeholder="Título" />
    <input v-model="form.descripcion" placeholder="Descripción" />
    <input type="date" v-model="form.fecha" />
    <input v-model="form.lugar" placeholder="Lugar" />
    <input v-model="form.categoria" placeholder="Categoría" />
    <input v-model="form.materia" placeholder="Materia" />

    <select
      v-model="form.prioridad"
      :disabled="prioridadVista !== 'todas'"
    >
      <option value="baja">Baja</option>
      <option value="media">Media</option>
      <option value="alta">Alta</option>
    </select>

    <input
      v-model="form.etiquetas"
      placeholder="Etiquetas (coma separadas)"
    />

    <button @click="enviarFormulario">
      Crear tarea
    </button>
  </div>
</template>




<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  prioridadVista: String
});

const emit = defineEmits(["crear"]);

const form = reactive({
  titulo: "",
  descripcion: "",
  fecha: "",
  lugar: "",
  categoria: "",
  materia: "",
  prioridad: "media",
  etiquetas: "",
});

// sincronizar prioridad
watch(
  () => props.prioridadVista,
  (nuevaVista) => {
    if (nuevaVista !== "todas") {
      form.prioridad = nuevaVista;
    } else {
      form.prioridad = "media";
    }
  },
  { immediate: true }
);

const enviarFormulario = () => {
  emit("crear", { ...form });

  // limpiar
  form.titulo = "";
  form.descripcion = "";
  form.fecha = "";
  form.lugar = "";
  form.categoria = "";
  form.materia = "";
  form.etiquetas = "";

  if (props.prioridadVista === "todas") {
    form.prioridad = "media";
  }
};
</script>




<style scoped>
.formulario {
  width: 30%;
  background: white;
  color: black;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.formulario h2 {
  margin-bottom: 20px;
  color: #1e3a8a;
}

input,
select {
  width: 100%;
  margin-bottom: 12px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
}

input:focus,
select:focus {
  outline: none;
  border-color: #2563eb;
}

button {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #1d4ed8;
}
</style>