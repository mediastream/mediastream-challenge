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

  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        }
        return cartItem
      })
      setCartItems(updatedCartItems)
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  }

  const incrementItemQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === itemId) {
        return { ...cartItem, quantity: cartItem.quantity + 1 }
      }
      return cartItem
    })
    setCartItems(updatedCartItems)
  }

  const decrementItemQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === itemId) {
        const updatedQuantity = cartItem.quantity - 1
        if (updatedQuantity === 0) return null
        return { ...cartItem, quantity: updatedQuantity }
      }
      return cartItem
    })
    setCartItems(updatedCartItems.filter((cartItem) => cartItem !== null))
  }

  const getTotal = () => {
    let total = 0
    const itemQuantities = new Map()
    const itemIds = new Set()
    for (const cartItem of cartItems) {
      if (!itemQuantities.has(cartItem.id)) {
        itemQuantities.set(cartItem.id, 0)
      }
      itemQuantities.set(
        cartItem.id,
        itemQuantities.get(cartItem.id) + cartItem.quantity
      )
      itemIds.add(cartItem.id)
    }

    for (const [itemId, quantity] of itemQuantities) {
      const movie = movies.find((movie) => movie.id === itemId)
      total += movie.price * quantity
    }

    for (const discountRule of discountRules) {
      if (discountRule.m.every((itemId) => itemIds.has(itemId))) {
        const discount = total * discountRule.discount
        total -= discount
      }
    }

    return total
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
              <button onClick={() => addToCart(o)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cartItems.map((x) => (
            <li className="movies__cart-card" key={x.id}>
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrementItemQuantity(x.id)}>-</button>
                <span>{x.quantity}</span>
                <button onClick={() => incrementItemQuantity(x.id)}>+</button>
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
