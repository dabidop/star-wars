<template>
    <nav class="sidebar">
      <h2>Explorar</h2>
      <ul>
        <li>
          <router-link to="/">🏠 Inicio</router-link>
        </li>
        <li v-for="categoria in categorias" :key="categoria.endpoint">
          <router-link :to="`/explore/${categoria.endpoint}`">
            {{ categoria.nombre }}
          </router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  const categorias = [
    { nombre: "Personajes", endpoint: "people" },
    { nombre: "Naves", endpoint: "starships" },
    { nombre: "Vehículos", endpoint: "vehicles" },
    { nombre: "Planetas", endpoint: "planets" },
    { nombre: "Especies", endpoint: "species" }
  ];
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    background: rgba(0, 0, 0, 0.8);
    padding: 15px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    color: white;
  }
  
  .sidebar h2 {
    font-size: 1.5em;
    text-align: center;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    margin: 10px 0;
  }
  
  .sidebar a {
    color: white;
    text-decoration: none;
    padding: 10px;
    display: block;
    transition: background 0.3s ease;
  }
  
  .sidebar a:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  </style>
  