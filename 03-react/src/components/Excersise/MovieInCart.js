import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { CartContext } from '../../context/CartContext'

export default function MovieInCart ({ id, name, price, quantity }) {
  const { increment, decrement } = useContext(CartContext)
  return (
    <li className="movies__cart-card">
      <ul>
        <li>ID: {id}</li>
        <li>Name: {name}</li>
        <li>Price: ${price}</li>
      </ul>
      <div className="movies__cart-card-quantity">
        <button onClick={() => decrement({ id, name, price, quantity })}>-</button>
        <span>{quantity}</span>
        <button onClick={() => increment({ id, name, price, quantity })}>+</button>
      </div>
    </li>
  )
}

MovieInCart.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.number
}
