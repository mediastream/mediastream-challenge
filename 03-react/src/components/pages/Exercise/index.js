import './assets/styles.css'
import React, { useEffect, useState } from 'react'

export default function Exercise01 () {
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
  const [cart, setCart] = useState([{
    id: 1,
    name: 'Star Wars',
    price: 20,
    quantity: 2
  }])
  const [totals, setTotals] = useState({
    total: 40,
    discount: 0
  })

  useEffect(() => {
    calculateTotal(cart)
  }, [cart])

  /**
   * Get the total and the discout amount of the cart
   * If we have more than one discount rule available we choose the one
   * that has the greater discount
   */
  const calculateTotal = (cart) => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const isDiscountAvailable = (discountRule) => {
      return discountRule.m.every((movieId) => cart.some((movie) => movie.id === movieId))
    }
    const availableDiscounts = discountRules.filter(isDiscountAvailable).map(({ discount }) => discount)
    const discountToApply = availableDiscounts.length > 0 ? Math.max(...availableDiscounts) : 0

    setTotals({
      total: total * (1 - discountToApply),
      discount: discountToApply * total
    })
  }

  /**
   * Add a movie to the cart, or increase the quantity of the existing ones
   * @param movie
   */
  const addToCart = (movie) => {
    const existingItem = cart.find((item) => item.id === movie.id)
    if (existingItem) {
      existingItem.quantity += 1
      setCart([...cart])
    } else {
      setCart([...cart, { ...movie, quantity: 1 }])
    }
  }

  /**
   * Decrement the quantity of a movie and if the quantity down to 0
   * the movie is eliminated from the cart
   * @param movie
   */
  const decrementQuantity = (movie) => {
    const existingItem = cart.find((item) => item.id === movie.id)
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1
      setCart([...cart])
    } else {
      removeFromCart(movie)
    }
  }

  /**
   * Increment the quantity of a movie in the cart
   * @param movie
   */
  const incrementQuantity = (movie) => {
    const existingItem = cart.find((item) => item.id === movie.id)
    if (existingItem) {
      existingItem.quantity += 1
      setCart([...cart])
    } else {
      setCart([...cart, { ...movie, quantity: 1 }])
    }
  }

  /**
   * Remove a movie from the cart
   * @param movie
   */
  const removeFromCart = (movie) => {
    const newCart = cart.filter((item) => item.id !== movie.id)
    setCart(newCart)
  }

  return (
      <section className="exercise01">
        <div className="movies__list">
          <ul>
            {movies.map(movie => (
                <div key={movie.id}>
                  <li className="movies__list-card">
                    <ul>
                      <li>
                        ID: {movie.id}
                      </li>
                      <li>
                        Name: {movie.name}
                      </li>
                      <li>
                        Price: ${movie.price}
                      </li>
                    </ul>
                    <button onClick={() => addToCart(movie)}>
                      Add to cart
                    </button>
                  </li>
                </div>
            ))}
          </ul>
        </div>
        <div className="movies__cart">
          <ul>
            {cart.map(movie => (
                <div key={movie.id}>
               <li>
                 {movie.name} x {movie.quantity}
               </li>
               <button onClick={() => decrementQuantity(movie)}>
                 -
               </button>
               <button onClick={() => incrementQuantity(movie)}>
                 +
               </button>
             </div>
            ))}
        </ul>
        <p>
          Discount: ${totals.discount}
        </p>
        <p>
          Total: ${totals.total}
        </p>
      </div>
    </section>
  )
}
