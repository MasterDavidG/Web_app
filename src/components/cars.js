// frontend/src/components/cars.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Car } from './car'

const Cars = () => {
  const [cars, setCars] = useState([])
  const [newCar, setNewCar] = useState({ name: '', speed: 0, img: '' })

  useEffect(() => {
    axios
      .get('http://localhost:3001/carsb')
      .then((response) => setCars(response.data))
      .catch((error) => console.error('Error fetching cars:', error))
  }, [])
  const handleInput = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value })
  }

  const handleForm = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:3001/carsb', newCar)
      .then((response) => setCars([...cars, response.data]))
      .catch((error) => console.error('Error adding new car:', error))

    setNewCar({ name: '', speed: 0, img: '' })
  }

  return (
    <>
      <h1>The Best Cars</h1>
      <section className="carList">
        {cars.map((car, index) => (
          <Car key={index} car={car} />
        ))}
      </section>
      <section>
        <form onSubmit={handleForm}>
          <input
            type="text"
            name="name"
            placeholder="Car Name"
            onChange={handleInput}
            value={newCar.name}
          />
          <input
            type="number"
            name="speed"
            placeholder="Speed"
            onChange={handleInput}
            value={newCar.speed}
          />
          <input
            type="text"
            name="img"
            placeholder="Image URL"
            onChange={handleInput}
            value={newCar.img}
          />
          <button type="submit">Add Car</button>
        </form>
      </section>
    </>
  )
}

export default Cars
