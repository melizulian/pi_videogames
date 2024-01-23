const { Videogame } = require('../db');

const postVideogame = async (req, res) => {
  console.log(req.body)
  try {
    const { name, description, platforms, image_url, released, rating, genres } = req.body;

    // Verificar que se proporcionen los datos necesarios
    if (!name || !description || !platforms || !image_url || !released || !rating || !genres) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    // Crear el videojuego en la base de datos
    const newVideogame = await Videogame.create({
      name,
      description,
      platforms,
      image_url,
      released,
      rating,
    });

    // Asociar los géneros al videojuego
    await newVideogame.addGenres(genres);
    console.log('Videojuego creado exitosamente:', newVideogame);

    return res.status(201).json(newVideogame);
  } catch (error) {
    console.error('Error al crear el videojuego:', error);
    return res.status(500).json({ error: error.message });

  }
};

module.exports = postVideogame;