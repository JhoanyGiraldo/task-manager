<template>
  <div class="container">
    <div class="card">
      <h2>Registro</h2>

      <input v-model="name" placeholder="Nombre" />
      <input v-model="email" placeholder="Correo electrónico" />
      <input v-model="password" type="password" placeholder="Contraseña" />

      <button @click="handleRegister">Registrarse</button>

      <p v-if="error" class="error">{{ error }}</p>

      <p class="link">
        ¿Ya tienes cuenta?
        <router-link to="/login">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();

const handleRegister = async () => {
  try {
    await api.post("/auth/register", {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    alert("Usuario creado correctamente");

  
    router.push("/login");

  } catch (err) {
    error.value = "Error al registrar usuario";
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
}

.error {
  color: red;
  margin-top: 10px;
}
</style>