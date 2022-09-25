import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CartContext } from '../context/CartContext'

const Cart = ({ id, name, price, quantity }) => {
  const [cartQuantity, setCartQuantity] = useState(quantity)
  const { removeFromCart, updateQuantity } = useContext(CartContext)
  useEffect(() => {
    updateQuantity(id, cartQuantity)
    if (cartQuantity <= 0) removeFromCart(id)
  }, [cartQuantity])
  return (
     <li className="movies__cart-card">
    <ul>
      <li>
        ID: {id}
      </li>
      <li>
        Name: {name}
      </li>
      <li>
        Price: ${price}
      </li>
    </ul>
    <div className="movies__cart-card-quantity">
      <button onClick={() => setCartQuantity(cartQuantity - 1)}>
        -
      </button>
      <span>
        {cartQuantity}
      </span>
      <button onClick={() => setCartQuantity(cartQuantity + 1)}>
        +
      </button>
    </div>
  </li>
  )
}

Cart.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number
}

export default Cart
