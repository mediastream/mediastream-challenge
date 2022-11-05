import './assets/styles.css'
import React from 'react'
import { useMovies } from '../../../services/movies.service'
import { useCarts } from '../../../services/cart.service'
import MoviesList from '../../movies-list'
import CartList from '../../cart-list'

export default function Exercise01 () {
  const [movies/* , setMovies */] = useMovies()
  const [carts, setCarts] = useCarts()

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    }
  ]

  console.log(discountRules)

  function addToCart (movie) {
    const index = carts.findIndex(c => c.id === movie.id)

    if (index > -1) {
      carts[index].quantity += 1
      setCarts([...carts])
      return
    }

    const cart = { ...movie }
    cart.quantity = 1
    carts.push(cart)
    setCarts([...carts])
  }

  return (
    <section className="exercise01">
      <MoviesList
        movies={movies}
        onAddToCart={addToCart}
      />

      <CartList
        carts={carts}
        discountRules={discountRules}
        onUpdate={() => setCarts([...carts])}
      />
    </section>
  )
}
