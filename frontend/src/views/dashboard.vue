<template>
  <div>
    <h1>Dashboard</h1>

    <p>Bienvenido: {{ authStore.user?.email }}</p>

    <button @click="handleLogout">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>