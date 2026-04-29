import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import { useAuthStore } from "../store/auth";
import MainLayout from "../layouts/MainLayout.vue";

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
  component: MainLayout,
  meta: { requiresAuth: true },
  children: [
    {
      path: "",
      component: Dashboard,
    },
    {
      path: "alta",
      component: Dashboard,
    },
    {
      path: "media",
      component: Dashboard,
    },
    {
      path: "baja",
      component: Dashboard,
    },
  ],
}
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