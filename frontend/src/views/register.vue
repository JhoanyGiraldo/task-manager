<template>
  <div>
    <h1>Registro</h1>

    <input v-model="name" placeholder="Nombre" />
    <br /><br />

    <input v-model="email" placeholder="Email" />
    <br /><br />

    <input v-model="password" type="password" placeholder="Password" />
    <br /><br />

    <button @click="handleRegister">Registrarse</button>

    <p v-if="error">{{ error }}</p>
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