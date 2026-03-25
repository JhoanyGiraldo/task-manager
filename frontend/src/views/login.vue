<template>
  <div>
    <h1>Login</h1>

    <input v-model="email" placeholder="Email" />
    <br /><br />

    <input v-model="password" type="password" placeholder="Password" />
    <br /><br />

    <button @click="handleLogin">Iniciar sesión</button>
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