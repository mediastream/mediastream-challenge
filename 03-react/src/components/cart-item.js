import React from 'react'
import PropTypes from 'prop-types'

CartItem.propTypes = {
  cart: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }),
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func
}

function CartItem ({ cart, onIncrement, onDecrement }) {
  return (
    <li className="movies__cart-card">
      <ul>
        <li>
          ID: {cart.id}
        </li>
        <li>
          Name: {cart.name}
        </li>
        <li>
          Price: ${cart.price}
        </li>
      </ul>
      <div className="movies__cart-card-quantity">
        <button onClick={() => onDecrement(cart)}>
          -
        </button>
        <span>
          {cart.quantity}
        </span>
        <button onClick={() => onIncrement(cart)}>
          +
        </button>
      </div>
    </li>
  )
}

export default CartItem
