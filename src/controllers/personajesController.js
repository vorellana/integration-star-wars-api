const personajeService = require('../services/personajeService')
const { apiResponse } = require('../utils/apiResponse')
const { validatePersonaje } = require('./personajeValidation')
const getValidValueFromBuffer = require('../utils/transformations')

class PersonajesController {
    async findPersonajes(req, res) {
        try {
            const { buscar } = req.query
            const result = await personajeService.findPersonajes(buscar)
            if (!result.success) {
                return res.status(400).json(apiResponse(false, result.errorMessage))
            }
            res.status(200).json(apiResponse(true, 'Pesonajes obtenidos exitosamente', result.data))
        } catch (error) {
            res.status(500).json(apiResponse(false, 'Error en la obtencion de personajes: ' + error.message))
        }
    }

    async createPersonaje(req, res) {
        try {
            const personajeData = getValidValueFromBuffer(req.body)

            const { error } = validatePersonaje(personajeData)

            if (error) {
                return res.status(400).json(apiResponse(false, error.details[0].message))
            }
            const result = await personajeService.createPersonaje(personajeData)
    
            if (!result.success) {
                return res.status(400).json(apiResponse(false, result.errorMessage))
            }
            res.status(201).json(apiResponse(true, 'Personaje creado exitosamente', result.data))
        } catch (error) {
            res.status(500).json(apiResponse(false, 'Error en la solicitud de crear personaje: ' + error.message))
        }
    }    

}

module.exports = new PersonajesController()
