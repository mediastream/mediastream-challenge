import React from 'react'
import PropTypes from 'prop-types'

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

const MovieCart = ({ cartList, handleCartQuantity }) => {
  const getTotal = () => {
    const cartIds = cartList.map(movie => movie.id)
    const discountRule = discountRules.find(rule => {
      return rule.m.length === cartIds.length && rule.m.every(id => cartIds.includes(id))
    })

    const subtotal = cartList.reduce((total, movie) => total + movie.price * movie.quantity, 0)
    const total = discountRule ? subtotal * (1 - discountRule.discount) : subtotal

    return total
  }
  return (
    <div className="movies__cart">
    <ul>
      {cartList.map(x => (
        <div key={x.id} className="movies__cart-card">
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
            <button onClick={() => handleCartQuantity(x, -1)}>
              -
            </button>
            <span>
              {x.quantity}
            </span>
            <button onClick={() => handleCartQuantity(x, 1)}>
              +
            </button>
          </div>
        </div>
      ))}
    </ul>
    <div className="movies__cart-total">
      <p>Total: ${getTotal()}</p>
    </div>
  </div>)
}

MovieCart.propTypes = {
  cartList: PropTypes.array,
  handleCartQuantity: PropTypes.func
}

export default MovieCart
