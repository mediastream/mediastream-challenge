import './assets/styles.css'
import React, { useContext } from 'react'
import { CartContext } from './contexts/ShoppingCartContext'
import { movies } from './utils/movies.js'
import Movie from './components/Movie'

export default function Exercise01 () {
  const [cart, setCart, total] = useContext(CartContext)

  function addMovie (item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) { increaseQuantity(existingItem); return }
    item.quantity = 1
    setCart([...cart, item])
  }

  function increaseQuantity (item) {
    item.quantity += 1
    setCart([...cart])
  }

  function decreaseQuantity (item) {
    item.quantity -= 1
    if (item.quantity === 0) { setCart(cart.filter(cartMovie => cartMovie.id !== item.id)); return }
    setCart([...cart])
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie, key) => (
            <Movie
              className="movies__list-card"
              key={key}
              movie={movie}
              add={addMovie} />
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((movie, key) => (
            <Movie
              className="movies__cart-card"
              key={key}
              movie={movie}
              onCart={true}
              increase={increaseQuantity}
              decrease={decreaseQuantity} />
          ))}
        </ul>
        <div className="movies__cart-total">
          {total === 0 ? <><h1>No elements in the cart</h1> <br /></> : <></>}
          <p>Total: ${total}</p>
        </div>
      </div>
    </section>
  )
}
