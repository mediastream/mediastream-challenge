import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { discountRules, initialCart } from '../database/data'

export const CartContext = createContext(null)

export function CartContextWrapper ({ children }) {
  const [cart, setCart] = useState(initialCart)

  const addMovieToCard = (movie) => {
    const find = cart.find((ele) => ele.id === movie.id)
    if (find) {
      const newCart = cart.map((ele) => {
        if (ele.id === movie.id) {
          return {
            ...ele,
            quantity: ele.quantity + 1
          }
        }
        return ele
      })
      setCart(newCart)
    } else {
      setCart([
        ...cart,
        {
          ...movie,
          quantity: 1
        }
      ])
    }
  }

  const increment = (movie) => {
    const newCart = cart.map((ele) => {
      if (ele.id === movie.id) {
        return {
          ...movie,
          quantity: movie.quantity + 1
        }
      }
      return ele
    })
    setCart(newCart)
  }

  const decrement = (movie) => {
    if (movie.quantity === 1) {
      const newCart = cart.filter((ele) => ele.id !== movie.id)
      setCart(newCart)
    } else {
      const newCart = cart.map((ele) => {
        if (ele.id === movie.id) {
          return {
            ...movie,
            quantity: movie.quantity - 1
          }
        }
        return ele
      })
      setCart(newCart)
    }
  }

  const getTotal = () => {
    const total = cart.reduce((acc, ele) => {
      return acc + ele.quantity * ele.price
    }, 0)
    const discount = getDiscount()
    return total - total * discount
  }

  const getDiscount = () => {
    let discount = 0
    for (let j = 0; j < discountRules.length; j++) {
      const rule = discountRules[j]
      discount = rule.discount
      for (let i = 0; i < rule.m.length; i++) {
        const findMovie = cart.find((movie) => movie.id === rule.m[i])
        if (!findMovie) {
          discount = 0
          break
        }
      }
      if (discount) break
    }
    return discount
  }

  return (
    <CartContext.Provider
      value={{ cart, addMovieToCard, increment, decrement, getTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

CartContextWrapper.propTypes = {
  children: PropTypes.node
}
