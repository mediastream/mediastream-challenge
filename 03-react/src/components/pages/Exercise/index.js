import React, { useState } from 'react'
import './assets/styles.css'

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

  const [cart, setCart] = useState([])

  /**
   * The function calculates the total price of items in a shopping cart based on their individual prices
   * and quantities.
   */
  const getTotal = () => cart.reduce((total, movie) => total + movie.price * movie.quantity, 0)

  /**
   * This function calculates the total price of items in a cart with applied discounts based on a set of
   * rules.
   * @returns The function `getTotalWithDiscounts` is returning the total price of the items in the cart
   * after applying any applicable discounts based on the `discountRules` array.
   */
  const getTotalWithDiscounts = () => {
    const total = getTotal()
    let discount = 0
    const moviesIdsInCart = cart.map(movie => movie.id)
    for (let i = 0; i < discountRules.length; i++) {
      if (discountRules[i].m.every(m => moviesIdsInCart.includes(m))) {
        discount += discountRules[i].discount
      }
    }

    return total - discount
  }

  /**
   * This function adds a movie to the cart if it is not already in the cart.
   */
  const addToCar = movie => {
    const isMovieInCart = cart.some((cartMovie) => cartMovie.id === movie.id)
    if (!isMovieInCart) {
      setCart([...cart, { ...movie, quantity: 1 }])
    }
  }

  /**
   * The function increases the quantity of a movie in the cart by one.
   * @param id - The `id` parameter is a unique identifier for a movie in the `cart` array. It is used to
   * find the movie object in the array and update its quantity property.
   */
  const increaseQuantity = (id) => {
    setCart(cart.map(movie => {
      if (movie.id === id) {
        return {
          ...movie,
          quantity: (movie.quantity || 0) + 1
        }
      }
      return movie
    }))
  }

  /**
   * This function decreases the quantity of a movie in the cart and removes it if the quantity becomes
   * zero.
   * @param id - The `id` parameter is a unique identifier for a movie in the `cart` array. It is used to
   * find the movie in the array and decrease its quantity by 1.
   */
  const decreaseQuantity = (id) => {
    setCart(cart.map(movie => {
      if (movie.id === id) {
        const newQuantity = (movie.quantity || 0) - 1
        if (newQuantity === 0) {
          return null
        }
        return {
          ...movie,
          quantity: newQuantity
        }
      }
      return movie
    }).filter(Boolean))
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card" key={o.id}>
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={ () => addToCar(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            <li className="movies__cart-card" key={x.id}>
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price: ${x.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decreaseQuantity(x.id)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => increaseQuantity(x.id)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotalWithDiscounts()}</p>
        </div>
      </div>
    </section>
  )
}
