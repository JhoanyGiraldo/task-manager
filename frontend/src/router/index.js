import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import { useAuthStore } from "../store/auth";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return "/login";
  }

  if (to.path === "/login" && token) {
    return "/dashboard";
  }

  return true;
});

export default router;