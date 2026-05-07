<template>
  <nav class="navbar">
    
   
    <div class="logo">TASK-MANAGER</div>

  
    <div class="menu">
      <router-link to="/dashboard">Todas</router-link>
      <router-link to="/dashboard/alta">Alta</router-link>
      <router-link to="/dashboard/media">Media</router-link>
      <router-link to="/dashboard/baja">Baja</router-link>
    </div>

    
    <div class="acciones">
      <div class="notificaciones-container">

  <span
    class="campana"
    @click="mostrarNotificaciones = !mostrarNotificaciones"
  >
    🔔 {{ notificacionesStore.cantidad }}
  </span>

  <div
    v-if="mostrarNotificaciones"
    class="dropdown"
  >
    <p
      v-if="notificacionesStore.tareas.length === 0"
    >
      No hay tareas próximas
    </p>

    <div
      v-for="tarea in notificacionesStore.tareas"
      :key="tarea.id"
      class="notificacion"
    >
      <strong>{{ tarea.titulo }}</strong>

      <p>
        {{ new Date(tarea.fecha).toLocaleString() }}
      </p>
    </div>

  </div>

</div>

      
      <button class="btn-logout" @click="logout">
        Cerrar sesión
      </button>
    </div>

  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { useNotificacionesStore } from "../store/notificaciones";

const router = useRouter();
const authStore = useAuthStore();
const notificacionesStore = useNotificacionesStore();
const mostrarNotificaciones = ref(false);

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e2a38;
   height: 70px;             
  padding: 0 30px;   
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  z-index: 10;
}


.logo {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #ffffff; 
}


.menu {
  display: flex;
  gap: 20px;
}

.menu a {
  color: #cbd5e1;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: 0.3s;
}

.menu a:hover {
  background: #334155;
  color: white;
}

.menu a.router-link-active {
  background: #2563eb;
  color: white;
  font-weight: bold;
}


.acciones {
  display: flex;
  align-items: center;
  gap: 15px;
}


.campana {
  font-size: 20px;
  cursor: pointer;
}

.btn-logout {
  background: #ef4444;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.btn-logout:hover {
  background: #dc2626;
}



.notificaciones-container {
  position: relative;
}

.campana {
  cursor: pointer;
  font-size: 20px;
  transition: 0.3s;
}

.campana:hover {
  transform: scale(1.08);
}

.dropdown {
  position: absolute;
  top: 40px;
  right: 0;
  width: 280px;
  background: white;
  color: black;
  border-radius: 14px;
  padding: 15px;
  box-shadow: 0 6px 25px rgba(0,0,0,0.2);
  z-index: 1000;
}

.notificacion {
  padding: 10px;
  border-bottom: 1px solid #e2e8f0;
}

.notificacion:last-child {
  border-bottom: none;
}

.notificacion strong {
  color: #1e3a8a;
}

.notificacion p {
  margin-top: 5px;
  font-size: 13px;
  color: #475569;
}
</style>