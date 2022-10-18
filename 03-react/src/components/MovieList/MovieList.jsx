/* eslint-disable react/prop-types */
import React from 'react'

const movies = [
  {
    id: 1,
    name: 'Star Wars',
    price: 20
  },
  {
    id: 2,
    name: 'Minions',
    price: 25
  },
  {
    id: 3,
    name: 'Fast and Furious',
    price: 10
  },
  {
    id: 4,
    name: 'The Lord of the Rings',
    price: 5
  }
]

const MovieList = ({ handleAddCart }) => {
  return (
    <div className="movies__list">
      <ul>
        {movies.map((o) => (
          <li key={o.id} className="movies__list-card">
            <ul>
              <li>ID: {o.id}</li>
              <li>Name: {o.name}</li>
              <li>Price: ${o.price}</li>
            </ul>
            <button
              onClick={() =>
                handleAddCart(movies.find((movie) => movie.id === o.id))
              }
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList
