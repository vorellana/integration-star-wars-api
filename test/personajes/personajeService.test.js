// Mocks necesarios para los repositorios y mappers
const personajeService = require('../../src/services/personajeService')
const personajeRepository = require('../../src/repositories/personajeRepository')
const peliculaRepository = require('../../src/repositories/peliculaRepository')
const { personajeInputServiceData } = require('./data/personajeInputData')
const { personajeOutputServiceData } = require('./data/personajeOutputData')
jest.mock('../../src/repositories/personajeRepository')
jest.mock('../../src/repositories/peliculaRepository')

const { mapPersonajeToSpanish, mapPeliculaToSpanish } = require('../../src/utils/mapper')
jest.mock('../../src/utils/mapper')

describe('findPersonajes Service', () => {
  it('debe devolver Personajes combinados de API y BD, incluyendo detalles de películas', async () => {
    // Simula una respuesta de la API con personajes que tienen películas
    personajeRepository.findPersonajesAPI.mockResolvedValue({
      success: true,
      data: personajeOutputServiceData.personajes1
    })

    // Simula una respuesta de la BD con personajes, algunos con películas
    personajeRepository.findPersonajes.mockResolvedValue({
      success: true,
      data: personajeOutputServiceData.personajes2
    })

    // Simula las respuestas para los detalles de películas basados en URLs
    peliculaRepository.getPeliculasByUrls.mockImplementation((urls) => {
      const dataMap = {
        'urlPelicula1': { titulo: 'Película 1' },
        'urlPelicula2': { titulo: 'Película 2' },
        'urlPelicula3': { titulo: 'Película 3' },
      }
      const data = urls.map(url => dataMap[url]).filter(Boolean)
      return Promise.resolve({ success: true, data })
    })

    const result = await personajeService.findPersonajes('buscar')

    expect(result.success).toBe(true)
    expect(result.data.length).toBe(2) // Asegurando que combinamos API y BD
    // Verifica que el resultado incluya detalles de películas
    expect(result.data[0].peliculas.length).toBeGreaterThan(0)
    expect(result.data[1].peliculas.length).toBeGreaterThan(0)
  })
})

describe('createPersonaje Service', () => {
  it('debe crear un Personaje exitosamente', async () => {
    const personajeData = personajeInputServiceData.personaje1

    personajeRepository.createPersonaje.mockResolvedValue({
      success: true,
      data: { id: personajeOutputServiceData.response1.id, ...personajeData }
    })

    const result = await personajeService.createPersonaje(personajeData)

    expect(result.success).toBe(true)
    expect(result.data).toHaveProperty('id')
    expect(result.data.nombre).toEqual(personajeData.nombre)
  })

  it('debe crear un Personaje erróneamente', async () => {
    const personajeData = { nombre: 'Personaje Problemático', peliculas: [] }

    personajeRepository.createPersonaje.mockResolvedValue({
      success: false,
      errorMessage: personajeOutputServiceData.response2.errorMessage
    })

    const result = await personajeService.createPersonaje(personajeData)

    expect(result.success).toBe(false)
    expect(result.errorMessage).toContain(personajeOutputServiceData.response2.errorMessage)
  })

  // Aquí puedes añadir más pruebas para cubrir casos adicionales
})

// Configuración de mocks adicionales para peliculaRepository y mappers si es necesario
peliculaRepository.getPeliculasByUrls.mockResolvedValue({
  success: true,
  data: [{ titulo: 'Película1' }, { titulo: 'Película2' }]
})

mapPersonajeToSpanish.mockImplementation((personaje) => ({
  ...personaje,
  nombre: `Nombre en español de ${personaje.nombre}`,
}))

mapPeliculaToSpanish.mockImplementation((pelicula) => ({
  ...pelicula,
  titulo: `Título en español de ${pelicula.titulo}`,
}))
