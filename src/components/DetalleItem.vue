<template>
  <div class="detalle-container" v-if="item">
    <div class="detalle-card">
      <!-- Imagen dinámica (si la hay) -->
      <img v-if="imageUrl" :src="imageUrl" :alt="item.name || item.title" class="detalle-imagen">

      <div class="detalle-info">
        <h2>{{ item.name || item.title }}</h2>
        
        <p v-if="item.birth_year"><strong>Año de nacimiento:</strong> {{ item.birth_year }}</p>
        <p v-if="item.height"><strong>Altura:</strong> {{ item.height }} cm</p>
        <p v-if="item.director"><strong>Director:</strong> {{ item.director }}</p>
        <p v-if="item.producer"><strong>Productores:</strong> {{ item.producer }}</p>

        <h3 v-if="films.length">Películas</h3>
        <ul v-if="films.length" class="peliculas-list">
          <li v-for="film in films" :key="film.id">
            <!-- Aseguramos que redirige a Pelicula.vue -->
            <router-link :to="{ name: 'Pelicula', params: { id: film.id } }">🎬 {{ film.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Loading -->
  <div v-else class="loading">
    <span class="loader"></span>
    <p>Cargando detalles...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const item = ref(null);
const imageUrl = ref("");
const films = ref([]); // Aquí guardaremos los datos de las películas

const cargarDetalle = async () => {
  try {
    const { categoria, id } = route.params;
    const respuesta = await fetch(`https://swapi.dev/api/${categoria}/${id}/`);
    item.value = await respuesta.json();
    imageUrl.value = obtenerImagen(item.value.name || item.value.title);

    // Obtener datos de películas con IDs
    if (item.value.films) {
      const filmRequests = item.value.films.map(async (filmUrl) => {
        const response = await fetch(filmUrl);
        const filmData = await response.json();
        return {
          title: filmData.title,
          id: filmUrl.match(/\/(\d+)\/$/)[1], // Extraer ID de la URL
        };
      });

      films.value = await Promise.all(filmRequests);
    }
  } catch (error) {
    console.error("Error cargando detalle:", error);
  }
};

const obtenerImagen = (nombre) => {
  const imagenes = {
    "Luke Skywalker": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
    "Darth Vader": "https://upload.wikimedia.org/wikipedia/en/7/72/Darth_Vader.png",
    "Yoda": "https://upload.wikimedia.org/wikipedia/en/7/7f/Yoda_Empire_Strikes_Back.png",
    "A New Hope": "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  };
  return imagenes[nombre] || "";
};

onMounted(() => {
  cargarDetalle();
});
</script>



<style scoped>
.detalle-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.detalle-card {
  display: flex;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 800px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
  gap: 20px;
}

.detalle-imagen {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.detalle-info {
  flex: 1;
}

h2 {
  border-bottom: 2px solid #FFD700;
  padding-bottom: 5px;
}

.peliculas-list {
  list-style: none;
  padding: 0;
}

.peliculas-list li {
  margin: 5px 0;
}

.peliculas-list a {
  text-decoration: none;
  color: #FFD700;
  font-weight: bold;
}

.peliculas-list a:hover {
  text-decoration: underline;
}

/* Loader de carga */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  color: white;
}

.loader {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #FFD700;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
