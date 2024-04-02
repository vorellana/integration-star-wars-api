jest.mock('@aws-sdk/lib-dynamodb', () => {

    const mockPutCommand = jest.fn()
    const mockScanCommand = jest.fn()

    const mockSend = jest.fn(async (command) => {
        if (command instanceof mockPutCommand) {
            return {}
        } else if (command instanceof mockScanCommand) {
            return { Items: [{ nombre: 'Personaje1' }] } 
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
        ScanCommand: mockScanCommand
    }
})
  
const peliculaRepository = require('../../src/repositories/peliculaRepository')
  
describe('getPeliculasByUrls Repository', () => {
    it('debe obtener Peliculas de DynamoDB exitosamente', async () => {

        const urlList = ['https://swapi.py4e.com/api/films/1/', 'https://swapi.py4e.com/api/films/2/']
        const result = await peliculaRepository.getPeliculasByUrls(urlList)

        expect(result.success).toBe(true)

    })
})
