import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),

  actions: {
    login(userData) {
      this.isAuthenticated = true;
      this.user = userData;

      // 🔥 Guardar en localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userData));
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;

      // 🔥 Limpiar localStorage
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    },
  },
});