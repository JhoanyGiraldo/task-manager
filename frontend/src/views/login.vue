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

const email = ref("");
const password = ref("");

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = () => {
  // 🔥 Simulación de login (luego será con backend)
  if (email.value && password.value) {
    authStore.login({
      email: email.value,
    });

    router.push("/dashboard");
  } else {
    alert("Completa los campos");
  }
};
</script>