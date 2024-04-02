const personajesController = require('../../src/controllers/personajesController')
const personajeService = require('../../src/services/personajeService')
const { personajeInputControllerData } = require('./data/personajeInputData')
const { personajeOutputControllerData } = require('./data/personajeOutputData')
jest.mock('../../src/services/personajeService')

describe('findPersonajes Controller', () => {
  it('debe devolver personajes exitosamente', async () => {
    const req = { query: { buscar: 'Luke' } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    personajeService.findPersonajes.mockResolvedValue({ success: true, data: [] })

    await personajesController.findPersonajes(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(expect.anything())
  })
})

describe('createPersonaje Controller', () => {
  // Test para la creación exitosa de un personaje
  it('debe crear un Personaje exitosamente', async () => {
    const req = {
      body: personajeInputControllerData.nombreRequest1
    }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    // Simula una respuesta exitosa del servicio
    personajeService.createPersonaje.mockResolvedValue({
      success: true,
      data: { id: personajeOutputControllerData.response1.id, ...req.body }
    })

    await personajesController.createPersonaje(req, res)

    // Verifica que el status HTTP sea 201 (Creado) y que se llame a json con un objeto que tiene una propiedad `success` verdadera.
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      message: personajeOutputControllerData.response2.message
    }))
  })

  it('debe crear un Personaje erróneamente', async () => {
    const req = {
      body: personajeInputControllerData.request1
    }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    personajeService.createPersonaje.mockResolvedValue({
      success: false,
      errorMessage: personajeOutputControllerData.response3.errorMessage
    })

    await personajesController.createPersonaje(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
  })

})
