import React from 'react'
import PropTypes from 'prop-types'
import MovieCard from './MovieCard'

export default function MovieList ({ movies }) {
  return (
    <div className="movies__list">
      <ul>
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            id={movie.id}
            name={movie.name}
            price={movie.price}
          />
        ))}
      </ul>
    </div>
  )
}

MovieList.propTypes = {
  movies: PropTypes.array
}
