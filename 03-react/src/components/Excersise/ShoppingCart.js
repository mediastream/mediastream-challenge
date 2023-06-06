import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import MovieInCart from './MovieInCart'

export default function ShoppingCart () {
  const { cart, getTotal } = useContext(CartContext)
  return (
    <div className="movies__cart">
      <ul>
        {cart.map((movieInCart, index) => (
          <MovieInCart
            key={index}
            id={movieInCart.id}
            name={movieInCart.name}
            price={movieInCart.price}
            quantity={movieInCart.quantity}
          />
        ))}
      </ul>
      <div className="movies__cart-total">
        <p>Total: ${getTotal()}</p>
      </div>
    </div>
  )
}
