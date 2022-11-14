import './assets/styles.css'
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { movies, discountRules } from './moviesData'
import { MovieList, MoviesCart } from '../../components'

export default function Exercise01 () {
  return (
    <section className="exercise01">
      <MovieList movies={movies} />
      <MoviesCart />
    </section>
  )
}
