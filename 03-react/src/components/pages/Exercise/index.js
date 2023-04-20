import './assets/styles.css'
import React, { useEffect, useState } from 'react'
import MovieCart from './MovieCart/MovieCart'
import MovieList from './MovieList/MovieList'

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

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const handleAddToCart = (movie) => {
    const existMovie = cart.find(item => item.id === movie.id)
    if (existMovie) return
    setCart([...cart, { ...movie, quantity: 1 }])
  }

  const handleCartQuantity = (cartItem, quantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === cartItem.id) {
        return { ...item, quantity: item.quantity + quantity }
      }
      return item
    }).filter(item => item.quantity > 0)

    setCart(updatedCart)
  }
  
  return (
    <section className="exercise01">
      <MovieList movies={movies} handleAddToCart={handleAddToCart} />
      <MovieCart cartList={cart} handleCartQuantity={handleCartQuantity}/>
    </section>
  )
}
