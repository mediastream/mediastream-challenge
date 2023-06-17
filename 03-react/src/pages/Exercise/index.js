import React, { useState, useEffect } from 'react'
import MoviesCart, { CART_OPERATION } from '../../components/MoviesCart'
import MoviesList from '../../components/MovieList'
import { movies, discountRules } from '../../utils/constants'
import '../../assets/styles.css'

export default function Exercise01 () {
  const [cart, setCart] = useState([movies[0]])
  const [cartIndex, setCartIndex] = useState({ [movies[0].id]: 1 })
  const [appliedDiscount, setAppliedDiscount] = useState({
    totalDiscount: 0,
    rules: []
  })

  const addItemToCart = (item) => {
    const prevItemQty = (cartIndex && cartIndex[item.id]) || 0
    if (!cartIndex[item.id]) {
      setCart((prevCart) => [...prevCart, item])
    }
    modifyQty(CART_OPERATION.INCREMENT, item, prevItemQty)
  }

  const removeItemFromCart = (item) => {
    const cartIndexCpy = { ...cartIndex }
    delete cartIndexCpy[item.id]
    setCartIndex({ ...cartIndexCpy })
    const nextCartItems = cart.filter((cartItem) => cartItem.id !== item.id)
    setCart(nextCartItems)
  }

  const modifyQty = (operation, item, value) => {
    if (operation === CART_OPERATION.INCREMENT) {
      return setCartIndex((prevCartIndex) => ({
        ...prevCartIndex,
        [item.id]: value + 1
      }))
    }
    if (operation === CART_OPERATION.DECREMENT) {
      if (value <= 1) {
        return removeItemFromCart(item)
      }
      return setCartIndex((prevCartIndex) => ({
        ...prevCartIndex,
        [item.id]: value - 1
      }))
    }
  }

  useEffect(() => {
    const addedMoviesIds = Object.keys(cartIndex).sort()
    if (addedMoviesIds.length) {
      let ruleIdx = 1
      let totalDiscount = 0
      const appliedRules = []
      for (const discRule of discountRules) {
        const ruleMovieIds = discRule.m.sort().map(String)
        const hasAllIds = ruleMovieIds.every((rmi) =>
          addedMoviesIds.includes(rmi)
        )
        if (hasAllIds) {
          appliedRules.push(ruleIdx)
          totalDiscount += discRule.discount
        }
        ruleIdx++
      }
      setAppliedDiscount({ totalDiscount, rules: appliedRules })
    }
  }, [cartIndex])

  return (
    <section className="exercise01">
      <h1 className="section__title">Retro Movie Store</h1>

      <MoviesList movies={movies} addItemToCart={addItemToCart} />

      <MoviesCart
        cartItems={cart}
        itemIndex={cartIndex}
        modifyQty={modifyQty}
        discount={appliedDiscount}
        removeItem={removeItemFromCart}
      />
    </section>
  )
}
