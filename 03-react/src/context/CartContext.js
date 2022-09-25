import React, { createContext, useEffect, useState } from 'react'
import { discountRules } from '../Rules/discountRules'
import { movies as moviesList } from '../data/movies'

export const CartContext = createContext()

export const CartProvider = (prop) => {
  const [cart, setCart] = useState([])
  const [movies] = useState(moviesList)
  const [totalCart, setTotalCart] = useState(0)

  const getTotal = () => {
    const listIdMovies = cart.map((x) => x.id)
    const checkAllRule = (arr, target) => target.every((v) => arr.includes(v))
    const discounts = discountRules.filter((x) => checkAllRule(listIdMovies, x.m))
      .reduce((sum, rule) => sum + rule.discount, 0)
    const subtotal = cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0)
    return subtotal - discounts
  }

  useEffect(() => {
    setTotalCart(getTotal())
  }, [cart])

  const addToCart = (_id) => {
    if (cart.some(item => item.id === _id)) {
      return
    }
    const { id, name, price } = movies.find(movie => movie.id === _id)
    setCart([...cart, { id, name, price, quantity: 1 }])
  }

  const removeFromCart = (_id) => {
    setCart(cart.filter(item => item.id !== _id))
  }

  const updateQuantity = (_id, value) => {
    const CartChanged = cart.map(item => item.id === _id ? { ...item, quantity: value } : item)
    setCart(CartChanged)
  }

  return (
    <CartContext.Provider value={{ cart, movies, addToCart, removeFromCart, updateQuantity, totalCart }}>
{prop.children}
    </CartContext.Provider>)
}
