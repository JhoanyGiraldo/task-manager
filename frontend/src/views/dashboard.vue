<template>
  <div>
    <h1>Dashboard</h1>

    <p>Bienvenido: {{ authStore.user?.email }}</p>
    <p>{{ message }}</p>

    <button @click="handleLogout">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import api from "../services/api";

const authStore = useAuthStore();
const router = useRouter();

const message = ref("");

onMounted(async () => {
  try {
    const res = await api.get("/auth/dashboard");
    message.value = res.data.message;
  } catch (error) {
    message.value = "No autorizado";
    router.push("/login");
  }
});

const handleLogout = () => {
  localStorage.removeItem("token");
  authStore.logout();
  router.push("/login");
};
</script>