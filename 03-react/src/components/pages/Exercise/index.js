import React, { useState } from 'react'
import './assets/styles.css'

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

export default function Exercise01 () {
  const [cart, setCart] = useState([])

  const getTotal = () => {
    const subtotal = cart.reduce(
      (total, movie) => total + movie.price * movie.quantity,
      0
    )
    const discount = discountRules.reduce((totalDiscount, rule) => {
      const hasAllMovies = rule.m.every((movieId) =>
        cart.some((movie) => movie.id === movieId)
      )
      return hasAllMovies ? totalDiscount + subtotal * rule.discount : totalDiscount
    }, 0)
    return subtotal - discount
  }

  const addToCart = (movie) => {
    const existingMovie = cart.find((m) => m.id === movie.id)
    if (existingMovie) {
      setCart(
        cart.map((m) =>
          m.id === movie.id ? { ...m, quantity: m.quantity + 1 } : m
        )
      )
    } else {
      setCart([...cart, { ...movie, quantity: 1 }])
    }
  }

  const removeFromCart = (movie) => {
    const existingMovie = cart.find((m) => m.id === movie.id)
    if (existingMovie.quantity === 1) {
      setCart(cart.filter((m) => m.id !== movie.id))
    } else {
      setCart(
        cart.map((m) =>
          m.id === movie.id ? { ...m, quantity: m.quantity - 1 } : m
        )
      )
    }
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o, i) => (
            <li className="movies__list-card" key={i}>
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
          {cart.map((x, i) => (
            <li className="movies__cart-card" key={i}>
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
                <button onClick={() => removeFromCart(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => addToCart(x)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
          <hr/>
          <p>Discounts:</p>
          <ul>
            {discountRules.map((rule) => (
              <li key={rule.m.join('-')}>
                {rule.m
                  .map((movieId) => movies.find((movie) => movie.id === movieId).name)
                  .join(', ')}{' '}
                - {rule.discount * 100}% discount
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
