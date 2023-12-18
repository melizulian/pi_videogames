const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame } = require('../db');
const URL = "https://api.rawg.io/api/games";
require('dotenv').config();
const API_KEY = process.env.API_KEY;

const getVideogameByName = async(req,res) => {
    try {
        const { name } = req.query;
    
        if (!name) {
          return res.status(400).json({ message: 'Debe proporcionar un nombre de videojuego para buscar.' });
        }
    
        // Buscar videojuegos en la base de datos
        const dbVideogames = await Videogame.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`, // Case-insensitive search
            },
          },
          limit: 15,
        });
    
        // Buscar videojuegos en la API de Rawg Games
        const apiResponse = await axios.get(`${URL}?search=${name}&key=${API_KEY}`);
        const apiVideogames = apiResponse.data.results;
    
        // Combinar resultados de la base de datos y la API
        const combinedResults = [...dbVideogames, ...apiVideogames];
    
        // Verificar si se encontraron videojuegos
        if (combinedResults.length === 0) {
          return res.status(404).json({ message: 'No se encontraron videojuegos con el nombre proporcionado.' });
        }
    
        return res.json(combinedResults);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al buscar videojuegos por nombre.' });
      }
}

module.exports = getVideogameByName