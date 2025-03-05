import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Pelicula from "../views/Pelicula.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/pelicula/:id", component: Pelicula },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
