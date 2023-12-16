const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize');
const API_URL = "https://api.rawg.io/api/games";
require('dotenv').config();
const API_KEY = process.env.API_KEY;

const getVideogameById = async (req, res) => {
    const { id } = req.params;

    try {
        let videogame;

        // Verificar si el ID es de un videojuego de la base de datos
        if (id.includes('-')) {
            // Buscar en la base de datos por ID
            videogame = await Videogame.findOne({
                where: { id },
                include: [{ model: Genre, attributes: ['name'] }]
            });
        } else {
            // Buscar en la API por ID
            const { data } = await axios(`${API_URL}/${id}?key=${API_KEY}`);
            const apiVideogame = data;

            // Formatear datos según modelo de la base de datos
            videogame = {
                id: apiVideogame.id.toString(),
                name: apiVideogame.name,
                description: apiVideogame.description,
                // Otros campos que necesites
                genres: apiVideogame.genres.map(genre => ({ name: genre.name })),
            };
        }

        res.json(videogame);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = getVideogameById;