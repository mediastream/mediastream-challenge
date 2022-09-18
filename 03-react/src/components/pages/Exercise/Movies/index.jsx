import React from 'react'
import PropTypes from 'prop-types'
const Movies = ({ movies, addToCart }) => {
  return (
    <div className="movies__list">
    <ul>
      {movies.map(movie => (
        <li className="movies__list-card" key={movie.id}>
          <ul>
            <li>
              ID: {movie.id}
            </li>
            <li>
              Name: {movie.name}
            </li>
            <li>
              Price: ${movie.price}
            </li>
          </ul>
          <button onClick={() => addToCart(movie)}>
            Add to cart
          </button>
        </li>
      ))}
    </ul>
  </div>
  )
}
Movies.propTypes = {
  movies: PropTypes.array,
  addToCart: PropTypes.func
}
export default Movies
