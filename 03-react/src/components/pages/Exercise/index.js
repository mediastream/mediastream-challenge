import './assets/styles.css'
import React, { useEffect, useState } from 'react'

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

  const [currentDiscount, setCurrentDiscount] = useState(0)

  useEffect(() => {
    calculateDiscount()
  }, [cart.length])

  const calculateDiscount = () => {
    for (const rule of discountRules) {
      const match = rule.m.every(m => cart.some(item => item.id === m))
      if (match) {
        setCurrentDiscount(rule.discount)
        break
      }
    }
  }

  const getTotal = () => {
    return cart.reduce((m, movie) => m + (movie.price * movie.quantity), 0) * Math.abs(currentDiscount - 1)
  }

  const getMovieById = (id) => {
    return cart.find(m => id === m.id)
  }

  const addToCart = (movie) => {
    const existingMovie = getMovieById(movie.id)
    if (existingMovie) {
      setCart(cart.map(c => {
        return c.id === existingMovie.id ? { ...c, quantity: c.quantity + 1 } : c
      }))
    } else {
      setCart([...cart, { ...movie, quantity: 1 }])
    }
  }

  const removeMovie = (movieId) => {
    const existingMovie = getMovieById(movieId)
    if (existingMovie && existingMovie.quantity !== 1) {
      setCart(cart.map(c => {
        return c.id === movieId ? { ...c, quantity: c.quantity - 1 } : c
      }))
    } else setCart(cart.filter(c => c.id !== movieId))
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li key={o.id} className="movies__list-card">
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
          {cart.map(x => (
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
                <button onClick={() => removeMovie(x.id)}>
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
        </div>
      </div>
    </section>
  )
}
