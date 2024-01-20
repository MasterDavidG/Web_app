// app.js
const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { sequelize, testDatabaseConnection } = require('./config/database')
const carsRoutes = require('./routes/carsb')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use('/cars', carsRoutes)

// Проверка за връзка с базата данни
testDatabaseConnection()
  .then(() => {
    // Синхронизиране на базата данни
    return sequelize.sync()
  })
  .then(() => {
    // Стартиране на сървъра
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error)
  })
