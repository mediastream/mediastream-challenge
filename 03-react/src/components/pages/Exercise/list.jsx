import React from 'react'
import PropTypes from 'prop-types'

export default function List ({ movies, handleAddToCart }) {
  function handleClick (movie) {
    handleAddToCart(movie)
  }

  return (
    <div className="movies__list">
      <ul>
        {movies.map(function (movie) {
          return (
            <div key={movie.id} className="movies__list-card">
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <button onClick={function () { handleClick(movie) }}>
                Add to cart
              </button>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

List.propTypes = {
  movies: PropTypes.array.isRequired,
  handleAddToCart: PropTypes.func.isRequired
}
