const personajeRepository = require('../repositories/personajeRepository')
const peliculaRepository = require('../repositories/peliculaRepository')
const { mapPersonajeToSpanish, mapPeliculaToSpanish } = require('../utils/mapper')

class PersonajeService {

    async findPersonajes(buscar) {
        try {
            const result = await personajeRepository.findPersonajesAPI(buscar)
            const resultMap = await Promise.all(result.data.map(async (personaje) => {
                const films = await peliculaRepository.getPeliculasByUrls(personaje.films)
                const personajeMap = mapPersonajeToSpanish(personaje)
                personajeMap.peliculas = films.data.map( (pelicula) => mapPeliculaToSpanish(pelicula))
                return personajeMap
            }))

            const resultDb = await personajeRepository.findPersonajes(buscar)
            const resultMapDb = resultDb && resultDb.data ? await Promise.all(resultDb.data.map(async (personaje) => {
                if (personaje.peliculas) {
                    const films = await peliculaRepository.getPeliculasByUrls(personaje.peliculas);
                    // Asegurarse de que films.data existe y no es undefined.
                    personaje.peliculas = films.data ? films.data.map((pelicula) => mapPeliculaToSpanish(pelicula)) : [];
                }
                return personaje;
            })) : [];

            const finalResult = resultMap.concat(resultMapDb)

            return { success: true, data: finalResult }
        } catch (error) {
            return { success: false, errorMessage: 'Error en servicio de Obtener personaje: ' + error.message }
        }
    }

    async createPersonaje(personajeData) {
        const result = await personajeRepository.createPersonaje(personajeData)
        return result
    }

}

module.exports = new PersonajeService()
