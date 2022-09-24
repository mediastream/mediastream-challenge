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

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const getTotal = () => {
    const total = cart.reduce((acc, item) => {
      return acc + (item.quantity * item.price)
    }, 0)
    const ids = [...cart.map(cart => cart.id).sort()]
    let equalM = []

    discountRules.forEach(rule => {
      const sortedRule = rule.m.sort()
      const result = ids.length === sortedRule.length &&
      ids.every((element, index) => {
        return element === sortedRule[index]
      })
      if (result) { equalM = rule }
    })
    return equalM.m ? total * equalM.discount : total
  } // TODO: Implement this

  const handleAdd = (movieId) => {
    const movie = movies.find((movie) => movie.id === movieId)
    movie.quantity = 1
    if (!cart.find(cartMovie => cartMovie.id === movie.id)) {
      setCart([...cart, movie])
    } else {
      const updateCart = [...cart]
      updateCart.find((movie) => movie.id === movieId).quantity++
      setCart([...updateCart])
    }
  }

  const handleDecrement = (cartItem) => {
    const updatedCart = [...cart]
    updatedCart.find(cart => cart.id === cartItem.id).quantity--
    if (updatedCart.find(cart => cart.id === cartItem.id).quantity === 0) {
      const index = updatedCart.findIndex(cart => cart.id === cartItem.id)
      updatedCart.splice(index, 1)
    }
    setCart([...updatedCart])
  }

  const handleIncrement = (cartItem) => {
    const updatedCart = [...cart]
    updatedCart.find(cart => cart.id === cartItem.id).quantity++
    setCart([...updatedCart])
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card" key={o.id}>
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
              <button onClick={() => handleAdd(o.id)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            <li className="movies__cart-card" key={x.id}>
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
                <button onClick={() => handleDecrement(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => handleIncrement(x)}>
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
