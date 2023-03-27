/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react'
import { discountRules } from '../utils/movies'

export const CartContext = createContext(null)

export function ShoppingCartProvider ({ children }) {
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState(
    [{
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 1
    }]
  )

  useEffect(() => {
    const combo = cart.map(item => item.id).sort((a, b) => a - b)
    let discount = 0
    discountRules.forEach(rule => {
      if (rule.m.sort((a, b) => a - b).every((value, index) => value === combo[index])) {
        discount = rule.discount
      }
    })
    const total = cart.reduce((ac, cv) => {
      if (discount) return ac + (cv.price * cv.quantity) * discount
      return ac + (cv.price * cv.quantity)
    }, 0)
    setTotal(total)
  }, [cart])

  return (
    <CartContext.Provider value={[cart, setCart, total, setTotal]}>
      {children}
    </CartContext.Provider>
  )
}
