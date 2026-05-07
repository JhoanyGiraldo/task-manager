import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificacionesStore = defineStore(
  "notificaciones",
  () => {
    const cantidad = ref(0);

    const tareas = ref([]);

    const actualizarNotificaciones = (
      nuevasTareas
    ) => {
      tareas.value = nuevasTareas;
      cantidad.value = nuevasTareas.length;
    };

    return {
      cantidad,
      tareas,
      actualizarNotificaciones,
    };
  }
);