import React from 'react'
import PropTypes from 'prop-types'

export default function Cart (props) {
  const { reduceMovieCount, incrementMovieCount, cart } = props

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

  const getTotal = () => {
    let runningTotalDiscount = 0
    discountRules.forEach(rule => {
      const passingRule = rule.m.every(id => cart.find(movie => movie.id === id))
      if (passingRule) {
        runningTotalDiscount += rule.discount
      }
    })

    const subTotal = cart.reduce((prev, curr) => {
      prev = prev + curr.price * curr.quantity
      return prev
    }, 0)

    return subTotal - runningTotalDiscount
  }
  return (
    <div className="movies__cart">
      <ul>
        {cart.length &&
          cart.map((x) => (
            <li className="movies__cart-card" key={x.id}>
              <ul>
                <p>ID: {x.id}</p>
                <p>Name: {x.name}</p>
                <p>Price: ${x.price}</p>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => reduceMovieCount(x)}>-</button>
                <span>{x.quantity}</span>
                <button onClick={() => incrementMovieCount(x)}>+</button>
              </div>
            </li>
          ))}
      </ul>
      <div className="movies__cart-total">
        <p>Total: ${getTotal()}</p>
      </div>
    </div>
  )
}

Cart.propTypes = {
  addMovieToCart: PropTypes.func,
  cart: PropTypes.Array,
  getTotal: PropTypes.func,
  incrementMovieCount: PropTypes.func,
  reduceMovieCount: PropTypes.func
}
