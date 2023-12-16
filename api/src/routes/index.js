const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getGenres = require('../controllers/getGenres')
const getVideogames = require('../controllers/getVideogames')
const getVideogameById = require('../controllers/getVideogameById')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/genre', getGenres)
router.get('/videogame', getVideogames)
router.get('/videogame/:id', getVideogameById)


module.exports = router;
