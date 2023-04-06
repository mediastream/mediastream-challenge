import React from 'react'
import PropTypes from 'prop-types'

const MovieList = ({ movies, handleAddToCart }) => {
  return (
  <div className="movies__list">
    <ul>
      {movies.map(o => (
        <div key={o.id} className="movies__list-card">
          <ul>
            <li>
              ID: {o.id}
            </li>
            <li>
              Name: {o.name}
            </li>
            <li>
              Price: ${o.price}
            </li>
          </ul>
          <button onClick={() => handleAddToCart(o)}>
            Add to cart
          </button>
        </div>
      ))}
    </ul>
  </div>)
}

MovieList.propTypes = {
  movies: PropTypes.array,
  handleAddToCart: PropTypes.func
}

export default MovieList
