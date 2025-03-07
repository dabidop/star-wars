<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const peliculas = ref([]);

const imagenesTMDB = {
  "A New Hope": "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  "The Empire Strikes Back": "https://image.tmdb.org/t/p/w500/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg",
  "Return of the Jedi": "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2014/07/357496-cine-ciencia-ficcion-critica-star-wars-retorno-jedi.png?tf=3840x",
  "The Phantom Menace": "https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/05/Critica-La-guerra-de-las-galaxias-episodio-I-La-amenaza-fantasma-Star-Wars-Episode-I-The-Phantom-Menace.jpg?fit=1280%2C770&ssl=1",
  "Attack of the Clones": "https://resizing.flixster.com/M4Tez26iVTjfna1CIWrEXiKn8Ps=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p28914_v_h10_at.jpg",
  "Revenge of the Sith": "https://play-lh.googleusercontent.com/FJqj1FGvx6yhFxUQhEWRJYYkKNTn6dKcdMdBdI0t1X7LTaVbtYCmbgZZ3IKPF6QMXvsE"
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
        <p class="descripcion text-center">{{ pelicula.descripcion }}</p>
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

h3 {
  font-family: "StarJedi", sans-serif;
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
  font-size: 16px;
  color: #ddd;
  margin-top: 10px;
  text-align: justify;
  padding: 0 10px;
  font-family: "Orbitron";

}


/* Fecha */
.fecha {
  font-size: 16px;
  color: yellow;
  margin-top: 5px;
  font-family: "Orbitron";
}
</style>