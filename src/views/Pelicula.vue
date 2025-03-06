<template>
  <div class="pelicula-detalle">
    <!-- Imagen Principal -->
    <div class="banner">
      <img :src="imagenPelicula" :alt="pelicula.title" class="banner-img" />
      <h1 class="titulo">{{ pelicula.title }}</h1>
    </div>

    <!-- Información Principal -->
    <div class="info">
      <p><strong>Episodio:</strong> {{ pelicula.episode_id }}</p>
      <p><strong>Director:</strong> {{ pelicula.director }}</p>
      <p><strong>Productores:</strong> {{ pelicula.producer }}</p>
      <p>
        <strong>Fecha de Estreno:</strong>
        {{ formatDate(pelicula.release_date) }}
      </p>
      <p class="sinopsis">
        <strong>Sinopsis:</strong> {{ pelicula.opening_crawl }}
      </p>
    </div>

    <!-- Secciones Adicionales -->
    <div class="contenedor">
      <section v-if="personajes.length">
        <h2>Personajes</h2>
        <div class="grid">
          <div
            v-for="personaje in personajes"
            :key="personaje.name"
            class="card"
          >
            <img
              :src="getImage(personaje.url, 'characters')"
              :alt="personaje.name"
            />
            <p>{{ personaje.name }}</p>
          </div>
        </div>
      </section>

      <section v-if="naves.length">
        <h2>Naves Espaciales</h2>
        <div class="grid">
          <div v-for="nave in naves" :key="nave.name" class="card">
            <img :src="getImage(nave.url, 'starships')" :alt="nave.name" />
            <p>{{ nave.name }}</p>
          </div>
        </div>
      </section>

      <section v-if="planetas.length">
        <h2>Planetas</h2>
        <div class="grid">
          <div v-for="planeta in planetas" :key="planeta.name" class="card">
            <img :src="getImage(planeta.url, 'planets')" :alt="planeta.name" />
            <p>{{ planeta.name }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "PeliculaDetalle",
  setup() {
    const route = useRoute();
    const pelicula = ref({});
    const personajes = ref([]);
    const naves = ref([]);
    const planetas = ref([]);
    const imagenPelicula = ref("");

    const obtenerDetalles = async () => {
      try {
        const resPelicula = await fetch(
          `https://swapi.dev/api/films/${route.params.id}/`
        );
        pelicula.value = await resPelicula.json();

        // Asignar imagen de la película
        const imagenesTMDB = {
          "A New Hope":
            "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
          "The Empire Strikes Back":
            "https://image.tmdb.org/t/p/w500/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg",
          "Return of the Jedi":
            "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2014/07/357496-cine-ciencia-ficcion-critica-star-wars-retorno-jedi.png?tf=3840x",
          "The Phantom Menace":
            "https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/05/Critica-La-guerra-de-las-galaxias-episodio-I-La-amenaza-fantasma-Star-Wars-Episode-I-The-Phantom-Menace.jpg?fit=1280%2C770&ssl=1",
          "Attack of the Clones":
            "https://resizing.flixster.com/M4Tez26iVTjfna1CIWrEXiKn8Ps=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p28914_v_h10_at.jpg",
          "Revenge of the Sith":
            "https://play-lh.googleusercontent.com/FJqj1FGvx6yhFxUQhEWRJYYkKNTn6dKcdMdBdI0t1X7LTaVbtYCmbgZZ3IKPF6QMXvsE",
        };
        imagenPelicula.value =
          imagenesTMDB[pelicula.value.title] || "/backup-image.jpg";

        // Obtener detalles de personajes, naves y planetas
        personajes.value = await obtenerLista(pelicula.value.characters);
        naves.value = await obtenerLista(pelicula.value.starships);
        planetas.value = await obtenerLista(pelicula.value.planets);
      } catch (error) {
        console.error("Error al obtener los detalles:", error);
      }
    };

    const obtenerLista = async (urls) => {
      const promesas = urls.map((url) => fetch(url).then((res) => res.json()));
      return Promise.all(promesas);
    };

    const getImage = (url, type) => {
      const id = url.match(/(\d+)\/$/)[1];
      return `https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`;
    };

    const formatDate = (dateStr) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    };

    onMounted(() => {
      obtenerDetalles();
    });

    return {
      pelicula,
      personajes,
      naves,
      planetas,
      imagenPelicula,
      formatDate,
      getImage,
    };
  },
};
</script>

<style scoped>
.pelicula-detalle {
  color: #fff;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

/* Banner de la película */
.banner {
  position: relative;
  text-align: center;
}

.banner-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
  filter: brightness(0.7);
}

.titulo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  font-weight: bold;
  color: yellow;
  text-shadow: 2px 2px 10px black;
}

/* Información Principal */
.info {
  text-align: center;
  margin-top: 20px;
}

.sinopsis {
  text-align: justify;
  margin-top: 15px;
}

/* Contenedores */
.contenedor {
  margin-top: 30px;
}

h2 {
  text-align: center;
  color: yellow;
  margin-bottom: 15px;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  justify-content: center;
}

/* Tarjetas */
.card {
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.7);
}

.card img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
