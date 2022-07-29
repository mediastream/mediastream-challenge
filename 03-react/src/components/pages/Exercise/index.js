/* eslint-disable no-unused-vars */
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

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const updateQuantityHandler = (action, itemId) => {
    const findItem = cart.find((item) => item.id === itemId)
    if (action === 'increment') {
      findItem.quantity++
      const updatedCart = cart.map((e) => {
        if (findItem.id === e.id) return findItem
        return e
      })
      setCart(updatedCart)
    } else {
      if (findItem.quantity > 1) {
        findItem.quantity--
        const updatedCart = cart.map((e) => {
          if (findItem.id === e.id) return findItem
          return e
        })
        setCart(updatedCart)
      } else {
        setCart([...cart.filter((i) => i.id !== itemId)])
      }
    }
  }

  const addToCartHandler = (movieId) => {
    const findItem = cart.find((i) => i.id === movieId)
    if (findItem) {
      findItem.quantity++
      const updatedCart = cart.map((e) => {
        if (findItem.id === e.id) return findItem
        return e
      })
      setCart(updatedCart)
    } else {
      const itemToAdd = movies.find((m) => m.id === movieId)
      itemToAdd.quantity = 1
      setCart([...cart, itemToAdd])
    }
  }

  const getTotal = () => {
    const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0)
    const discountAvailable = checkDiscount()
    if (discountAvailable > 0) {
      const totalWithDiscount = subtotal * (1 - discountAvailable)
      return totalWithDiscount
    } else return subtotal
  }

  const checkDiscount = () => {
    let discount = 0
    const itemsInCart = cart.map((e) => e.id)
    discountRules.forEach((d) => {
      if (d.m.every((e) => itemsInCart.includes(e))) {
        if (discount < d.discount) discount = d.discount
      }
    })
    return discount
  }

  const removeItemFromCart = (itemId) => {
    setCart([...cart.filter((item) => item.id !== itemId)])
  }

  const cleanCartHandler = () => {
    setCart([])
  }

  const hideRemoveButton = () => {
    if (cart.length === 0) return true
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie) => (
            <li className="movies__list-card" key={movie.id}>
              <ul>
                <li>ID: {movie.id}</li>
                <li>Name: {movie.name}</li>
                <li>Price: ${movie.price}</li>
              </ul>
              <button onClick={() => addToCartHandler(movie.id)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <h2>Your movies</h2>
        <ul>
          {cart.length > 0
            ? cart.map((item) => (
              <li className="movies__cart-card" key={item.id}>
                <ul>
                  <li>ID: {item.id}</li>
                  <li>Name: {item.name}</li>
                  <li>Price: ${item.price}</li>
                </ul>
                <div className="movies__cart-card-quantity">
                  <div>
                    <button
                      onClick={() =>
                        updateQuantityHandler('decrement', item.id)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantityHandler('increment', item.id)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => removeItemFromCart(item.id)}>X</button>
                </div>
              </li>
            ))
            : <div className='empty-cart'><p>Your cart is empty :(</p></div>
          }
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
          {hideRemoveButton()
            ? <div></div>
            : <button onClick={() => cleanCartHandler()}>Remove all</button>
          }
        </div>
      </div>
    </section>
  )
}
