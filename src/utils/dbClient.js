
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')

const clientHolder = {
  dynamoDbClient: null,
}

const options = process.env.IS_OFFLINE ? {
  region: 'localhost',
  endpoint: 'http://0.0.0.0:8000',
  credentials: {
    accessKeyId: 'MockAccessKeyId',
    secretAccessKey: 'MockSecretAccessKey',
  },
} : {}

const getDynamoDbClient = () => {
  if (!clientHolder.dynamoDbClient) {
    clientHolder.dynamoDbClient = new DynamoDBClient(options)
  }

  return clientHolder.dynamoDbClient
}

module.exports = getDynamoDbClient
