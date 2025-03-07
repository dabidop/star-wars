<template>
  <nav class="sidebar">
    <h2>Explorar</h2>
    <ul>
      <li>
        <router-link to="/">
          <i class="fas fa-home"></i> INICIO
        </router-link>
      </li>
      <li v-for="categoria in categorias" :key="categoria.endpoint">
        <router-link :to="`/explore/${categoria.endpoint}`">
          <img :src="categoria.icono" class="icono" alt="Icono" />
          {{ categoria.nombre }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const categorias = [
  { nombre: "Personajes", endpoint: "people", icono: "/icons/darth.png" },
  { nombre: "Naves", endpoint: "starships", icono: "/icons/nave.png" },
  { nombre: "Vehículos", endpoint: "vehicles", icono: "/icons/vehiculos.png" },
  { nombre: "Planetas", endpoint: "planets", icono: "/icons/planetas.png" },
  { nombre: "Especies", endpoint: "species", icono: "/icons/yoda.png" }
];
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  color: white;
  padding-left: 20px;
}

/* Título de Sidebar */
.sidebar h2 {
  font-size: 1.7em;
  text-align: center;
  font-family: "StarJedi";
  color: yellow;
  text-shadow: 2px 2px 10px rgba(255, 255, 0, 0.8);
}

/* Lista de Categorías */
.sidebar ul {
  list-style: none;
  padding: 0;
}

/* Elementos del Sidebar */
.sidebar li {
  margin: 15px 0;
  font-size: 18px;
  font-family: "Orbitron", sans-serif;
  display: flex;
  align-items: center;
  width: 100%;
}

/* Enlaces */
.sidebar a {
  color: white;
  text-decoration: none;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.3s ease, transform 0.2s ease;
  border-radius: 8px;
}

/* Hover con efecto */
.sidebar a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
  width: 100%;
}

/* Íconos */
.icono {
  width: 30px;
  height: 30px;
  object-fit: contain;
}
</style>
