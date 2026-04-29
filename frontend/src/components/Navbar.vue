<template>
  <nav class="navbar">
    
    <div class="logo">
      Gestor
    </div>

    <div class="menu">
      <router-link to="/dashboard">Todas</router-link>
      <router-link to="/dashboard/alta">Alta</router-link>
      <router-link to="/dashboard/media">Media</router-link>
      <router-link to="/dashboard/baja">Baja</router-link>
    </div>

    <div class="acciones">
      <span class="campana"></span>
      <button @click="logout">Salir</button>
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
  padding: 15px 30px;
  color: white;
}

/* LOGO */
.logo {
  font-size: 20px;
  font-weight: bold;
}

/* MENU */
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

/* HOVER */
.menu a:hover {
  background: #334155;
  color: white;
}

/* ACTIVO */
.menu a.router-link-active {
  background: #2563eb;
  color: white;
  font-weight: bold;
}

/* ACCIONES */
.acciones {
  display: flex;
  align-items: center;
  gap: 15px;
}

.campana {
  font-size: 18px;
  cursor: pointer;
}

.acciones button {
  background: #ef4444;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.acciones button:hover {
  background: #dc2626;
}
</style>