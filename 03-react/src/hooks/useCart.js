// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import discountRules from '../data/discountRules'
import { isEqual } from 'lodash'
const useCart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 1
    }
  ])
  const [cartTotal, setCartTotal] = useState(0)
  const [cartDiscount, setCartDiscount] = useState(0)

  useEffect(() => {
    setCartTotal(
      cart.reduce((acc, curr) => {
        return acc + (curr.price * curr.quantity)
      }, 0)
    )
    return () => {
      setCartTotal(0)
    }
  }, [cart])

  useEffect(() => {
    const cartItemsIds = getCartItemsIds()
    discountRules.forEach(rule => {
      const { m, discount } = rule
      if (isEqual(m.sort(), cartItemsIds)) {
        setCartDiscount(discount)
      }
    })
    return () => {
      setCartDiscount(0)
    }
  }, [cart])

  const updateItemQty = (item, operator) => {
    return cart.map(cartItem => {
      const udpdateQty = operator === 'increment'
        ? cartItem.quantity + 1
        : cartItem.quantity - 1
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          quantity: udpdateQty
        }
      }
      return cartItem
    })
  }
  const incrementProductQty = (item) => {
    setCart(updateItemQty(item, 'increment'))
  }

  const decrementProductQty = (item) => {
    if (item.quantity === 1) {
      const filteredCart = cart.filter((carItem) => carItem.id !== item.id)
      setCart(filteredCart)
    } else {
      setCart(updateItemQty(item, 'decrement'))
    }
  }

  const addToCart = (item) => {
    const foundItem = cart.find(cartItem => cartItem.id === item.id)
    const itemToAdd = {
      ...item,
      quantity: 1
    }
    foundItem
      ? setCart(updateItemQty(itemToAdd, 'increment'))
      : setCart([...cart, itemToAdd])
  }
  const getCartItemsIds = () => {
    return cart.map(cartItem => cartItem.id).sort()
  }

  return {
    cart,
    addToCart,
    incrementProductQty,
    decrementProductQty,
    cartTotal,
    setCartTotal,
    cartDiscount
  }
}

export default useCart
