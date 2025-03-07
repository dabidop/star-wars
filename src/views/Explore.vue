<template>
  <div class="explore">
    <h1 class="titulo">{{ nombreCategoria }}</h1>

    <!-- Loader -->
    <div v-if="cargando" class="loading-container">
      <span class="loader"></span>
      <p>Cargando {{ nombreCategoria }}...</p>
    </div>

    <!-- Grid de Tarjetas -->
    <div v-else class="grid">
      <div v-for="item in datos" :key="item.url" class="card">
        <router-link :to="`/explore/${categoria}/${item.url.match(/(\d+)\/$/)[1]}`">
          <h2>{{ item.name || item.title }}</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const categoria = ref(route.params.categoria);
const nombreCategoria = ref(categoria.value.charAt(0).toUpperCase() + categoria.value.slice(1));
const datos = ref([]);
const cargando = ref(true);

const obtenerDatos = async () => {
  cargando.value = true;
  try {
    const respuesta = await fetch(`https://swapi.dev/api/${categoria.value}/`);
    const data = await respuesta.json();
    datos.value = data.results;
  } catch (error) {
    console.error("Error obteniendo datos:", error);
  }
  cargando.value = false;
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
/* Fondo con estilo espacial */
.explore {
  padding: 40px;
  text-align: center;
  min-height: 100vh;
  color: white;
  width: 70%;
}

h2 {
  font-family: "Orbitron";
  font-size: 18px;
}

/* Título épico */
.titulo {
  font-size: 2rem;
  font-weight: bold;
  color: yellow;
  text-shadow: 4px 4px 15px rgba(255, 255, 0, 0.8), 
               2px 2px 5px rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
}

/* Loader de carga */
.loading-container {
  text-align: center;
  margin-top: 50px;
}

.loader {
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid yellow;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Grid para organizar las tarjetas */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

/* Tarjetas con efecto hover */
.card {
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid yellow;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 20px rgba(255, 255, 0, 0.8);
}

/* Links dentro de las tarjetas */
.card a {
  text-decoration: none;
  color: yellow;
  font-size: 1.2rem;
  font-weight: bold;
  transition: color 0.3s ease;
}

.card a:hover {
  color: white;
}

</style>
