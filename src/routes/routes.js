const express = require('express')
const router = express.Router()
const personajesController = require('../controllers/personajesController')

router.get('/personajes', personajesController.findPersonajes)

router.post('/personajes', personajesController.createPersonaje)

module.exports = router
