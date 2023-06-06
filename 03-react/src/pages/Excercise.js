import React from 'react'
import MovieList from '../components/Excersise/MovieList'
import ShoppingCart from '../components/Excersise/ShoppingCart'
import { movies } from '../database/data'
import './assets/styles.css'

export default function Exercise01 () {
  return (
    <section className="exercise01">
      <MovieList movies={movies}/>
      <ShoppingCart />
    </section>
  )
}
