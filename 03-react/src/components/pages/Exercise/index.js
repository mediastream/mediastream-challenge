import './assets/styles.css'
import React, { useState } from 'react'

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    }
  ]

  const [cart, setCart] = useState([])

  const handleAddMovie = (movie) => {
    setCart((cart) =>
      cart.map((cartMovie) =>
        cartMovie.id === movie.id
          ? { ...cartMovie, quantity: cartMovie.quantity + 1 }
          : cartMovie
      )
    )
  }

  const handleRemoveMovie = (movie) => {
    if (movie.quantity === 1) {
      setCart((cart) =>
        cart.filter((cartMovie) => cartMovie.id !== movie.id)
      )
      return
    }
    setCart((cart) =>
      cart.map((cartMovie) =>
        cartMovie.id === movie.id
          ? { ...cartMovie, quantity: movie.quantity - 1 }
          : cartMovie
      )
    )
  }

  const handleAddToCart = (movie) => {
    const alreadyInCart = cart.find(
      (cartMovie) => cartMovie.id === movie.id
    )

    if (alreadyInCart) {
      handleAddMovie(movie)
      return
    }
    setCart((cart) => [...cart, { ...movie, quantity: 1 }])
  }

  const getTotal = (cart) => {
    const cartMovieIds = cart.map(movie => movie.id)
    const subTotal = cart.reduce((acc, movie) => acc + (movie.price * movie.quantity), 0)
    const discountRule = discountRules.find(rule => {
      return rule.m.length === cartMovieIds.length && rule.m.every(id => cartMovieIds.includes(id))
    })

    return discountRule ? subTotal * (1 - discountRule.discount) : subTotal
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className="movies__list-card">
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
              <button onClick={() => handleAddToCart(movie)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((movie) => (
            <li key={movie.id} className="movies__cart-card">
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
              <div className="movies__cart-card-quantity">
                <button onClick={() => handleRemoveMovie(movie)}>
                  -
                </button>
                <span>
                  {movie.quantity}
                </span>
                <button onClick={() => handleAddMovie(movie)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal(cart)}</p>
        </div>
      </div>
    </section>
  )
}
