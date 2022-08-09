/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './assets/styles.css'

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

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const getMovie = (id) => movies.find((movie) => movie.id === id)

  const getDiscount = () => {
    // Implemented for non-cumulative discounts

    let totalDiscount = 0
    const cartIdsArr = []

    cart.forEach((item) => cartIdsArr.push(item.id))

    discountRules.sort((a, b) => b.m.length - a.m.length)

    for (const rule of discountRules) {
      if (rule.m.every((id) => cartIdsArr.includes(id))) {
        totalDiscount = rule.discount
        break
      }
    }
    return totalDiscount
  }

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const incrementQuantity = (item) => {
    item.quantity++
    setCart([...cart])
  }

  const decrementQuantity = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id)
    } else {
      item.quantity--
      setCart([...cart])
    }
  }

  const addToCart = (id) => {
    let update
    const movie = getMovie(id)
    cart.forEach((item) => {
      if (item.id === movie.id) {
        update = true
        incrementQuantity(item)
      }
    })
    if (!update) {
      movie.quantity = 1
      setCart([...cart, movie])
    }
  }

  const getTotal = () => {
    let total = 0
    cart.forEach((item) => {
      total += (item.price * item.quantity)
    })
    return total - getDiscount()
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie, idx) => (
            <li key={idx} className="movies__list-card">
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
              <button onClick={() => addToCart(movie.id)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((item, idx) => (
            <li key={idx} className="movies__cart-card">
              <ul>
                <li>
                  ID: {item.id}
                </li>
                <li>
                  Name: {item.name}
                </li>
                <li>
                  Price: ${item.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrementQuantity(item)}>
                  -
                </button>
                <span>
                  {item.quantity}
                </span>
                <button onClick={() => incrementQuantity(item)}>
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
    </section >
  )
}
