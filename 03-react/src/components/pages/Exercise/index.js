import './assets/styles.css'
import React, { useState } from 'react'

const _ = require('lodash')

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

  const _discountRules = [
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
    console.log(checkCombination(cart))
    const discount = checkCombination(cart)
    let total = 0
    cart.forEach(movie => {
      total += movie.price * movie.quantity || 0
    })

    return discount.apply ? (total - (total * discount.discount)) : total
  } // TODO: Implement this

  const checkCombination = (arr) => {
    const curIndex = _.map(arr, 'id')
    const discount = _discountRules.map(discount => {
      return _.isEqualWith(_.compact(curIndex), discount.m)
        ? {
            apply: _.isEqualWith(_.compact(curIndex), discount.m),
            discount: discount.discount
          }
        : false
    })
    return _.compact(discount)[0] || false
  }

  const addToCart = (o) => {
    setCart(currentCart => [...currentCart, { ...o, quantity: 1 }])
  }

  const incrementQuantity = (x, i) => {
    setCart(prevState => {
      const newState = prevState.map((cart, index) => {
        if (cart.id === x.id && index === i) {
          return { ...cart, quantity: x.quantity + 1 }
        }
        return cart
      })
      return newState
    })
  }

  const decrementQuantity = (x, i) => {
    setCart(prevState => {
      const newState = prevState.map((cart, index) => {
        if (cart.quantity === 1 && index === i) {
          return {}
        }
        if (cart.id === x.id && index === i) {
          return { ...cart, quantity: x.quantity - 1 }
        }
        return cart
      })
      return newState
    })
  }
  // const removeFromCart = (o) => {}

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
              <button onChange={getTotal} onClick={() => addToCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x, i) => (
            x.quantity > 0
              ? <li className="movies__cart-card" key={i}>
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
                <button onChange={getTotal} onClick={() => decrementQuantity(x, i)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onChange={getTotal} onClick={() => incrementQuantity(x, i)}>
                  +
                </button>
              </div>
            </li>
              : null
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
}
