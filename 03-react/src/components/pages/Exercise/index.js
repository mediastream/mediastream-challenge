import './assets/styles.css'
import React, { useState, useEffect } from 'react'

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
  const [total, setTotal] = useState(0)

  const changeQuantity = (action, movie) => {
    const cartDecrement = []
    cart.forEach(({ id, name, price, quantity }) => {
      const newQuantity = id === movie.id ? action === 'increment' ? quantity + 1 : quantity - 1 : quantity
      if (newQuantity > 0) {
        cartDecrement.push({ id, name, price, quantity: newQuantity })
      }
    })
    setCart(cartDecrement)
  }
  const handleSave = (e, { id, name, price }) => {
    // e.preventDefault()
    const newcart = []
    const existInCart = cart.filter((movie) => movie.id === id)
    if (existInCart.length === 0) {
      newcart.push(...cart)
      newcart.push({ id, name, price, quantity: 1 })
      setCart(newcart)
    } else {
      changeQuantity('increment', { id, name, price })
    }
  }

  useEffect(() => {
    let tot = 0
    cart.forEach(({ price, quantity, id }) => {
      const cost = price * quantity
      tot = tot + cost
    })

    setTotal(tot)
  }, cart, setCart)

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li key={Math.floor(Math.random() * 1000)} className="movies__list-card">
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
              <button onClick={(e) => {
                handleSave(e, o)
              }}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            <li key={Math.floor(Math.random() * 1000)} className="movies__cart-card">
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
                <button onClick={() => changeQuantity('decrement', x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => changeQuantity('increment', x)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${total}</p>
        </div>
      </div>
    </section>
  )
}
