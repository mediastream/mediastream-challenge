/* eslint-disable react/prop-types */
import React from 'react'

export default function Movie ({ className, movie, onCart = false, add, increase, decrease }) {
  return (
    <div className={`movie-card ${className}`}>
      <h3>ID: {movie.id}</h3>
      <h3>Name: {movie.name}</h3>
      <h3>Price: ${movie.price}</h3>
      {onCart ? <><button onClick={() => decrease(movie)}>-</button><span>{movie.quantity}</span><button onClick={() => increase(movie)}>+</button></> : <button onClick={() => add(movie)}>Add to cart</button>}
    </div>
  )
}
