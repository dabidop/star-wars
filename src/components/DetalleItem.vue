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
    imageUrl.value = obtenerImagen(item.value.name || item.value.title, categoria);

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

const obtenerImagen = (nombre, categoria) => {
  const imagenes = {
    people: {
      "Luke Skywalker": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOno-_FKXD8KJ3Tx_lqDj18ePrRKR65_3myH4ihdynS66MqgU6KXIj-ii0TnE78FGEy5eURsBG4zuRc1YchZaly3B-YZQbw_AD8NlF6Z1OEpYRwUnrW2uQbHvMDNlgF9fqvcxtrCPIfse0/s1600/Luke_publicity_photo.jpg",
      "C-3PO": "https://cdn.pixabay.com/photo/2020/05/07/19/37/c-3po-5142911_1280.jpg",
      "R2-D2": "https://www.toysrus.es/medias/?context=bWFzdGVyfHByb2R1Y3RfaW1hZ2VzfDEzNDMxMHxpbWFnZS9qcGVnfGFEQTVMMmcxWVM4eE1qa3dNakExTnpJME5qYzFNQXwyMmQ5MjNkMTJjNTQzNTc4NzBhODA0YzA4Y2NmM2Q3ZGZkMTY5NjU4ZGQ2ZDNlM2QyMWI3MTQ3NTRmMGY0ZTQz",
      "Darth Vader": "https://i.pinimg.com/474x/51/e3/7c/51e37c2b688170cdc07888eba287bfd1.jpg",
      "Yoda": "https://upload.wikimedia.org/wikipedia/en/7/7f/Yoda_Empire_Strikes_Back.png",
      "Leia Organa": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXheSDM24ff0-8viZhW6K1H2xk6cUEOEA3Iw&s",
      "Owen Lars": "https://i.pinimg.com/474x/b5/3a/5a/b53a5ae9a90265578ecec1a99b0134cc.jpg",
      "Beru Whitesun lars": "https://i.pinimg.com/564x/c2/a9/9a/c2a99a51cf5ef19c15ea21c3548062a7.jpg",
      "R5-D4": "https://cdnx.jumpseller.com/wyvern/image/41707357/resize/1200/1200?1701292866",
      "Biggs Darklighter": "https://img.fruugo.com/product/2/77/301601772_0340_0340.jpg",
      "Obi-Wan Kenobi": "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1500x1500/products/86566/86119/lifesize_cardboard_cutout_of_Obi_Wan_Kenobi_buy_Star_Wars_cutouts_at_starstills__46756__80132.1394515391.jpg?c=2&imbypass=on",
    },
    starships: {
      "CR90 corvete": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "Star Destroyer": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "Sentinel-class landing craft": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "Death Star": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "Millennium Falcon": "https://upload.wikimedia.org/wikipedia/en/3/3e/Millennium_Falcon_TFA_promo_image.png",
      "Y-wing": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "X-wing": "https://upload.wikimedia.org/wikipedia/en/3/3e/X-Wing_Fighter_Star_Wars.png",
      "TIE Advanced x1": "https://upload.wikimedia.org/wikipedia/en/8/82/TIE_Advanced_X1.png",
      "Executor": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "Rebel transport": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
    },
    vehicles: {
      "Sand-Crawler": "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
      "T-16 skyhopper": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "X-34 landspeeder": "https://upload.wikimedia.org/wikipedia/en/5/5e/AT-AT_Star_Wars.png",
      "TIE/LN starfighter": "https://upload.wikimedia.org/wikipedia/en/e/ed/Speeder_bike_%28Star_Wars%29.png",
      "Snowspeeder": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "TIE bomber": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "AT-AT": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "AT-ST": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "Storm IV Twin-Pod cloud car": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
      "Sail barge": "https://upload.wikimedia.org/wikipedia/en/7/76/Luke_Skywalker.png",
    },
    planets: {
      "Tatooine": "https://upload.wikimedia.org/wikipedia/en/3/3d/Tatooine.png",
      "Alderaan": "https://upload.wikimedia.org/wikipedia/en/8/81/Hoth_planet.png",
      "Yavin IV": "https://upload.wikimedia.org/wikipedia/en/a/a7/Endor-ROTJ.png",
      "Hoth": "https://upload.wikimedia.org/wikipedia/en/a/a7/Endor-ROTJ.png",
      "Dagobah": "https://upload.wikimedia.org/wikipedia/en/a/a7/Endor-ROTJ.png",
      "Bespin": "https://upload.wikimedia.org/wikipedia/en/a/a7/Endor-ROTJ.png",
      "Endor": "https://upload.wikimedia.org/wikipedia/en/a/a7/Endor-ROTJ.png",
      "Naboo": "https://upload.wikimedia.org/wikipedia/en/a/a7/Endor-ROTJ.png",
      "Coruscant": "https://upload.wikimedia.org/wikipedia/en/a/a7/Endor-ROTJ.png",
      "Kamino": "https://upload.wikimedia.org/wikipedia/en/a/a7/Endor-ROTJ.png",
    },
    species: {
      "Human": "https://upload.wikimedia.org/wikipedia/en/6/6f/Chewbacca_%28Star_Wars%29.png",
      "Droid": "https://upload.wikimedia.org/wikipedia/en/e/e6/Ewok.png",
      "Wookie": "https://upload.wikimedia.org/wikipedia/en/5/5b/Greedo.jpg",
      "Rodian": "https://upload.wikimedia.org/wikipedia/en/5/5b/Greedo.jpg",
      "Hutt": "https://upload.wikimedia.org/wikipedia/en/5/5b/Greedo.jpg",
      "Yoda's species": "https://upload.wikimedia.org/wikipedia/en/5/5b/Greedo.jpg",
      "Trandoshan": "https://upload.wikimedia.org/wikipedia/en/5/5b/Greedo.jpg",
      "Mon Calamari": "https://upload.wikimedia.org/wikipedia/en/5/5b/Greedo.jpg",
      "Ewok": "https://upload.wikimedia.org/wikipedia/en/5/5b/Greedo.jpg",
      "Sullustan": "https://upload.wikimedia.org/wikipedia/en/5/5b/Greedo.jpg",
    },
    films: {
      "A New Hope": "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
      "The Empire Strikes Back": "https://image.tmdb.org/t/p/w500/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg",
      "Return of the Jedi": "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2014/07/357496-cine-ciencia-ficcion-critica-star-wars-retorno-jedi.png?tf=3840x",
      "The Phantom Menace": "https://upload.wikimedia.org/wikipedia/en/5/5b/Greedo.jpg",
      "Attack of the Clones": "https://upload.wikimedia.org/wikipedia/en/5/5b/Greedo.jpg",
      "Revenge of the Sith": "https://upload.wikimedia.org/wikipedia/en/5/5b/Greedo.jpg",
    }
  };
  return imagenes[categoria]?.[nombre] || "";
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
  width: 600px;
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
  width: 200px;
  height: 450px;
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
  text-align: left;
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
