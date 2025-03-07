import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Explore from "../views/Explore.vue";
import DetalleItem from "../components/DetalleItem.vue";
import Pelicula from "../views/Pelicula.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/explore/:categoria", component: Explore },
  { path: "/explore/:categoria/:id", component: DetalleItem },
  { path: "/pelicula/:id", component: Pelicula },
  { path: "/:catchAll(.*)", redirect: "/" },// Redirige cualquier ruta inválida al Home
  {path: "/films/:id", name: "Pelicula", component: Pelicula}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
