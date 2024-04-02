// const { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb')
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const getDynamoDbClient = require('../utils/dbClient')

class PersonajeRepository {

    constructor() {
        const dynamoDbClient = getDynamoDbClient()
        this.client = DynamoDBDocumentClient.from(dynamoDbClient)
        this.tableName = process.env.PERSONAJES_TABLE_NAME || 'personajesTable-dev'
    }

    async findPersonajesAPI(buscar) {

        try {
            const path = buscar ? '/people?search=' + buscar : '/people'
            const response = await axios.get(process.env.SWAPI_URL + path)
            return { success: true, data: response.data.results }
        } catch (error) {
            return { success: false, errorMessage: 'Error al obtener Personajes por API: ' + error.message }
        }

    }

    async findPersonajes(buscar) {

        try {
            const params = {
                TableName: this.tableName
            }

            if (buscar) {
                params.FilterExpression = 'contains(nombre, :valorNombre)'
                params.ExpressionAttributeValues = { ':valorNombre': buscar }                
            }            

            const scanResult = await this.client.send(new ScanCommand(params))

            return { success: true, data: scanResult.Items }
        } catch (error) {
            return { success: false, errorMessage: 'Error al obtener Personajes por BD: ' + error.message }
        }
    }    

    async createPersonaje(personajeData) {
        if (!personajeData.nombre) {
            return { success: false, errorMessage: 'El nombre del personaje es requerido' }
        }

        const params = {
            TableName: this.tableName,
            Item: personajeData
        }
        params.Item.id = uuidv4()
        console.log('params99', params)
        try {
            await this.client.send(new PutCommand(params))
            return { success: true, data: personajeData }
        } catch (error) {
            console.log('error99', error)
            return { success: false, errorMessage: 'Error al crear al personaje por BD: ' + error.message }
        }
    }

}

module.exports = new PersonajeRepository()
