import './assets/styles.css'
import React from 'react'
import useCart from '../../../hooks/useCart'
import movies from '../../../data/movies'
import Cart from './Cart'
import Movies from './Movies/index'
export default function Exercise01 () {
  const {
    cart,
    cartTotal,
    incrementProductQty,
    decrementProductQty,
    addToCart,
    cartDiscount
  } = useCart()

  return (
    <section className="exercise01">
      <Movies movies={movies} addToCart={addToCart} />
      <Cart
        cart={cart}
        incrementProductQty={incrementProductQty}
        decrementProductQty={decrementProductQty}
        cartTotal={cartTotal}
        cartDiscount={cartDiscount}
      />
    </section>
  )
}
