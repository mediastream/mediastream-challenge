import './assets/styles.css'
import React, { useContext } from 'react'
import Cart from '../../components/Cart'
import Movie from '../../components/Movie'
import { CartContext } from '../../context/CartContext'

export default function Exercise01 () {
  const { cart, movies, totalCart } = useContext(CartContext)

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              name={movie.name}
              price={movie.price}
            />
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((cartData) => (
            <Cart
              key={cartData.id}
              id={cartData.id}
              name={cartData.name}
              price={cartData.price}
              quantity={cartData.quantity}
            />
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${totalCart}</p>
        </div>
      </div>
    </section>
  )
}
