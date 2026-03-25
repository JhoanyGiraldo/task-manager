<template>
  <div class="container">
    <div class="card">
      <h2>Iniciar sesión</h2>

      <input v-model="email" placeholder="Correo electrónico" />
      <input v-model="password" type="password" placeholder="Contraseña" />

      <button @click="handleLogin">Ingresar</button>

      <p v-if="error" class="error">{{ error }}</p>

      <p class="link">
        ¿No tienes cuenta?
        <router-link to="/register">Regístrate</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import api from "../services/api";

const email = ref("");
const password = ref("");

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });

   
    localStorage.setItem("token", res.data.token);

    authStore.login(res.data.user);

    router.push("/dashboard");

  } catch (error) {
    alert("Credenciales incorrectas");
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1e3a8a, #0f172a);
}

.card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  width: 350px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #0f172a;
}

input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
}

input:focus {
  border-color: #2563eb;
}

button {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}

button:hover {
  background: #1d4ed8;
}

.link {
  margin-top: 15px;
  font-size: 14px;
}

a {
  color: #2563eb;
  text-decoration: none;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>