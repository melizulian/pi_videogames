const axios = require('axios')
const { Genre } = require('../db');
const URL = "https://api.rawg.io/api/genres"
require('dotenv').config();
const API_KEY = process.env.API_KEY

const getGenres = async (req, res) => {
    try {
        // Obtener datos de la API
        const { data } = await axios(`${URL}?key=${API_KEY}`);
        const apiGenres = data.results;

        // Procesar los géneros y guardarlos en la base de datos
        for (const apiGenre of apiGenres) {
            const { name } = apiGenre;

            // Verificar si el género ya existe en la base de datos
            const existingGenre = await Genre.findOne({ where: { name } });

            // Si no existe, crearlo en la base de datos
            if (!existingGenre) {
                await Genre.create({ name });
            }
        }

        // Obtener todos los géneros desde la base de datos después de la actualización
        const allGenres = await Genre.findAll();

        // Enviar la lista actualizada de géneros como respuesta
        res.json(allGenres);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = getGenres;