import React from 'react'
import PropTypes from 'prop-types'

const MovieList = ({ movies, handleAddToCart }) => (
  <div className="movies__list">
    <ul>
      {movies.map((movie) => (
        <div key={movie.id} className="movies__list-card">
          <ul>
            <li>ID: {movie.id}</li>
            <li>Name: {movie.name}</li>
            <li>Price: ${movie.price}</li>
          </ul>
          <button onClick={() => handleAddToCart(movie)}>
            Add to cart
          </button>
        </div>
      ))}
    </ul>
  </div>
)

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  handleAddToCart: PropTypes.func.isRequired
}

export default MovieList
