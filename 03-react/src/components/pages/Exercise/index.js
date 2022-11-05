import './assets/styles.css'
import React from 'react'
import cartModel from '../cart.model'

export default function Exercise01 () {
  const { movies, getTotal, getDiscounts, addToCart, incrementItem, decrementItem, cart } = cartModel()

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(movie => (
            <li className="movies__list-card" key={movie.id}>
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
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(item => (
            <li className="movies__cart-card" key={item.id}>
              <ul>
                <li>
                  ID: {item.id}
                </li>
                <li>
                  Name: {item.name}
                </li>
                <li>
                  Price: ${item.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrementItem(item)}>
                  -
                </button>
                <span>
                  {item.quantity}
                </span>
                <button onClick={() => incrementItem(item)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>SubTotal: ${ getTotal() }</p>
          { getDiscounts() > 0 ? <p>Discounts: ${getDiscounts()}</p> : null }
          <hr></hr>
          <p>Total: ${ getTotal() - getDiscounts() }</p>
        </div>
      </div>
    </section>
  )
}
