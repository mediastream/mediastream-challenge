import React from 'react'
import { useCartContext } from '../context/CartContext'
import PropTypes from 'prop-types'

const MovieList = ({ movies }) => {
  const { increaseMovieQuantity } = useCartContext()
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
              <button onClick={() => increaseMovieQuantity(movie)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
  )
}

MovieList.propTypes = {
  movies: PropTypes.array
}

export default MovieList
