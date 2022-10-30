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
  ])

  const alreadyAdded = (id) => {
    return cart.find(item => item.id === id)
  }

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const addToCart = (item) => {
    item.quantity = 1
    item.subtotal = item.price * item.quantity
    // 👇️ push to end of state array
    setCart(current => [...current, { ...item }])
  }

  const increment = (item) => {
    const quantity = item.quantity + 1
    const subtotal = item.price * quantity

    // 👇️ find item in state array and increment quantity
    setCart(current => current.map(i => i.id === item.id ? { ...i, quantity, subtotal } : i))
  }

  const decrement = (item) => {
    const quantity = item.quantity - 1
    const subtotal = item.price * quantity
    // 👇️ find item in state array and decrement quantity
    setCart(current => current.map(i => i.id === item.id ? { ...i, quantity, subtotal } : i))

    // 👇️ remove item from state array if quantity is 0
    setCart(current => current.filter(i => i.id !== item.id || i.quantity > 0))
  }

  const totalDiscount = () => {
    // calculate discount based on discountRules property m, compare with cart ids

    for (let i = 0; i < discountRules.length; i++) {
      const rule = discountRules[i]
      const ruleIds = rule.m
      const ruleDiscount = rule.discount

      const cartIds = cart.map(item => item.id)
      const cartIdsSorted = cartIds.sort()
      const ruleIdsSorted = ruleIds.sort()

      if (JSON.stringify(cartIdsSorted) === JSON.stringify(ruleIdsSorted)) {
        return ruleDiscount * 100
      }
    }

    return 0
  }

  const totalAfterDiscount = () => {
    return getTotal() - (getTotal() * (totalDiscount() / 100))
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
              <button onClick={() => addToCart(o)} disabled={alreadyAdded(o.id)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        {cart.length
          ? <ul>
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
                <li>
                  Subtotal: ${x.subtotal}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrement(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => increment(x)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
          : <span>There are no items in the cart</span>}
        <div className="movies__cart-total">
          <p>Total: ${getTotal()} - Discount: {totalDiscount()}% = ${totalAfterDiscount()}</p>
        </div>
      </div>
    </section>
  )
}
