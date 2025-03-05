<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pelicula = ref(null);

const obtenerPelicula = async () => {
  try {
    const respuesta = await fetch(`https://swapi.dev/api/films/${route.params.id}/`);
    const datos = await respuesta.json();
    pelicula.value = datos;
  } catch (error) {
    console.error("Error al obtener los detalles de la película:", error);
  }
};

onMounted(() => {
  obtenerPelicula();
});
</script>

<template>
  <div v-if="pelicula">
    <h1>{{ pelicula.title }}</h1>
    <p>{{ pelicula.opening_crawl }}</p>
  </div>
</template>

<style scoped>
h1 {
  color: yellow;
}
p {
  background: black;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>
