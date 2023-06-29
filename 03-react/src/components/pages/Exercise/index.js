/* eslint-disable react/react-in-jsx-scope */
import './assets/styles.css'
import { useState } from 'react'

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

  const addToCart = (movie) => {
    const existingMovie = cart.find((item) => item.id === movie.id)
    if (existingMovie) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          id: movie.id,
          name: movie.name,
          price: movie.price,
          quantity: 1
        }
      ])
    }
  }

  const decrementQuantity = (item) => {
    const updatedCart = cart.map((x) => {
      if (x.id === item.id) {
        const updatedQuantity = x.quantity - 1
        if (updatedQuantity === 0) {
          return null
        }
        return {
          ...x,
          quantity: updatedQuantity
        }
      }
      return x
    }).filter(Boolean)
    setCart(updatedCart)
  }

  const incrementQuantity = (movie) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const getTotal = () => {
    const total = cart.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    )

    const applicableDiscounts = discountRules.filter((rule) =>
      rule.m.every((movieId) => cart.some((item) => item.id === movieId))
    )

    const discountAmount = applicableDiscounts.reduce(
      (accumulator, rule) => accumulator + total * rule.discount,
      0
    )

    return total - discountAmount
  }

  return (
    <section className="exercise01">
    <div className="movies__list">
      <ul>
        {movies.map((movie) => (
          <li className="movies__list-card" key={movie.id}>
            <ul>
              <li>ID: {movie.id}</li>
              <li>Name: {movie.name}</li>
              <li>Price: ${movie.price}</li>
            </ul>
            <button onClick={() => addToCart(movie)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
    <div className="movies__cart">
      <ul>
        {cart.map((item) => (
          <li className="movies__cart-card" key={item.id}>
            <ul>
              <li>ID: {item.id}</li>
              <li>Name: {item.name}</li>
              <li>Price: ${item.price}</li>
            </ul>
            <div className="movies__cart-card-quantity">
              <button onClick={() => decrementQuantity(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => incrementQuantity(item)}>+</button>
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
