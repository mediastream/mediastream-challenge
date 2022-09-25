import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { CartContext } from '../context/CartContext'

const Movie = ({ id, name, price }) => {
  const { addToCart } = useContext(CartContext)
  return (
    <li className="movies__list-card">
    <ul>
      <li>ID: {id}</li>
      <li>Name: {name}</li>
      <li>Price: ${price}</li>
    </ul>
    <button onClick={() => addToCart(id)}>
      Add to cart
    </button>
  </li>
  )
}

Movie.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number
}

export default Movie
