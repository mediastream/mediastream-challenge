import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { CartContext } from '../../context/CartContext'

export default function MovieCard ({ id, name, price }) {
  const { addMovieToCard } = useContext(CartContext)
  return (
    <li className="movies__list-card">
      <ul>
        <li>ID: {id}</li>
        <li>Name: {name}</li>
        <li>Price: ${price}</li>
      </ul>
      <button onClick={() => addMovieToCard({ id, name, price })}>
        Add to cart
      </button>
    </li>
  )
}

MovieCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
