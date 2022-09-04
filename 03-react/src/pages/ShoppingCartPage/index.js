import React, { useState, useEffect } from 'react'
import { useStore } from '../.././context/ShoppingCartProvider'

import CartItem from '../../components/CartItem/CartItem'
import MovieItemCard from '../../components/MovieItemCard/MovieItemCard'

import './assets/styles.css'

export default function ShoppingCardPage() {
  const { movies, discountRules, cart } = useStore()
  const [TotalCount, setTotalCount] = useState(0)

  const getTotal = () => {
    let idsCartMovies = cart.map(item => item.id)
    let arrayPrices = cart.map(item => item.price * item.quantity)
    let totalPrice = arrayPrices.reduce((total, item) => total + item, 0)

    if(idsCartMovies.length === 2 && idsCartMovies.sort().every( item => [2,3].includes(item))) return setTotalCount(totalPrice - 0.25)
    if(idsCartMovies.length === 3 && idsCartMovies.sort().every( item => [1,2,4].includes(item))) return setTotalCount(totalPrice - 0.5)
    if(idsCartMovies.length === 2 && idsCartMovies.sort().every( item => [2,4].includes(item))) return setTotalCount(totalPrice - 0.1)

    setTotalCount(totalPrice)
  }

  useEffect(() => {
    getTotal()
  }, [cart])

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies?.map(movie => <MovieItemCard key={movie.id} movie={movie} />)}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart?.sort((a, b) => a.id - b.id).map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
        </ul>
        <div className="movies__cart-total">
          <p data-testid="totalCount">Total: ${TotalCount}</p>
        </div>
      </div>
    </section>
  )
}
