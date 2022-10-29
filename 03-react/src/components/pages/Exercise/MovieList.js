import React from 'react'
import { PropTypes } from 'prop-types'

export default function MovieList (props) {
  return (
    <div className="movies__list">
      <ul>
        {props.movies.map((o) => (
          <li className="movies__list-card" key={o.id}>
            <ul>
              <p>ID: {o.id}</p>
              <p>Name: {o.name}</p>
              <p>Price: ${o.price}</p>
            </ul>
            <button onClick={() => props.addMovieToCart(o)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

MovieList.propTypes = {
  addMovieToCart: PropTypes.func,
  movies: PropTypes.Array
}
