import React, { useState } from 'react'
import { discountRules, movies } from '../../utils'
import './assets/styles.css'

export default function Exercise01 () {
  const [cart, setCart] = useState([])

  const addToCart = (movies) => {
    const updateCart = [...cart]
    const index = updateCart.findIndex(x => x.id === movies.id)
    if (index === -1) {
      updateCart.push({
        id: movies.id,
        name: movies.name,
        price: movies.price,
        quantity: 1
      })
    } else {
      updateCart[index].quantity += 1
    }
    setCart(updateCart)
  }

  const applyDiscountRules = () => {
    const discount = discountRules.find(rule => {
      const movies = cart.map(movie => movie.id)
      return rule.m.every(id => movies.includes(id))
    }
    )
    if (discount) {
      return discount.discount
    }
    return 0
  }

  const applyDiscount = applyDiscountRules()
  const totalPrice = cart.reduce((acc, movie) => {
    return acc + (movie.price * movie.quantity)
  }, 0)
  const discountedPrice = totalPrice - (totalPrice * applyDiscount)

  const updateQuantityAndRemoveMovie = (id, quantity) => {
    const updateCart = [...cart]
    const index = updateCart.findIndex(x => x.id === id)
    if (index !== -1) {
      updateCart[index].quantity = quantity
    } else {
      updateCart.splice(index, 1)
    }
    setCart(updateCart)
  }

  const movieList = cart.map(movie => {
    if (movie.quantity > 0) {
      return (
        <div key={movie.id} className='movies__list-card'>
          <h4>{movie.name}</h4>
          <li>
            Price: ${movie.price}
          </li>
          <button onClick={() => updateQuantityAndRemoveMovie(movie.id, movie.quantity - 1)}>-</button>
          <span> {movie.quantity} </span>
          <button onClick={() => updateQuantityAndRemoveMovie(movie.id, movie.quantity + 1)}>+</button>
        </div>
      )
    } else {
      return null
    }
  })

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li key={o.id} className="movies__list-card">
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
              <button onClick={() => addToCart(o)}>
                Add to cart
                </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          <li>
            <h3 className='shopping__cart'>Shopping Cart</h3>
          </li>
          {movieList}
        </ul>
        <div className="movies__cart-total">
          <p>Total Price: <span>${totalPrice}</span></p>
          <p>Discount: <span>{applyDiscount}%</span></p>
          <p>Total Discounted Price: <span>${discountedPrice}</span></p>
        </div>
      </div>
    </section>
  )
}
