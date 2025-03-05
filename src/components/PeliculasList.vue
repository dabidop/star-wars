<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const peliculas = ref([]);

const imagenesTMDB = {
  "A New Hope": "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  "The Empire Strikes Back": "https://image.tmdb.org/t/p/w500/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg",
  "Return of the Jedi": "https://image.tmdb.org/t/p/w500/xd6wXnsoJvqXBC7SpdS9QEp6fpy.jpg",
  "The Phantom Menace": "https://image.tmdb.org/t/p/w500/An1nKjXahrChfEbZ3MAE8fsiut1.jpg",
  "Attack of the Clones": "https://image.tmdb.org/t/p/w500/tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
  "Revenge of the Sith": "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg"
};

const obtenerPeliculas = async () => {
  try {
    const respuesta = await fetch("https://swapi.dev/api/films/");
    const datos = await respuesta.json();

    peliculas.value = datos.results.map((pelicula, index) => ({
      ...pelicula,
      id: index + 1,
      imagen: imagenesTMDB[pelicula.title] || "/backup-image.jpg",
      descripcion: pelicula.opening_crawl.split(".")[0] + ".",
    }));
  } catch (error) {
    console.error("Error al obtener las películas:", error);
  }
};

onMounted(() => {
  obtenerPeliculas();
});

const irADetalle = (id) => {
  console.log("✅ Navegando a la película con ID:", id);
  router.push(`/pelicula/${id}`);
};
</script>

<template>
  <div class="contenedor">
    
    <div class="grid">
      <div v-for="(pelicula, index) in peliculas" :key="index" class="tarjeta" @click="irADetalle(pelicula.id)">
        <img :src="pelicula.imagen" :alt="pelicula.title" class="imagen">
        <h3>{{ pelicula.title }}</h3>
        <p class="descripcion">{{ pelicula.descripcion }}</p>
        <p class="fecha">Estreno: {{ pelicula.release_date }}</p>
      </div>
    </div>
  </div>
</template>

<style>
/* Contenedor */
.contenedor {
  text-align: center;
  padding: 50px 20px;
  position: relative;
  z-index: 2;
}

/* Grid corregido (3 columnas, 2 filas, más espacio entre ellas) */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 50px; /* Más espacio entre tarjetas */
  justify-content: center;
  padding: 40px;
}

/* Tarjetas */
.tarjeta {
  background: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  color: white;
  width: 320px; /* Tamaño fijo para mejor ajuste */
}

.tarjeta:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.7);
}

/* Imágenes (más anchas y menos verticales) */
.imagen {
  width: 100%;
  height: 220px; /* Se ajusta para que no sean tan verticales */
  border-radius: 10px;
  object-fit: cover;
}

/* Descripción */
.descripcion {
  font-size: 14px;
  color: #ddd;
  margin-top: 10px;
  text-align: justify;
  padding: 0 10px;
}

/* Fecha */
.fecha {
  font-size: 14px;
  color: yellow;
  margin-top: 5px;
}
</style>