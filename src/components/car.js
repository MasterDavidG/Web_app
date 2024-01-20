export const Car = ({ car }) => {
  const { img, name, speed, getCar } = car
  const handleButton = () => {
    console.log(name)
  }
  return (
    <article className="car">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <h4>{speed} km/h</h4>
      <button
        style={{ margin: '0.2rem 0' }}
        onClick={handleButton}
        type="button"
      >
        Press
      </button>
    </article>
  )
}
