import React from 'react'
import PropTypes from 'prop-types'

const discountRules = [
  { m: [3, 2], discount: 0.25 },
  { m: [2, 4, 1], discount: 0.5 },
  { m: [4, 2], discount: 0.1 }
]

export default function Cart ({ cartList, handleCartQuantity }) {
  function getTotal () {
    const cartIds = cartList.map(function (movie) {
      return movie.id
    })
    const discountRule = discountRules.find(function (rule) {
      return (
        rule.m.length === cartIds.length &&
        rule.m.every(function (id) {
          return cartIds.includes(id)
        })
      )
    })

    const subtotal = cartList.reduce(function (total, movie) {
      return total + movie.price * movie.quantity
    }, 0)

    const total = discountRule ? subtotal * (1 - discountRule.discount) : subtotal

    return total
  }

  function renderCard (movie) {
    return (
      <div key={movie.id} className="movies__cart-card">
        <ul>
          <li>ID: {movie.id}</li>
          <li>Name: {movie.name}</li>
          <li>Price: ${movie.price}</li>
        </ul>
        <div className="movies__cart-card-quantity">
          <button onClick={function () { handleCartQuantity(movie, -1) }}>-</button>
          <span>{movie.quantity}</span>
          <button onClick={function () { handleCartQuantity(movie, 1) }}>+</button>
        </div>
      </div>
    )
  }

  return (
    <div className="movies__cart">
      <ul>{cartList.map(renderCard)}</ul>
      <div className="movies__cart-total">
        <p>Total: ${getTotal()}</p>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cartList: PropTypes.array,
  handleCartQuantity: PropTypes.func.isRequired
}
