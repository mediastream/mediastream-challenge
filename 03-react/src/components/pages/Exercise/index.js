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

  const [cart, setCart] = useState([])
  const handleClick = (item) => {
    if (cart.some((cartItem) => cartItem.id === item.id)) {
      setCart((cart) =>
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
              }
            : cartItem
        )
      )
      return
    }

    // Add to cart
    setCart((cart) => [
      ...cart,
      { ...item, quantity: 1 }
    ]
    )
  }

  const handleRemoveItem = (item) => {
    setCart(cart.filter(x => x.id !== item.id))
  }

  const handleSubstractClick = (item) => {
    if (cart.some((cartItem) => cartItem.id === item.id)) {
      if (item.quantity - 1 === 0) {
        handleRemoveItem(item)
        return
      }
      setCart((cart) =>
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1
              }
            : cartItem
        )
      )
      return
    }

    // Add to cart
    setCart((cart) => [
      ...cart,
      { ...item, quantity: 1 }
    ]
    )
  }

  const handleAddClick = (item) => {
    if (cart.some((cartItem) => cartItem.id === item.id)) {
      setCart((cart) =>
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem
              }
            : cartItem
        )
      )
      return
    }

    // Add to cart
    setCart((cart) => [
      ...cart,
      { ...item, price: item.price, quantity: 1 }
    ])
  }

  const getTotal = () => cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  )

  const getTotalWithDiscount = (cart, total) => {
    const ids = cart.map(({ id }) => id)
    let totalWithDiscount = total
    let discount = 0
    discountRules.forEach((elementDiscount) => {
      const hasDiscount = elementDiscount.m.every(ai => ids.includes(ai))
      if (hasDiscount) {
        if (elementDiscount.discount > discount) {
          discount = elementDiscount.discount
          totalWithDiscount = total - (total * discount)
        }
      }
    })
    return totalWithDiscount
  }
  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o, index) => (
            <li key={`${o.id}+${index}`} className="movies__list-card">
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
              <button onClick={() => { handleAddClick(o) }}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x, index) => (
            <li key={`${x.id}+${index}`} className="movies__cart-card">
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
                <button onClick={() => { handleSubstractClick(x) }}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => { handleClick(x) }}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
        <div className="movies__cart-total">
          <p>Total con Descuento: ${getTotalWithDiscount(cart, getTotal())}</p>
        </div>
      </div>
    </section>
  )
}
