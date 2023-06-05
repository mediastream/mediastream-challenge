import { useEffect, useState } from 'react'
import { discountRules } from '../constants'

export const useShopCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [summary, setsummary] = useState({
    total: 0,
    discount: 0
  })

  const discountApplyed = () => {
    let applyDiscount = 0
    for (const discount of discountRules) {
      const cartItemsIds = cartItems.map(movie => movie.id)
      if (cartItemsIds.length !== discount.m.length) {
        continue
      }
      if (discount.m.every(item => cartItemsIds.includes(item))) {
        applyDiscount = discount.discount
      }
    }
    return applyDiscount
  }

  useEffect(() => {
    const discount = discountApplyed()
    const subTotal = cartItems.reduce((prev, current) => (current.price * current.quantity) + prev, 0)
    const total = subTotal - (subTotal * discount)

    setsummary({
      total,
      discount
    })
  }, [cartItems])

  const addItem = (item) => {
    const itemIndex = cartItems.findIndex(movie => movie.id === item.id)

    if (itemIndex !== -1) {
      setCartItems(cartItems.map(movie => {
        if (movie.id === item.id) {
          movie.quantity += 1
        }
        return movie
      }))
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }])
    }
  }

  const removeItem = (item) => {
    const itemIndex = cartItems.findIndex(movie => movie.id === item.id)
    if (itemIndex !== -1) {
      const currentItem = cartItems[itemIndex]
      if (currentItem.quantity === 1) {
        const newCartItems = cartItems.filter(movie => movie.id !== currentItem.id)
        setCartItems(newCartItems)
      } else {
        setCartItems(cartItems.map(movie => {
          if (movie.id === item.id) {
            movie.quantity -= 1
          }
          return movie
        }))
      }
    }
  }

  return {
    cartItems,
    addItem,
    removeItem,
    summary
  }
}
