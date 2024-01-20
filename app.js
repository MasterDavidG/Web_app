// app.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./config/database')
const carsRoutes = require('./routes/cars')

const app = express()
const PORT = process.env.PORT || 3001 // React работи на порт 3000, затова използваме 3001 за бекенда

app.use(cors())
app.use(bodyParser.json())

app.use('/cars', carsRoutes)

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
})
