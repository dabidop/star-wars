<template>
  <div class="app">
    <Sidebar @seleccionarCategoria="cargarDatos" />
    <div class="video-container">
      <video autoplay loop muted playsinline class="video-fondo">
        <source src="./assets/fondito.mp4" type="video/mp4">
        Tu navegador no soporta videos en HTML5.
      </video>
    </div>
    <div class="contenido">
      <router-view />
      <!-- Sección de exploración desde el Sidebar -->
      <div v-if="categoriaSeleccionada">
        <h2>{{ categoriaSeleccionada.nombre }}</h2>
        <ul>
          <li v-for="item in datos" :key="item.url" @click="verDetalle(item)" class="clickable">
            {{ item.name || item.title }}
          </li>
        </ul>
      </div>
      <DetalleItem v-if="itemSeleccionado" :item="itemSeleccionado" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "./components/Sidebar.vue";
import DetalleItem from "./components/DetalleItem.vue";

const router = useRouter();
const categoriaSeleccionada = ref(null);
const datos = ref([]);
const itemSeleccionado = ref(null);

const cargarDatos = async (categoria) => {
  categoriaSeleccionada.value = categoria;
  try {
    const respuesta = await fetch(`https://swapi.dev/api/${categoria.endpoint}/`);
    const data = await respuesta.json();
    datos.value = data.results;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

const verDetalle = (item) => {
  console.log("🔗 Navegando a detalle de:", item);
  const id = item.url.match(/(\d+)\/$/)[1]; // Extrae el ID de la URL de la API
  router.push(`/explore/${categoriaSeleccionada.value.endpoint}/${id}`);
};
</script>

<style>
@font-face {
  font-family: "StarJedi";
  src: url("/public/fonts/Starjedi.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

h1 {
  font-family: "StarJedi", sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 30px;
  text-align: center;
  color: yellow;
  margin-top: -10px;
}

html, body {
  height: auto;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.video-fondo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.contenido {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10%;
}

.clickable {
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 10px;
  display: block;
}

.clickable:hover {
  color: yellow;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>