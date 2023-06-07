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

  const getTotal = () => {
    const ids = cart.map(movie => movie.id)

    // rule of distcount to apply
    const discountRule = discountRules.find(rule => {
      return rule.m.length === ids.length && rule.m.every(id => ids.includes(id))
    })

    // Total without discounts
    const subtotal = cart.reduce((acc, movie) => acc + movie.price * movie.quantity, 0)

    // Total with discount
    const total = discountRule ? subtotal * (1 - discountRule.discount) : subtotal

    return total
  }

  const [cart, setCart] = useState([

  ])

  const addToCard = (movie) => {
    const newCart = [...cart]

    const index = newCart.findIndex(x => x.id === movie.id)

    if (index === -1) {
      newCart.push({
        ...movie,
        quantity: 1
      })
    } else {
      newCart[index].quantity++
    }

    setCart(newCart)
  }

  const addQty = (movie, qty) => {
    const updatedCart = cart.map((item) => {
      if (item.id === movie.id) {
        return { ...item, quantity: item.quantity + qty }
      }
      return item
    }).filter(item => item.quantity > 0)

    setCart(updatedCart)
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
              <button onClick={() => addToCard(o)}>
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
                <button onClick={() => addQty(x, -1)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => addQty(x, 1)}>
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
