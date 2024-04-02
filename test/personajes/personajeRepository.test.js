const { personajeInputRepositoryData } = require('./data/personajeInputData')
const { personajeOutputRepositoryData: mockPersonajeOutputRepositoryData } = require('./data/personajeOutputData')
const axios = require('axios')

jest.mock('@aws-sdk/lib-dynamodb', () => {
  const mockPutCommand = jest.fn()
  const mockScanCommand = jest.fn()

  // Esta función simula el comportamiento del método 'send'
  const mockSend = jest.fn(async (command) => {
    if (command instanceof mockPutCommand) {
      return {} // Simula una respuesta exitosa para PutCommand
    } else if (command instanceof mockScanCommand) {
      return { Items: mockPersonajeOutputRepositoryData.personajes1 } // Simula una respuesta exitosa para ScanCommand
    }
    throw new Error('Comando no reconocido o error simulado')
  })

  return {
    DynamoDBDocumentClient: {
      from: jest.fn(() => {
        return { send: mockSend }
      }),
    },
    PutCommand: mockPutCommand,
    ScanCommand: mockScanCommand,
  }
})

const personajeRepository = require('../../src/repositories/personajeRepository')

describe('findPersonajesAPI Repository', () => {
  axios.get = jest.fn().mockResolvedValue({
    data: {
      results: mockPersonajeOutputRepositoryData.personajes2
    }
  })

  it('debe obtener Personajes de la API exitosamente', async () => {
    // Simula una respuesta exitosa de axios
    axios.get.mockResolvedValue({
      data: {
        results: mockPersonajeOutputRepositoryData.personajes2
      }
    })

    const buscar = 'Luke'
    const result = await personajeRepository.findPersonajesAPI(buscar)

    expect(result.success).toBe(true)
    expect(result.data.length).toBe(2)
  })
})

describe('findPersonajes Repository', () => {
  it('debe obtener Personajes de DynamoDB exitosamente', async () => {
    const buscar = 'Luke'
    const result = await personajeRepository.findPersonajes(buscar)
    expect(result.success).toBe(true)
  })
})

describe('createPersonaje Repository', () => {
  it('debe crear un Personaje exitosamente en DynamoDB', async () => {
    const personajeData = personajeInputRepositoryData.personaje1
    const result = await personajeRepository.createPersonaje(personajeData)
    expect(result.success).toBe(true)
  })

  it('debe crear un Personaje erróneamente en DynamoDB', async () => {
    const personajeData = personajeInputRepositoryData.personaje2
    const result = await personajeRepository.createPersonaje(personajeData)
    expect(result.success).toBe(false)
  })

})
