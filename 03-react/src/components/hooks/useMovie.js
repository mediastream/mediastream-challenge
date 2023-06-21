import { isEqual } from 'lodash'
import { useState } from 'react'

export const useMovie = (discountRules, moviesData) => {
  const [movies, setMovies] = useState(moviesData)

  const [carts, setCarts] = useState([])

  const addToCart = (obj) => {
    const moviesFilter = movies.filter(x => x.id !== obj.id)
    setMovies(moviesFilter)
    setCarts([...carts, obj])
  }

  const decrementQuantity = (objCart) => {
    if (objCart.quantity - 1 === 0) {
      const cartTemp = carts.filter(x => x.id !== objCart.id)
      setCarts([...cartTemp])
      setMovies([...movies, objCart].sort(orderDataById))
    } else {
      const cartsTemp = carts.map((x) => {
        if (x.id === objCart.id) x.quantity -= 1
        return x
      })
      setCarts([...cartsTemp])
    }
  }

  const orderDataById = (a, b) => {
    if (a.id === b.id) return 0
    if (a.id < b.id) return -1
    return 1
  }

  const incrementQuantity = (objCart) => {
    const cartsTemp = carts.map((x) => {
      if (x.id === objCart.id) x.quantity += 1
      return x
    })
    setCarts([...cartsTemp])
  }

  const getTotal = () => {
    if (carts.length !== 0) {
      let sum = carts.reduce((accumulator, object) => {
        return accumulator + object.quantity * object.price
      }, 0)

      const arrIds = carts.map(x => x.id)
      const rule = discountRules.find(x => isEqual(x.m, arrIds))
      sum = sum - sum * (rule === undefined ? 0 : rule.discount)
      return `$ ${sum} `.concat(rule === undefined ? '' : ` -> disc : ${rule?.discount * 100}%`)
    } else {
      return ''
    }
  }

  return [getTotal, addToCart, decrementQuantity, incrementQuantity, movies, carts]
}
