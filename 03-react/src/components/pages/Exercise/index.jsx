import './assets/styles.css'
import React from 'react'
import Movies from './Movies'
import CartMovies from '../../CartMovies'
import useCart from '../../../hooks/useCartMovies'
import { movies } from '../../../data'

export default function Exercise01 () {
  const {
    cart,
    total,
    setProductQuantity,
    addMovie,
    totalDiscount
  } = useCart()
  return (
    <section className="exercise01">
      <Movies movies={movies} addMovie={addMovie} />
      <CartMovies
              cart={cart}
              setProductQuantity={(item, action) => setProductQuantity(item, action)}
              total={total}
              totalDiscount={totalDiscount}
              />
    </section>
  )
}
