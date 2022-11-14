import React from 'react'
import { useCartContext } from '../context/CartContext'

const MoviesCart = () => {
  const { movies: cartMovies, decreaseMovieQuantity, increaseMovieQuantity, getTotal } = useCartContext()
  return (
    <div className="movies__cart">
        <ul>
          {cartMovies.map(cartItem => (
            <li className="movies__cart-card" key={cartItem.id}>
              <ul>
                <li>
                  ID: {cartItem.id}
                </li>
                <li>
                  Name: {cartItem.name}
                </li>
                <li>
                  Price: ${cartItem.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decreaseMovieQuantity(cartItem.id)}>
                  -
                </button>
                <span>
                  {cartItem.quantity}
                </span>
                <button onClick={() => increaseMovieQuantity(cartItem)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
  )
}

export default MoviesCart
