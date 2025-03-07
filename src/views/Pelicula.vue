<template>
  <div class="pelicula-detalle">
    <!-- Imagen Principal -->
    <div class="banner">
      <div class="banner-overlay"></div>
      <img :src="imagenPelicula" :alt="pelicula.title" class="banner-img" />
      <h1 class="titulo">{{ pelicula.title }}</h1>
    </div>

    <!-- Información Principal -->
    <div class="info">
      <div class="info-card">
        <p><strong>Episodio:</strong> {{ pelicula.episode_id }}</p>
        <p><strong>Director:</strong> {{ pelicula.director }}</p>
        <p><strong>Productores:</strong> {{ pelicula.producer }}</p>
        <p>
          <strong>Fecha de Estreno:</strong> {{ formatDate(pelicula.release_date) }}
        </p>
        <p class="sinopsis">
          <strong>Sinopsis:</strong> {{ pelicula.opening_crawl }}
        </p>
      </div>
    </div>

    <!-- Secciones Adicionales -->
    <div class="contenedor">
      <section v-if="personajes.length">
        <h2>Personajes</h2>
        <div class="grid">
          <div v-for="personaje in personajes" :key="personaje.name" class="card">
            <!--<img :src="getImage(personaje.url, 'characters')" :alt="personaje.name" />-->
            <p>{{ personaje.name }}</p>
          </div>
        </div>
      </section>

      <section v-if="naves.length">
        <h2>Naves Espaciales</h2>
        <div class="grid">
          <div v-for="nave in naves" :key="nave.name" class="card">
            <!---<img :src="getImage(nave.url, 'starships')" :alt="nave.name" />-->
            <p>{{ nave.name }}</p>
          </div>
        </div>
      </section>

      <section v-if="planetas.length">
        <h2>Planetas</h2>
        <div class="grid">
          <div v-for="planeta in planetas" :key="planeta.name" class="card">
            <!--<img :src="getImage(planeta.url, 'planets')" :alt="planeta.name" />-->
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
        const resPelicula = await fetch(`https://swapi.dev/api/films/${route.params.id}/`);
        pelicula.value = await resPelicula.json();

        // Asignar imagen de la película
        const imagenesTMDB = {
          "A New Hope": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsnvNeCC1yi6u0xAaV9lGfOu6r9g1k2ZBD4Q&s",
          "The Empire Strikes Back": "https://image.tmdb.org/t/p/w500/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg",
          "Return of the Jedi": "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2014/07/357496-cine-ciencia-ficcion-critica-star-wars-retorno-jedi.png?tf=3840x",
          "The Phantom Menace": "https://i0.wp.com/es.rollingstone.com/wp-content/uploads/2024/05/Critica-La-guerra-de-las-galaxias-episodio-I-La-amenaza-fantasma-Star-Wars-Episode-I-The-Phantom-Menace.jpg?fit=1280%2C770&ssl=1",
          "Attack of the Clones": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk3R_6__oL9jEr6sFZ_QsdKchOBn3bpDCbZw&s",
          "Revenge of the Sith": "https://play-lh.googleusercontent.com/FJqj1FGvx6yhFxUQhEWRJYYkKNTn6dKcdMdBdI0t1X7LTaVbtYCmbgZZ3IKPF6QMXvsE",
        };
        imagenPelicula.value = imagenesTMDB[pelicula.value.title] || "/backup-image.jpg";

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

    return { pelicula, personajes, naves, planetas, imagenPelicula, formatDate, getImage };
  },
};
</script>

<style scoped>
.pelicula-detalle {
  color: #0b0a0a;
  padding: 2px;
  max-width: 1200px;
  margin: auto;
}

/* Banner */
.banner {
  position: relative;
  text-align: center;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
  filter: brightness(0.8);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

/* Aplicar la nueva fuente globalmente */
* {
  font-family: "Orbitron", sans-serif;
}

/* Títulos con efecto futurista */
.titulo {
  font-size: 3rem;
  font-weight: bold;
  color: yellow;
  text-shadow: 3px 3px 10px rgba(255, 255, 0, 0.8);
  text-transform: uppercase;
  margin-top: 15px;
}

/* Subtítulos con un brillo suave */
h2 {
  font-size: 2rem;
  text-align: center;
  color: yellow;
  text-shadow: 2px 2px 8px rgba(255, 255, 0, 0.6);
  margin-bottom: 20px;
}

/* Estilo más cinematográfico para la sinopsis */
.sinopsis {
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  text-align: justify;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-left: 5px solid yellow;
  box-shadow: inset 0px 0px 10px rgba(255, 255, 0, 0.5);
  border-radius: 8px;
  margin-top: 20px;
}

/* Información Principal con un diseño más llamativo */
.info-card {
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  text-align: center;
  border: 2px solid yellow;
  box-shadow: 0px 0px 15px rgba(255, 255, 0, 0.5);
}

.info-card p {
  font-size: 1.1rem;
  margin: 10px 0;
  color: white;
}

.info-card strong {
  color: yellow;
  font-size: 1.2rem;
}

/* Hover en tarjetas de personajes, naves y planetas */
.card:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 20px rgba(255, 255, 0, 0.8);
}

/* Bordes redondeados en imágenes para más suavidad */
.card img {
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
}

/* Brillo en imágenes al pasar el mouse */
.card img:hover {
  filter: brightness(1.3);
}

.card {
  background-color: rgb(196, 196, 194);
  padding-top: 10px;
}

</style>
