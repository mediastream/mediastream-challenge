import './assets/styles.css'
import { React, useState } from 'react'
import { movies } from '../../../core/data/movies'
import { discountRules } from '../../../core/data/discounts'

export default function Exercise01 () {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])
  const ACTIONS = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT'
  }

  const getTotal = () => {
    const moviesInCartIds = cart.map(movie => movie.id)
    const discountRule = discountRules.find(rule => {
      return rule.movieIds.length === moviesInCartIds.length && rule.movieIds.every(id => moviesInCartIds.includes(id))
    })

    const totalWithoutDiscount = cart.reduce((acc, movie) => acc + movie.price * movie.quantity, 0)
    const total = discountRule ? totalWithoutDiscount * (1 - discountRule.discountPercentage) : totalWithoutDiscount

    return total
  }

  const getMovieIndexFromCart = (id) => {
    return cart.findIndex(movieInCart => movieInCart.id === id)
  }

  const addMovieToCart = (movie) => {
    const cartToSet = [...cart]
    const existingMovieIndex = getMovieIndexFromCart(movie.id)

    if (existingMovieIndex >= 0) {
      cartToSet[existingMovieIndex].quantity++
    } else {
      cartToSet.push({
        ...movie,
        quantity: 1
      })
    }
    setCart(cartToSet)
  }

  const updateQuantity = (movieId, action) => {
    const cartToUpdate = [...cart]
    const movieIndexToUpdate = getMovieIndexFromCart(movieId)

    switch (action) {
      case ACTIONS.INCREMENT:
        cartToUpdate[movieIndexToUpdate].quantity++
        break
      case ACTIONS.DECREMENT:
        cartToUpdate[movieIndexToUpdate].quantity > 1
          ? cartToUpdate[movieIndexToUpdate].quantity--
          : cartToUpdate.splice(movieIndexToUpdate, 1)
        break
      default:
        break
    }
    setCart(cartToUpdate)
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(movie => (
            <li className="movies__list-card" key={movie.id}>
              <ul>
                <li>
                  ID: {movie.id}
                </li>
                <li>
                  Name: {movie.name}
                </li>
                <li>
                  Price: ${movie.price}
                </li>
              </ul>
              <button onClick={() => addMovieToCart(movie)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(cartMovie => (
            <li className="movies__cart-card" key={cartMovie.id}>
              <ul>
                <li>
                  ID: {cartMovie.id}
                </li>
                <li>
                  Name: {cartMovie.name}
                </li>
                <li>
                  Price: ${cartMovie.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => updateQuantity(cartMovie.id, ACTIONS.DECREMENT)}>
                  -
                </button>
                <span>
                  {cartMovie.quantity}
                </span>
                <button onClick={() => updateQuantity(cartMovie.id, ACTIONS.INCREMENT)}>
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
    </section>
  )
}
