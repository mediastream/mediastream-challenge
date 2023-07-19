import _ from 'lodash'
import './assets/styles.css'
import React, { useMemo, useState } from 'react'

const discountRules = [
  {
    m: [3, 2], // [1, 2 ,3]
    discount: 0.25
  }, // 140 * (1 - 0.25)
  {
    m: [2, 4, 1],
    discount: 0.5
  },
  {
    m: [4, 2],
    discount: 0.1
  }
]

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

const getTotal = (cart) => {
  const total = _.reduce(cart, (acc, movie) => acc + (movie.price * movie.quantity), 0)
  const cartIds = cart.map(movie => movie.id)
  return discountRules.reduce((acc, rule) => {
    if (rule.m.length === cartIds.length) {
      if (_.intersection(rule.m, cartIds).length === rule.m.length) {
        return acc * (1 - rule.discount)
      }
    }
    return acc
  }, total)
}

export default function Exercise01 () {
  const [cart, setCart] = useState([])
  const total = useMemo(() => getTotal(cart), [cart])

  const handleAddToCart = (product) => {
    const productInCart = cart.find(
      (cartProduct) => cartProduct.id === product.id
    )
    if (productInCart) {
      handleAddMovie(product.id)
    } else {
      setCart((_cart) => [..._cart, { ...product, quantity: 1 }])
    }
  }

  const handleAddMovie = (productId) => {
    setCart((_cart) =>
      _cart.map((cartProduct) =>
        cartProduct.id === productId
          ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
          : cartProduct
      )
    )
  }

  const handleRemoveMovie = (productId, quantity) => {
    const result = quantity - 1
    if (result === 0) {
      setCart((_cart) =>
        _cart.filter((cartProduct) => cartProduct.id !== productId)
      )
    } else {
      setCart((_cart) =>
        _cart.map((cartProduct) =>
          cartProduct.id === productId
            ? { ...cartProduct, quantity: result }
            : cartProduct
        )
      )
    }
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className="movies__list-card">
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <button onClick={() => handleAddToCart(movie)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((cartMovie) => (
            <li key={cartMovie.id} className="movies__cart-card">
              <ul>
                <li>ID: {cartMovie.id}</li>
                <li>Name: {cartMovie.name}</li>
                <li>Price: ${cartMovie.price}</li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button
                  onClick={() => handleRemoveMovie(cartMovie.id, cartMovie.quantity)}
                >
                  -
                </button>
                <span>{cartMovie.quantity}</span>
                <button onClick={() => handleAddMovie(cartMovie.id)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>{cart.length > 0 ? `Total: $${total}` : 'No movies added to the cart'}</p>
        </div>
      </div>
    </section>
  )
}
