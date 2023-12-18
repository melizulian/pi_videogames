const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getGenres = require('../controllers/getGenres')
const getVideogames = require('../controllers/getVideogames')
const getVideogameById = require('../controllers/getVideogameById')
const postVideogame = require('../controllers/postVideogame')
const getVideogameByName = require('../controllers/getVideogameByName')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/genres', getGenres)
router.get('/videogames', getVideogames)
router.get('/videogames/:id', getVideogameById)
router.get('/videogames/name?="..."', getVideogameByName)
router.post('/videogames', postVideogame)


module.exports = router;
