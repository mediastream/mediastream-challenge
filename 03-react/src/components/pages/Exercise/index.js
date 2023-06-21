import './assets/styles.css'
import React, { useState } from 'react'
import { movies, discountRules } from '../../../dataset/data'

export default function Exercise01 () {
  const [cart, setCart] = useState([])
  const ACTIONS = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT'
  }

  const getIndexOfMovie = (id) => {
    return cart.findIndex((existingMovie) => existingMovie.id === id)
  }

  const getTotal = () => {
    //   {
    //     m: [3, 2],
    //     discount: 0.25
    //   },
    //   {
    //     m: [2, 4, 1],
    //     discount: 0.5
    //   },
    //   {
    //     m: [4, 2],
    //     discount: 0.1
    //   }
    // ]
    let discountAcc = 0
    const preDiscountTotal = cart.reduce((acc, movie) => acc + movie.quantity * movie.price, 0)
    const movieIdsInCart = cart.map((movie) => movie.id)

    discountRules
      .forEach((dr) => {
        if (dr.m.every((movieId) => movieIdsInCart.includes(movieId))) {
          discountAcc += dr.discount
        }
      })

    return preDiscountTotal * (1 - discountAcc)
  }

  const addToCart = (movie) => {
    const VALID_INDEXES_OF_CART_START = 0
    const ONE_UNIT_OF_MOVIE = 1
    const updatedCart = [...cart]
    const existingMovieIndex = getIndexOfMovie(movie.id)
    if (existingMovieIndex >= VALID_INDEXES_OF_CART_START) {
      updatedCart[existingMovieIndex].quantity++
    } else {
      updatedCart.push({
        ...movie,
        quantity: ONE_UNIT_OF_MOVIE
      })
    }

    setCart(updatedCart)
  }

  const modifyQuantityInCart = (movieId, action) => {
    const ONE_MOVIE = 1
    const movieIndex = getIndexOfMovie(movieId)
    const updatedCart = [...cart]
    switch (action) {
      case 'INCREMENT':
        updatedCart[movieIndex].quantity++
        setCart(updatedCart)
        break
      case 'DECREMENT':
        updatedCart[movieIndex].quantity--
        if (updatedCart[movieIndex].quantity < ONE_MOVIE) {
          updatedCart.splice(movieIndex, ONE_MOVIE)
        }

        setCart(updatedCart)
        break
    }
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <li key={o.key} className="movies__list-card">
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => addToCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x) => (
            <li key={x.id} className="movies__cart-card">
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price: ${x.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => modifyQuantityInCart(x.id, ACTIONS.DECREMENT)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => modifyQuantityInCart(x.id, ACTIONS.INCREMENT)}>
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
