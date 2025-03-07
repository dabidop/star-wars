import axios from "axios";

const TMDB_API_KEY = "TU_API_KEY"; // Reemplázalo con tu API Key de TMDB

// Endpoint de imágenes de personajes en Akabab
const AKABAB_API_URL = "https://akabab.github.io/starwars-api/api/all.json";

// Función para obtener imágenes de personajes
export const getCharacterImages = async () => {
  try {
    const response = await axios.get(AKABAB_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener imágenes de personajes:", error);
    return [];
  }
};

// Función para obtener imágenes de películas desde TMDB
export const getMovieImage = async (movieTitle) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${movieTitle}`
    );
    return response.data.results.length > 0
      ? `https://image.tmdb.org/t/p/w500${response.data.results[0].poster_path}`
      : null;
  } catch (error) {
    console.error(`Error al obtener imagen de la película ${movieTitle}:`, error);
    return null;
  }
};

// Función para obtener imágenes de naves desde TMDB
export const getShipImage = async (shipName) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${shipName}`
    );
    return response.data.results.length > 0
      ? `https://image.tmdb.org/t/p/w500${response.data.results[0].poster_path}`
      : null;
  } catch (error) {
    console.error(`Error al obtener imagen de la nave ${shipName}:`, error);
    return null;
  }
};
