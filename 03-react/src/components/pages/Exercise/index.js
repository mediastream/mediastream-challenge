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

  /* const discountRules = [
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
  ] */

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const getTotal = () => cart.reduce((res, val) => (val.price * val.quantity) + res, 0)

  const sumarItem = (cartId) => {
    setCart((oldCarts) => [
      ...oldCarts.map((item) =>
        item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
      )
    ])
  }

  const restarItem = (cartId) => {
    setCart((oldCarts) =>
      [
        ...oldCarts.map((item) => {
          if (item.id === cartId && item.quantity <= 1) return null
          if (item.id === cartId && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      ].filter((item) => item)
    )
  }

  const agregarCarrito = (cart) => {
    setCart((oldCarts) => {
      if (oldCarts.find((item) => item.id === cart.id)) {
        return [
          ...oldCarts.map((item) =>
            item.id === cart.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        ]
      } else return [...oldCarts, { ...cart, quantity: 1 }]
    })
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card" key={o.id}>
              <ul>
                <li >
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => agregarCarrito(o)}>
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
                <button onClick={() => restarItem(x.id)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => sumarItem(x.id)}>
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
