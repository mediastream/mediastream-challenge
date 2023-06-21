import React, { useState } from 'react'
import './assets/styles.css'
import { Cart } from './cart'
import { List } from './list'

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

  const [cart, setCart] = useState([])

  function handleAddToCart (movie) {
    const existMovie = cart.find(function (item) {
      return item.id === movie.id
    })

    if (existMovie) return

    setCart([...cart, { ...movie, quantity: 1 }])
  }

  function handleCartQuantity (cartItem, quantity) {
    const updatedCart = cart
      .map(function (item) {
        if (item.id === cartItem.id) {
          return { ...item, quantity: item.quantity + quantity }
        }
        return item
      })
      .filter(function (item) {
        return item.quantity > 0
      })

    setCart(updatedCart)
  }

  return (
    <section className="exercise01">
      <List movies={movies} handleAddToCart={handleAddToCart} />

      {cart.length > 0 && (
        <Cart cartList={cart} handleCartQuantity={handleCartQuantity} />
      )}
    </section>
  )
}
