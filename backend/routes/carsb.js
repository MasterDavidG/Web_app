// backend/routes/carsb.js

const express = require('express')
const router = express.Router()
const Car = require('../models/car')

router.get('/', async (req, res) => {
  try {
    const cars = await Car.findAll()
    res.json(cars)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
router.post('/cars', async (req, res) => {
  try {
    const { name, speed, img } = req.body
    const newCar = await Car.create({ name, speed, img })
    res.status(201).json(newCar)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
