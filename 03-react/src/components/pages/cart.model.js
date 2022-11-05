import { useState } from 'react'
export default function cartModel () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

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

  const [cart, setCart] = useState([])

  const getTotal = () => {
    const total = cart.reduce((total, movie) => {
      return total + movie.price * movie.quantity
    }, 0)
    return total
  }

  const getDiscounts = () => {
    const listOfIds = cart.map((movie) => movie.id)
    const discountFilter = discountRules.filter((i) =>
      i.m.every((ai) => listOfIds.includes(ai))
    )
    const totalOfDiscounts = discountFilter.reduce((total, discount) => {
      return total + discount.discount
    }, 0)
    return getTotal() * totalOfDiscounts
  }

  const addToCart = (movie) => {
    const find = cart.find((item) => item.id === movie.id)
    if (!find) {
      setCart((prev) => [...prev, { ...movie, quantity: 1 }])
    } else incrementItem(movie)
  }

  const incrementItem = (movie) => {
    const updCart = cart.map((item) =>
      item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCart(updCart)
  }

  const decrementItem = (movie) => {
    const updCart = cart
      .map((item) =>
        item.id === movie.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((i) => i.id !== movie.id || i.quantity > 0)
    setCart(updCart)
  }

  return {
    movies,
    getTotal,
    getDiscounts,
    addToCart,
    incrementItem,
    decrementItem,
    cart
  }
}
