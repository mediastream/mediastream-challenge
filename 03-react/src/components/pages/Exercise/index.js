import './assets/styles.css'
import React, { useState } from 'react'

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

  const applyDiscounts = (total) => {
    let discountedTotal = total
    discountRules.forEach((rule) => {
      const movieIdsInCart = cart.map((movie) => movie.id).sort()
      if (rule.m.sort().every((m) => movieIdsInCart.includes(m))) {
        discountedTotal *= 1 - rule.discount
      }
    })
    return discountedTotal
  }

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const getTotal = () => {
    const total = cart.reduce((accumulator, movie) => {
      return accumulator + movie.price * movie.quantity
    }, 0)

    const discountedTotal = applyDiscounts(total)

    return discountedTotal.toFixed(2) // Round to 2 decimal places
  }

  const handleAddToCart = (movie) => {
    const movieInCart = cart.find((item) => item.id === movie.id)

    if (movieInCart) {
      const updatedCart = cart.map((item) =>
        item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      setCart(updatedCart)
    } else {
      setCart([...cart, { ...movie, quantity: 1 }])
    }
  }

  const handleIncrementQuantity = (movie) => {
    const updatedCart = cart.map((item) =>
      item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCart(updatedCart)
  }

  const handleDecrementQuantity = (movie) => {
    const updatedCart = cart.map((item) =>
      item.id === movie.id ? { ...item, quantity: item.quantity - 1 } : item
    )
    setCart(updatedCart.filter((item) => item.quantity > 0))
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o) => (
            <li key={o.id} className="movies__list-card">
              <ul>
                <li>ID: {o.id}</li>
                <li>Name: {o.name}</li>
                <li>Price: ${o.price}</li>
              </ul>
              <button onClick={() => handleAddToCart(o)}>Add to cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
        {cart.map((x) => (
            <li key={x.id} className="movies__cart-card">
              <ul>
                <li>ID: {x.id}</li>
                <li>Name: {x.name}</li>
                <li>Price: ${x.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => handleDecrementQuantity(x)}>-</button>
                <span>{x.quantity}</span>
                <button onClick={() => handleIncrementQuantity(x)}>+</button>
              </div>
            </li>))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
}

/*

  The first thing I did was to correct some import and Slint problems in order to be able to execute the project.

  1) Add a movie to the cart.
  To solve this task add the handleAddToCart method that contains the logic to add movies to the cart. This function
  checks if the selected movie is already in the cart. If it is, it increases the quantity. If it is not in the cart,
  it adds it with an initial quantity of 1.

  2) Increment or decrement the quantity of movie copies. The movie must be removed from the cart if quantity equals 0.
  to solve this task add the functions handleIncrementQuantity and handleDecrementQuantity to handle the increase and decrease
  of the number of copies of the movie in the cart, respectively. in the function handleIncrementQuantity we increase the quantity
  of the movie by 1 and update the cart status with the new quantity and in the function handleDecrementQuantity we decrease the quantity
  of the movie by 1 and then filter the cart to remove the movie if the resulting quantity is equal to 0.

  3) Calculate and show the total cost of your cart. Ex: Total: $150
  to solve this task add the function getTotal, where is the logic to calculate the total cost of the cart

  4) Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart. See [Discout rules](#discount-rules)
  To solve this task add the function applyDiscounts to apply the discounts to the cart total. The function traverses the discount
  rules defined in the discountRules array. It then compares the movies in the cart with the movies required by each rule to verify
  if all the required movies are present in the cart. If the conditions of a rule are met, the total is adjusted according to the specified discount.

*/
