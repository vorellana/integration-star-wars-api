// Importaciones necesarias
const request = require('supertest')
const express = require('express')
const personajesController = require('../src/controllers/personajesController')

const routes = require('../src/routes/routes') // Asegúrate de que la ruta de importación sea correcta

jest.mock('../src/controllers/personajesController', () => ({
  findPersonajes: jest.fn((req, res) => res.status(200).json({ message: "Personajes encontrados" })),
  createPersonaje: jest.fn((req, res) => res.status(201).json({ message: "Personaje creado" })),
}))

describe('Routes', () => {
  let app

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use(routes)
  })

  it('debe encontrar personajes', async () => {
    const res = await request(app).get('/personajes')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ message: "Personajes encontrados" })
    expect(personajesController.findPersonajes).toHaveBeenCalled()
  })

  it('debe crear un personaje', async () => {
    const personajeData = { nombre: 'Nuevo Personaje', detalles: 'Detalles del personaje' }
    const res = await request(app)
      .post('/personajes')
      .send(personajeData)
    expect(res.statusCode).toEqual(201)
  })

})
