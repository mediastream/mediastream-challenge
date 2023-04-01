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
    const { total, ids } = cart.reduce((acc, item) => {
      acc.total += item.price * item.quantity
      acc.ids.push(item.id)
      return acc
    }, { total: 0, ids: [] })

    let discount = 0

    discountRules.forEach(rule => {
      if (rule.m.every(v => ids.includes(v)) && discount < rule.discount) {
        discount = rule.discount
      }
    })

    return total - (total * discount)
  }

  const addToCardHandler = (item) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex((m) => m.id === item.id)

      if (existingItemIndex !== -1) {
        const newCart = [...prev]

        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        }

        return newCart
      }

      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const changeQuantityHandler = (item, quantity) => {
    setCart((prev) => {
      const existingItemIndex = prev.findIndex((m) => m.id === item.id)

      const newCart = [...prev]

      newCart[existingItemIndex] = {
        ...newCart[existingItemIndex],
        quantity: newCart[existingItemIndex].quantity + quantity
      }

      if (newCart[existingItemIndex].quantity === 0) {
        newCart.splice(existingItemIndex, 1)
      }

      return newCart
    })
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li key={`movie-list-item-${o.id}`} className="movies__list-card">
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
              <button onClick={() => addToCardHandler(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            <li key={`movies-cart-item-${x.id}`} className="movies__cart-card">
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
                <button onClick={() => changeQuantityHandler(x, -1)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => changeQuantityHandler(x, 1)}>
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
