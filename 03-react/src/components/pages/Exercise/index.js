import './assets/styles.css'
import React, { useState } from 'react'
import _ from 'lodash'

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
    let discount = 0
    const movies = cart.map((m) => m.id)

    discountRules.forEach((rule) => {
      console.log(rule.m.every((val) => movies.includes(val)))
      if (rule.m.every((val) => movies.includes(val))) {
        discount += rule.discount
      }
    })

    const total = _.chain(cart)
      .map((m) => m.price * m.quantity)
      .sum()
      .value()

    return total - total * discount
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <li className="movies__list-card" key={o.id}>
              <ul>
                <li>ID: {o.id}</li>
                <li>Name: {o.name}</li>
                <li>Price: ${o.price}</li>
              </ul>
              <button
                onClick={() => {
                  const cartCopy = [...cart]
                  const index = _.findIndex(cartCopy, { id: o.id })
                  if (index > -1) {
                    cartCopy[index].quantity = cartCopy[index].quantity + 1
                    setCart(cartCopy)
                  } else {
                    setCart([
                      ...cart,
                      {
                        id: o.id,
                        name: o.name,
                        price: o.price,
                        quantity: 1
                      }
                    ])
                  }
                }}
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x) => (
            <li className="movies__cart-card" key={x.id}>
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button
                  onClick={() => {
                    const cartCopy = [...cart]
                    const index = _.findIndex(cartCopy, { id: x.id })
                    if (index > -1) {
                      if (cartCopy[index].quantity > 1) {
                        cartCopy[index].quantity = cartCopy[index].quantity - 1
                      } else {
                        cartCopy.splice(index, 1)
                      }
                      setCart(cartCopy)
                    }
                  }}
                >
                  -
                </button>
                <span>{x.quantity}</span>
                <button
                  onClick={() => {
                    const cartCopy = [...cart]
                    const index = _.findIndex(cartCopy, { id: x.id })
                    if (index > -1) {
                      cartCopy[index].quantity = cartCopy[index].quantity + 1
                      setCart(cartCopy)
                    }
                  }}
                >
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
