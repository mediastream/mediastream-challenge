import React from 'react'
import PropTypes from 'prop-types'
import MovieItem from './movie-item'

MoviesList.propTypes = {
  movies: PropTypes.array,
  onAddToCart: PropTypes.func
}

function MoviesList ({ movies, onAddToCart }) {
  return (
    <div className="movies__list">
      <ul>
        {movies.map(movie => (
          <MovieItem movie={movie} key={movie.id} onAdd={onAddToCart}/>
        ))}
      </ul>
    </div>
  )
}

export default MoviesList
