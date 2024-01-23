const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame } = require('../db');
const URL = "https://api.rawg.io/api/games";
require('dotenv').config();
const API_KEY = process.env.API_KEY;


const getVideogameByName = async(req,res) => {
    try {
        const { name } = req.params;
        console.log('Nombre recibido:', name); 

        if (!name) {
          return res.status(400).json({ message: 'Debe proporcionar un nombre de videojuego para buscar.' });
        }

        const decodedName = decodeURIComponent(name);
    
        // Buscar videojuegos en la base de datos
        const dbVideogames = await Videogame.findAll({
          where: {
            name: {
              [Op.iLike]: `%${decodedName}%`, // Buscar cualquier nombre que contenga `decodedName`
            },
          },
          limit: 15,
        });

    
        // Buscar videojuegos en la API de Rawg Games
        const apiResponse = await axios.get(`${URL}?search=${name}&key=${API_KEY}`);
        const apiVideogames = apiResponse.data.results;
    
        // Combinar resultados de la base de datos y la API
        const combinedResults = [...dbVideogames, ...apiVideogames];
        console.log('Resultados combinados:', combinedResults);
    
        // Verificar si se encontraron videojuegos
        if (combinedResults.length === 0) {
          return res.status(404).json({ message: 'No se encontraron videojuegos con el nombre proporcionado.' });
        }
    
        return res.json(combinedResults);
      } catch (error) {
        console.error('Error al buscar videojuegos por nombre:', error);
    return res.status(500).json({ error: 'Error al buscar videojuegos por nombre.' });
      }
}

// const getVideogameByName = async (req, res) => {
//   try {
//     const { name } = req.params;
//     console.log('Nombre recibido:', name);

//     if (!name) {
//       return res.status(400).json({ message: 'Debe proporcionar un nombre de videojuego para buscar.' });
//     }

//     const decodedName = decodeURIComponent(name);

//     // Buscar videojuegos en la base de datos
//     const [dbVideogames, created] = await Videogame.findOrCreate({
//       where: {
//         name: {
//           [Op.iLike]: `%${decodedName}%`, // Buscar cualquier nombre que contenga `decodedName`
//         },
//       },
//       limit: 15,
//     });

//     // Si el videojuego ya existe en la base de datos, devolvemos los resultados existentes
//     if (!created) {
//       console.log('Videojuego encontrado en la base de datos:', dbVideogames);
//       return res.json([dbVideogames]);
//     }

//     // Buscar videojuegos en la API de Rawg Games
//     const apiResponse = await axios.get(`${URL}?search=${name}&key=${API_KEY}`);
//     const apiVideogames = apiResponse.data.results;

//     // Mapear los resultados de la API
//     const mappedApiVideogames = apiVideogames.map((game) => ({
      
//       id: game.id,
//       name: game.name,
//       description: game.description,
//       platforms: game.parent_platforms, // Ajustar esto según la estructura real de la API
//       image_url: game.background_image, // Ajustar esto según la estructura real de la API
//       released: game.released ? new Date(game.released) : null, // Convertir a objeto de fecha si está presente
//       // Otros campos que necesites
//     }));

//     // Insertar videojuegos de la API en la base de datos
//     await Videogame.bulkCreate(mappedApiVideogames);

//     return res.json(mappedApiVideogames);
//   } catch (error) {
//     console.error('Error al buscar videojuegos por nombre:', error);
//     return res.status(500).json({ error: 'Error al buscar videojuegos por nombre.' });
//   }
  
// };

module.exports = getVideogameByName