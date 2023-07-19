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

  const [cart, setCart] = useState([])
  const [discount, setDiscount] = useState([])

  const addCart = (item) => {
    const existId = cart.find(x => x.id === item.id)
    if (!existId) {
      setCart(cart => ([...cart, {
        ...item,
        quantity: 1
      }]))
    }
  }

  const handleQuantity = (id, isDecrement = false) => {
    const item = cart.find(x => x.id === id)
    item.quantity = item.quantity + (isDecrement ? -1 : 1)

    if (item.quantity === 0) {
      const newCart = cart.filter(x => x.id !== id)
      setCart(newCart)
    } else {
      setCart([...cart])
    }
  }

  const getTotal = () => cart.reduce((acc, x) => acc + (x.price * x.quantity), 0)

  const getDiscount = () => {
    let currentDiscount = 0
    for (const item of discountRules) {
      const isValid = cart.reduce((acc, x) => acc && item.m.includes(x.id), true) && item.m.length === cart.length
      if (isValid) {
        currentDiscount = item.discount
        break
      }
    }
    setDiscount(getTotal() * currentDiscount)
  }

  useEffect(() => {
    getDiscount()
  }, [cart])
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
              <button onClick={() => addCart(o)}>
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
                <button onClick={() => handleQuantity(x.id, true)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => handleQuantity(x.id)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Discount: ${discount}</p>
          <p>Total: ${getTotal()}</p>
          <p>Total with discount: ${getTotal() - discount}</p>
        </div>
      </div>
    </section>
  )
}
