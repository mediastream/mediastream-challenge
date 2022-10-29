import './assets/styles.css'
import React, { useState } from 'react'

import Cart from './Cart'
import MovieList from './MovieList'
import TEST_DATA from './assets/test-data.json'

export default function Exercise01 () {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const movies = TEST_DATA

  const reduceMovieCount = (movie) => {
    const newCount = movie.quantity - 1

    if (newCount === 0) {
      setCart(cart.filter(cartMovie => cartMovie.id !== movie.id))
    } else {
      setCart((prevState) => {
        const stateCopy = [...prevState]
        const movieIndex = stateCopy.findIndex(mov => mov.id === movie.id)
        const newQty = stateCopy[movieIndex].quantity - 1
        stateCopy.splice(movieIndex, 1, { ...stateCopy[movieIndex], quantity: newQty })
        return stateCopy
      })
    }
  }

  const incrementMovieCount = (movie) => {
    setCart((prevState) => {
      const stateCopy = [...prevState]
      const movieIndex = stateCopy.findIndex(mov => mov.id === movie.id)
      const newQty = stateCopy[movieIndex].quantity + 1
      stateCopy.splice(movieIndex, 1, { ...stateCopy[movieIndex], quantity: newQty })
      return stateCopy
    })
  }

  const addMovieToCart = (movie) => {
    const movieInCart = cart.find(cartMovie => movie.id === cartMovie.id)
    if (!movieInCart) {
      setCart((prevState) => [...prevState, { ...movie, quantity: 1 }])
    } else {
      incrementMovieCount(movie)
    }
  }

  return (
    <section className="exercise01">
      <MovieList movies={movies} addMovieToCart={addMovieToCart} />
      <Cart
        cart={cart}
        incrementMovieCount={incrementMovieCount}
        reduceMovieCount={reduceMovieCount}
      />
    </section>
  )
}
