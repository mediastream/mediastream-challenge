import './styles.css'
import { React, useState } from 'react'
import MovieList from '../../MovieList/MovieList'
import MovieCart from '../../MovieCart/MovieCart'

export default function Exercise01 () {
  const [cart, setCart] = useState([])

  const handleAddCart = (movieItem) => {
    if (!cart.find(movie => movie.id === movieItem.id)) { setCart((prevState) => [...prevState, { ...movieItem, quantity: 1 }]) }
  }

  const handleQuantityCart = (movieItem, quantity) => {
    const movieList = cart.map(movie => {
      if (movie.id === movieItem.id) { return { ...movie, quantity: movie.quantity + quantity } } else { return movie }
    })

    const validMovieList = movieList.filter((movie) => {
      return movie.quantity > 0
    })

    setCart(validMovieList)
  }

  return (
    <section className="exercise01">
      <MovieList handleAddCart={handleAddCart}></MovieList>
      <MovieCart cartList={cart} handleQuantityCart={handleQuantityCart}></MovieCart>
    </section>
  )
}
