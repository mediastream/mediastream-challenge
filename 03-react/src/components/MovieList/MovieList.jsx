/* eslint-disable react/prop-types */
import React from 'react'

const movies = [
  {
    id: 1,
    gender: 'Terror',
    name: 'Star Wars',
    price: 20
  },
  {
    id: 2,
    gender: 'Action',
    name: 'Minions',
    price: 25
  },
  {
    id: 3,
    gender: 'Horror',
    name: 'Fast and Furious',
    price: 10
  },
  {
    id: 4,
    gender: 'Adventure',
    name: 'The Lord of the Rings',
    price: 5
  },
  {
    id: 5,
    gender: 'Comedy',
    name: 'Bridesmaids',
    price: 15
  },
  {
    id: 6,
    gender: 'Drama',
    name: 'The Shawshank Redemption',
    price: 7
  },
  {
    id: 7,
    gender: 'Science Fiction',
    name: 'The Matrix',
    price: 12
  },
  {
    id: 8,
    gender: 'Romance',
    name: 'The Notebook',
    price: 10
  },
  {
    id: 9,
    gender: 'Action',
    name: 'Die Hard',
    price: 8
  },
  {
    id: 10,
    gender: 'Comedy',
    name: 'The Hangover',
    price: 10
  }
]

function MovieList ({ handleAddCart }) {
  const movieCards = movies.map((movie) => (
    <li key={movie.id} className="movies__list-card">
      <ul>
        <li>Genero: {movie.gender}</li>
        <li>Nombre: {movie.name}</li>
        <li>Precio: ${movie.price}</li>
      </ul>
      <button onClick={() => handleAddCart(movie)}>Add to cart</button>
    </li>
  ))

  if (movies.length === 0) {
    return <p>No hay elementos disponibles.</p>
  }

  return (
    <div className="movies__list">
      <ul>{movieCards}</ul>
    </div>
  )
}

export default MovieList
