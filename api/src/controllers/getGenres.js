// const axios = require('axios')
// const { Genres } = require('../db');
// const URL = "https://api.rawg.io/api/genres"
// require('dotenv').config();
// const API_KEY = process.env.API_KEY

// const getGenres = async (req, res) => {
//     try {
//         // Obtener datos de la API
//         const { data } = await axios(`${URL}?key=${API_KEY}`);
//         const apiGenres = data.results;

//         // Procesar los géneros y guardarlos en la base de datos
//         for (const apiGenre of apiGenres) {
//             const { name } = apiGenre;

//             // Verificar si el género ya existe en la base de datos
//             const existingGenre = await Genres.findOne({ where: { name } });

//             // Si no existe, crearlo en la base de datos
//             if (!existingGenre) {
//                 await Genres.create({ name });
//             }
//         }

//         // Obtener todos los géneros desde la base de datos después de la actualización
//         const allGenres = await Genres.findAll();

//         // Enviar la lista actualizada de géneros como respuesta
//         res.json(allGenres);
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// }

// module.exports = getGenres;

const axios = require('axios')
const { Genre } = require('../db');
const URL = "https://api.rawg.io/api/genres"
require('dotenv').config();
const API_KEY = process.env.API_KEY

const getGenres = async (req, res) => {
    try {
        console.log("Iniciando la función getGenres...");

        // Obtener datos de la API
        console.log("Haciendo solicitud a la API de RAWG...");
        const { data } = await axios(`${URL}?key=${API_KEY}`);
        console.log("Respuesta recibida de la API de RAWG.");
        const apiGenres = data.results;

        // Procesar los géneros y guardarlos en la base de datos
        for (const apiGenre of apiGenres) {
            const { name } = apiGenre;

            // Verificar si el género ya existe en la base de datos
            console.log(`Verificando si el género ${name} ya existe en la base de datos...`);
            const existingGenre = await Genre.findOne({ where: { name } });

            // Si no existe, crearlo en la base de datos
            if (!existingGenre) {
                console.log(`El género ${name} no existe en la base de datos. Creándolo...`);
                await Genre.create({ name });
                console.log(`Género ${name} creado exitosamente.`);
            }
        }

        // Obtener todos los géneros desde la base de datos después de la actualización
        console.log("Obteniendo todos los géneros de la base de datos...");
        const allGenres = await Genre.findAll();
        console.log("Todos los géneros obtenidos exitosamente.");

        // Enviar la lista actualizada de géneros como respuesta
        console.log("Enviando respuesta...");
        res.json(allGenres);
        
    } catch (error) {
        console.error("Ha ocurrido un error:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = getGenres;