<template>
  <div class="explore">
    <h1>Explorando {{ nombreCategoria }}</h1>
    <ul>
      <li v-for="item in datos" :key="item.url">
        <router-link :to="`/explore/${categoria}/${item.url.match(/(\d+)\/$/)[1]}`">
          {{ item.name || item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const categoria = ref(route.params.categoria);
const nombreCategoria = ref(categoria.value.charAt(0).toUpperCase() + categoria.value.slice(1));
const datos = ref([]);

const obtenerDatos = async () => {
  try {
    const respuesta = await fetch(`https://swapi.dev/api/${categoria.value}/`);
    const data = await respuesta.json();
    datos.value = data.results;
  } catch (error) {
    console.error("Error obteniendo datos:", error);
  }
};

onMounted(() => {
  obtenerDatos();
});

// Detecta si cambia la categoría al navegar entre endpoints
watch(() => route.params.categoria, (nuevaCategoria) => {
  categoria.value = nuevaCategoria;
  nombreCategoria.value = nuevaCategoria.charAt(0).toUpperCase() + nuevaCategoria.slice(1);
  obtenerDatos();
});
</script>

<style scoped>
.explore {
  padding: 20px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: yellow;
  font-size: 18px;
  transition: color 0.3s ease;
}

a:hover {
  color: white;
}
</style>
