<template>
  <div class="app">
    <div class="video-container">
      <video autoplay loop muted playsinline class="video-fondo">
        <source src="./assets/fondito.mp4" type="video/mp4">
        Tu navegador no soporta videos en HTML5.
      </video>
    </div>
    <div class="contenido">
      <router-view />
    </div>S
  </div>
</template>

<style>
/* Asegurar que el body permite desplazarse */
html, body {
  height: auto;
  margin: 0;
  padding: 0;
  overflow-y: auto; /* Solo aparece scroll si es necesario */
}

/* Evitar que el video bloquee interacciones */
.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

/* Video de fondo */
.video-fondo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

/* Contenido sobre el video */
/* Ajustamos la altura del contenedor dinámicamente */
.contenido {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 20px;
  min-height: 100vh; /* Se asegura de llenar la pantalla si el contenido es poco */
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>