<template>
    <div class="detalle" v-if="item">
      <h2>{{ item.name || item.title }}</h2>
      <p v-if="item.birth_year"><strong>Año de nacimiento:</strong> {{ item.birth_year }}</p>
      <p v-if="item.height"><strong>Altura:</strong> {{ item.height }} cm</p>
      <p v-if="item.director"><strong>Director:</strong> {{ item.director }}</p>
      <p v-if="item.producer"><strong>Productores:</strong> {{ item.producer }}</p>
  
      <h3 v-if="item.films">Películas</h3>
      <ul v-if="item.films">
        <li v-for="film in item.films" :key="film">
          <router-link :to="film">Ver película</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const item = ref(null);
  
  const cargarDetalle = async () => {
    try {
      const { categoria, id } = route.params;
      const respuesta = await fetch(`https://swapi.dev/api/${categoria}/${id}/`);
      item.value = await respuesta.json();
    } catch (error) {
      console.error("Error cargando detalle:", error);
    }
  };
  
  onMounted(() => {
    cargarDetalle();
  });
  </script>
  