import React from 'react'
import PropTypes from 'prop-types'

MovieItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number
  }),
  onAdd: PropTypes.func
}

function MovieItem ({ movie, onAdd }) {
  return (
    <li className="movies__list-card">
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
      <button onClick={() => onAdd(movie)}>
        Add to cart
      </button>
    </li>
  )
}

export default MovieItem
