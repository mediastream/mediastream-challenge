import React, { createContext, useState, useContext } from 'react'
import { discountRules } from './discountRules'

const defaultCartContext = {
  movies: [],
  getMovieQuantity: () => {},
  increaseMovieQuantity: () => {},
  decreaseMovieQuantity: () => {},
  getTotal: () => {}
}

export const CartContext = createContext(defaultCartContext)

// eslint-disable-next-line react/prop-types
export const CartContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([])

  const getMovieQuantity = movieId => movies.find(movie => movie.id === movieId)?.quantity || 0

  const increaseMovieQuantity = sentMovie => {
    setMovies(currentMovies => {
      const movieToAdd = currentMovies.find(movie => movie.id === sentMovie.id)
      if (movieToAdd == null) {
        return [...currentMovies, { ...sentMovie, quantity: 1 }]
      } else {
        return currentMovies.map(movie => {
          if (movie.id === sentMovie.id) {
            return { ...movie, quantity: movie.quantity + 1 }
          } else {
            return movie
          }
        })
      }
    })
  }

  const decreaseMovieQuantity = movieId => {
    setMovies(currentMovies => {
      const movieToAdd = currentMovies.find(movie => movie.id === movieId)
      if (movieToAdd?.quantity === 1) {
        return currentMovies.filter(movie => movie.id !== movieId)
      } else {
        return currentMovies.map(movie => {
          if (movie.id === movieId) {
            return { ...movie, quantity: movie.quantity - 1 }
          } else {
            return movie
          }
        })
      }
    })
  }

  const calculateDiscount = () => {
    if (movies.length === 0) {
      return 0
    }

    const movieIds = movies.map(m => m.id)
    const rulesMatch = discountRules.filter(rule => {
      return rule.m.every(id => movieIds.includes(id))
    })

    if (rulesMatch.length === 0) {
      return 0
    } else {
      const [rulesMatchSorted] = [...rulesMatch].sort((a, b) => b.discount - a.discount)
      return rulesMatchSorted.discount
    }
  }

  const getTotal = () => {
    const total = movies?.reduce((total, movie) => {
      return total + (movie.price * movie.quantity)
    }, 0)

    const totalWithDiscount = total - (total * calculateDiscount())
    return totalWithDiscount
  }

  return (
    <CartContext.Provider
      value={{
        movies,
        increaseMovieQuantity,
        decreaseMovieQuantity,
        getMovieQuantity,
        getTotal
      }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)
