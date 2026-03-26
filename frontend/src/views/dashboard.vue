<template>
  <div class="dashboard">
    
    <div class="sidebar">
      <h2>Mi App</h2>

      <p class="user">
         {{ authStore.user?.name }}
      </p>

      <button @click="handleLogout">Cerrar sesión</button>
    </div>

    
    <div class="content">
      <h1>Dashboard</h1>
      <p>{{ message }}</p>

      <div class="card">
        <h3>Bienvenido </h3>
        <p>Has iniciado sesión correctamente.</p>
      </div>
    </div>
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
    router.push("/login");
  }
});

const handleLogout = () => {
  localStorage.removeItem("token");
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

/* SIDEBAR */
.sidebar {
  width: 250px;
  background: #1e293b;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar h2 {
  margin-bottom: 20px;
}

.user {
  margin-bottom: 20px;
}

.sidebar button {
  padding: 10px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

/* CONTENIDO */
.content {
  flex: 1;
  padding: 30px;
  background: #f1f5f9;
}

.card {
  margin-top: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
</style>