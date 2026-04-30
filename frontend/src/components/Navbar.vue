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
      <span class="campana">🔔</span>

      
      <button class="btn-logout" @click="logout">
        Cerrar sesión
      </button>
    </div>

  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const router = useRouter();
const authStore = useAuthStore();

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
</style>