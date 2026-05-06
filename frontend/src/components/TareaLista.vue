<template>
  <div class="lista">
    <h2>Mis tareas</h2>

    <ul>
      <TaskCard
        v-for="tarea in tareas"
        :key="tarea.id"
        :tarea="tarea"
        :editandoId="editandoId"
        @editar="$emit('editar', $event)"
        @eliminar="$emit('eliminar', $event)"
        @guardar="(id, datos) => $emit('guardar', id, datos)"
        @cancelar="$emit('cancelar')"
      />
    </ul>
  </div>
</template>

<script setup>
import TaskCard from "./TaskCard.vue";

defineProps({
  tareas: Array,
  editandoId: Number
});

defineEmits([
  "editar",
  "eliminar",
  "guardar",
  "cancelar"
]);
</script>




<style scoped>
.lista {
  width: 70%;
  background: white;
  color: black;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.lista h2 {
  margin-bottom: 20px;
  color: #1e3a8a;
}

.lista ul {
  padding: 0;
  margin: 0;
}
</style>