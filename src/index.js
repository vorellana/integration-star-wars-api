const serverless = require('serverless-http')
const express = require('express')
const routes = require('./routes/routes')
const app = express()

app.use('/dev/api/v1', routes)

module.exports.handler = serverless(app)
