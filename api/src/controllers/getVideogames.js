const axios = require('axios');
const { Videogame } = require('../db');
const URL = "https://api.rawg.io/api/games";
require('dotenv').config();
const API_KEY = process.env.API_KEY;

const getVideogames = async (req, res) => {
  try {
    // Obtener datos de la API
    const { data } = await axios(`${URL}?key=${API_KEY}`);
    const apiVideogames = data.results;

    // Procesar los videojuegos y guardarlos en la base de datos
    for (const apiVideogame of apiVideogames) {
      const {
        name,
        description,
        platforms,
        image_url,
        released,
        rating,
      } = apiVideogame;

      // Verificar si el videojuego ya existe en la base de datos
      const existingVideogame = await Videogame.findOne({ where: { name } });

      // Si no existe, crearlo en la base de datos
      if (!existingVideogame) {
        await Videogame.create({
          name,
          description,
          platforms: platforms.join(', '), // Convertir plataformas a una cadena
          image_url,
          released,
          rating,
        });
      }
    }

    // Obtener todos los videojuegos desde la base de datos después de la actualización
    const allVideogames = await Videogame.findAll();

    // Enviar la lista actualizada de videojuegos como respuesta
    res.json(allVideogames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getVideogames;